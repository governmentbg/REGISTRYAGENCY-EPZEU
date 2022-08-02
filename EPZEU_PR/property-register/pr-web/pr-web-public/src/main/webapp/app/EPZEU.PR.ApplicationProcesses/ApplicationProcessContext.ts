import { action, observable, runInAction } from 'mobx';
import { Obligation } from "EPZEU.Core";
import { ApplicationFormTypes } from 'EPZEU.PR.Core';
import {
  IApplicationProvider, ApplicationProviderFactory, UIModes, IApplicationFormManager,
  ApplicationFormBase, IApplicationProcessContext, AttachedDocument, ApplicationItemBase, ApplicationCreateRequest, ApplicationProcessContextType
} from 'EPZEU.PR.ApplicationBase';
import { DocumentsDataService } from "./Services/DocumentDataService";
import { APApplication, APApplicationProcess, ProcessStatuses } from './Models';
import { ApplicationProcessDataService } from './Services';


export interface ApplicationItem extends ApplicationItemBase {
  application?: APApplication,
  applicationSavedState?: string;
}

export class ApplicationProcessContext implements IApplicationProcessContext {
  @observable private _isContextInitialized: boolean;
  private _appProcess: APApplicationProcess;
  private _applicationItem: ApplicationItem;
  private _service: ApplicationProcessDataService;
  private _documentService: DocumentsDataService;
  private refreshInerval: number;
  private refreshCounts: number = 1;

  constructor() {
    this._isContextInitialized = false;
    this._service = new ApplicationProcessDataService();
    this._documentService = new DocumentsDataService();

    this.refreshProcessState = this.refreshProcessState.bind(this);
    this.refreshProcessStateSecondary = this.refreshProcessStateSecondary.bind(this);
  }

  public get status(): ProcessStatuses {
    return this._appProcess.status;
  }

  public get signingGuid(): string {
    return this._appProcess.signingGuid;
  }

  public get contextType(): ApplicationProcessContextType {
    return ApplicationProcessContextType.Edit;
  }

  public get applicationProcess(): APApplicationProcess {
    return this._appProcess;
  }

  public tryLoadApplicationProcess(appFormType: ApplicationFormTypes): Promise<boolean> {
    return this._service.provideApplicationProcessByApplicationFormType(appFormType, true).bind(this).then(ap => {
      if (ap) {
        return this.loadApplicationProcess(ap).then(() => true);
      } else {
        return false;
      }
    });
  }

  public deleteApplicationProcess(): Promise<void> {
    return this._service.deleteApplicationProcess(this._appProcess.applicationProcessId).bind(this).then(() => {
      this.clearContext();
    });
  }

  public createApplicationProcess(createRequest: ApplicationCreateRequest): Promise<void> {
    return this._service.createApplicationProcess(createRequest).bind(this).then(appProcess => {
      return this.loadApplicationProcess(appProcess);
    });
  }

  public getObligations(): Promise<Obligation[]> {
    return this._service.getObligations(this.applicationProcess.applicationProcessId);
  }

  //#region IApplicationProcessContext

  public get applicationItem(): ApplicationItem {
    return this._applicationItem;
  }

  public get isContextInitialized(): boolean {
    return this._isContextInitialized;
  }

  @action public clearContext() {
    this._appProcess = null;
    this._applicationItem = null;
    this._isContextInitialized = false;
  }

  public startSinging(): Promise<void> {
    return this._service.startSigning(this._appProcess.applicationProcessId).bind(this).then(signingGuid => {
      runInAction(() => {
        this._appProcess.status = ProcessStatuses.Signing;
        this._appProcess.signingGuid = signingGuid;
      })
    });
  }

  @action public signingRejected(): void {
    this._appProcess.status = ProcessStatuses.InProcess;
    this._appProcess.signingGuid = null;
  }

  public signingCompleted(): Promise<void> {

    return this._service.getApplicationProcess(this._appProcess.applicationProcessId, false).bind(this).then(proc => {
      runInAction(() => {
        this._appProcess.status = proc.status;
        this._appProcess.incomingNumbers = proc.incomingNumbers;
        this._appProcess.signingGuid = proc.signingGuid;
        this._appProcess.errorMessage = proc.errorMessage;
      });

      if (this._appProcess.status == ProcessStatuses.Sending || this._appProcess.status == ProcessStatuses.Accepted) {
        this.refreshProcessState();
      }
    });
  }

  public startSending(): Promise<void> {
    return this._service.startSending(this._appProcess.applicationProcessId).bind(this).then(() => {
      this._appProcess.status = ProcessStatuses.Sending;

      this.refreshProcessState();
    });
  }

  public returnToBeginningStatus(): Promise<void> {
    return this._service.returnToBeginningStatus(this._appProcess.applicationProcessId).bind(this).then(newStatus => {
      this._appProcess.status = ProcessStatuses.InProcess;
    });
  }

  public saveApplicationContent(application: ApplicationFormBase): Promise<void> {
    var appItem = this.getApplicationItem(application);
    var appFormState = JSON.stringify(appItem.appFormManager.application);

    if (appItem.applicationSavedState != appFormState) {
      return this._service.saveApplicationContent(this._appProcess.applicationProcessId, appItem.application.applicationId, appItem.appFormManager.application).bind(this).then(() => {
        appItem.applicationSavedState = appFormState;
      })
    }
    else {
      return Promise.resolve();
    }
  }


  public getAttachedDocumentUploadURL(application: ApplicationFormBase): string {
    var appItem = this.getApplicationItem(application);

    return this._service.getUploadURL(appItem.application);
  }

  public addAttachedDocument(application: ApplicationFormBase, applAttDocument: AttachedDocument): Promise<AttachedDocument> {
    var appItem = this.getApplicationItem(application);
    appItem.appFormManager.addAttachedDocument(applAttDocument);
    return this.saveApplicationContent(appItem.appFormManager.application).then(() => applAttDocument);
  }

  public deleteAttachedDocument(application: ApplicationFormBase, document: AttachedDocument): Promise<void> {
    var appItem = this.getApplicationItem(application);

    return this._service.deleteApplicationDocument(this._appProcess.applicationProcessId, appItem.application.applicationId, document.documentUniqueId).bind(this).then(() => {
      appItem.appFormManager.deleteAttachedDocument(document);

      return this.saveApplicationContent(appItem.appFormManager.application);
    })
  }

  public getAttachedDocumentDownloadURL(application: ApplicationFormBase, document: AttachedDocument): Promise<string> {
    var appItem = this.getApplicationItem(application);

    return Promise.resolve(this._documentService.getDownloadUrl(document.documentUniqueId))
  }

  public updateAttachedDocument(application: ApplicationFormBase, applAttDocument: AttachedDocument): Promise<void> {
    var appItem = this.getApplicationItem(application);

    return this._service.updateApplicationDocument(this._appProcess.applicationProcessId, appItem.application.applicationId, applAttDocument).bind(this).then(() => {
      var docToUpdate = appItem.appFormManager.application.documents.attachedDocuments.filter(d => d.applicationDocumentId == applAttDocument.applicationDocumentId)[0];
      docToUpdate.documentTypeId = applAttDocument.documentTypeId;
      docToUpdate.name = applAttDocument.name;
      docToUpdate.documentTypeName = applAttDocument.documentTypeName;

      return this.saveApplicationContent(appItem.appFormManager.application)
    });
  }
  //#endregion

  //#region Helpers

  public refreshProcessState(isSecondary: boolean = false): Promise<void> {
    if (this.refreshInerval) {
      clearInterval(this.refreshInerval);
      this.refreshInerval = null;
    }

    if (this._appProcess) {
      return this._service.getApplicationProcess(this._appProcess.applicationProcessId, false).bind(this).then(appProcess => {

        runInAction(() => {
          this._appProcess.status = appProcess.status;
          this._appProcess.incomingNumbers = appProcess.incomingNumbers;
          this._appProcess.errorMessage = appProcess.errorMessage;
          this._appProcess.signingGuid = appProcess.signingGuid;
        });

        if (isSecondary) {
          this.refreshCounts += 1;
        }
        else {
          this.refreshCounts = 1;
        }

        if (appProcess.status == ProcessStatuses.ReadyForSending) {
          this._service.startSending(this._appProcess.applicationProcessId).bind(this).then(() => {
            this.refreshInerval = setInterval(this.refreshProcessStateSecondary, this.refreshCounts > 100 ? 5000 : 500);
          })
        }
        else {
          if (this._appProcess.status == ProcessStatuses.Sending ||
            this._appProcess.status == ProcessStatuses.Accepted)
            this.refreshInerval = setInterval(this.refreshProcessStateSecondary, this.refreshCounts > 100 ? 5000 : 500);
        }
      })
    }
  }

  private refreshProcessStateSecondary(): Promise<void> {
    return this.refreshProcessState(true);
  }

  @action private loadApplicationProcess(appProcess: APApplicationProcess): Promise<void> {
    if (this._isContextInitialized) {
      this.clearContext();
    }

    this._appProcess = appProcess;
    this._applicationItem = null;

    var providerPromises: Promise<IApplicationProvider>[] = [];

    for (var appl of appProcess.applications) {
      providerPromises.push(ApplicationProviderFactory.getApplicationProvider(appl.type));
    }

    var managerPromises = [];
    return Promise.all(providerPromises).bind(this).then(providers => {
      runInAction(() => {
        var mainAppl = appProcess.applications.filter(appl => appl.applicationId == appProcess.mainApplicationId)[0];
        var mainApplProvider = providers.filter(p => p.appFormType == mainAppl.type)[0];
        var mainApplManager = mainApplProvider.getApplicationManager();

        for (var appl of appProcess.applications) {
          let manager: IApplicationFormManager;
          let provider = providers.filter(p => p.appFormType == appl.type)[0];

          if (appl.applicationId == mainAppl.applicationId) {
            manager = mainApplManager;
          }
          else {
            manager = provider.getApplicationManager();
          }

          managerPromises.push(manager.init(appl.applicationProcessContent.content, {
            processContext: this, isMainApplication: appl.applicationId == mainAppl.applicationId,
            applicationManager: manager, uiMode: UIModes.Edit, additionalData: appl.additionalData,
          }, appl.type));

          var appItem: ApplicationItem = {
            application: appl,
            appFormManager: manager,
            appProvider: provider
          };
          this._applicationItem = appItem;
        }

        return Promise.all(managerPromises).bind(this).then(() => {
          this._isContextInitialized = true;

          if (this._appProcess.status == ProcessStatuses.ReadyForSending ||
            this._appProcess.status == ProcessStatuses.Sending ||
            this._appProcess.status == ProcessStatuses.Accepted) {
            this.refreshProcessState();
          }
        })
      });
    });
  }

  private getApplicationItem(application: ApplicationFormBase): ApplicationItem {
    return this._applicationItem;
  }

  //#endregion
}
