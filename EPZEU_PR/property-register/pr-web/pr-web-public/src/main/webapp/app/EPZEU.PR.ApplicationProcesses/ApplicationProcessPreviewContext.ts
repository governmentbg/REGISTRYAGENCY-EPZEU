import { IApplicationProcessContext, ApplicationFormBase, AttachedDocument, ApplicationProviderFactory, UIModes, ApplicationProcessContextType } from "EPZEU.PR.ApplicationBase";
import { observable, action } from "mobx";
import { ApplicationItem } from "./ApplicationProcessContext";
import { ApplicationProcessDataService, ApplicationDataService } from "./Services";
import { ClientError, ObjectHelper } from "Cnsys.Core";
import { DocumentsDataService } from "./Services/DocumentDataService";

export class ApplicationProcessPreviewContext implements IApplicationProcessContext {
  @observable private _isContextInitialized: boolean;
  private _applicationItem: ApplicationItem;
  private _appProcessService: ApplicationProcessDataService;
  private _appService: ApplicationDataService;

  constructor() {
    this._isContextInitialized = false;
    this._appProcessService = new ApplicationProcessDataService();
    this._appService = new ApplicationDataService();
  }

  public async tryLoadDraftApplicationProcess(appProcessID: number): Promise<boolean> {
    if (this.isContextInitialized) {
      this.clearContext();
    }

    var appProcess = await this._appProcessService.getApplicationProcess(appProcessID, true);

    if (ObjectHelper.isNullOrUndefined(appProcess)) {
      return false;
    }

    var provider = await ApplicationProviderFactory.getApplicationProvider(appProcess.applications[0].type);
    var appManager = provider.getApplicationManager();

    await appManager.init(appProcess.applications[0].applicationProcessContent.content, { processContext: this, isMainApplication: true, applicationManager: appManager, uiMode: UIModes.Preview }, appProcess.applications[0].type);

    this._applicationItem = {
      appFormManager: appManager,
      appProvider: provider
    };

    this._isContextInitialized = true;

    return Promise.resolve(true);
  }

  public async tryLoadSendApplicationProcess(incomingNumber: string): Promise<boolean> {
    if (this.isContextInitialized) {
      this.clearContext();
    }

    var appForm = await this._appService.getApplicationForm(incomingNumber);

    if (ObjectHelper.isNullOrUndefined(appForm) || appForm == "") {
      return false;
    }

    var provider = await ApplicationProviderFactory.getApplicationProvider((<ApplicationFormBase>appForm).appFormType);
    var appManager = provider.getApplicationManager();

    await appManager.init(appForm, { processContext: this, isMainApplication: true, applicationManager: appManager, uiMode: UIModes.Preview }, (<ApplicationFormBase>appForm).appFormType);

    this._applicationItem = {
      appFormManager: appManager,
      appProvider: provider
    };

    this._isContextInitialized = true;

    return true;
  }

  //#region IApplicationProcessContext

  public get applicationItem(): ApplicationItem {
    return this._applicationItem;
  }

  public get isContextInitialized(): boolean {
    return this._isContextInitialized;
  }

  public get contextType(): ApplicationProcessContextType {
    return ApplicationProcessContextType.Preview;
  }
  
  public getAttachedDocumentUploadURL(application: ApplicationFormBase): string {
    throw new ClientError("getAttachedDocumentUploadURL is not Implemented.");
  }

  public getAttachedDocumentDownloadURL(application: ApplicationFormBase, document: AttachedDocument): Promise<string> {
    var docService = new DocumentsDataService();

    return docService.getDownloadUrl(document.documentUniqueId);
  }

  public addAttachedDocument(application: ApplicationFormBase, applAttDocument: AttachedDocument): Promise<AttachedDocument> {
    throw new ClientError("addAttachedDocument is not Implemented.");
  }

  public deleteAttachedDocument(application: ApplicationFormBase, applAttDocument: AttachedDocument): Promise<void> {
    throw new ClientError("deleteAttachedDocument is not Implemented.");
  }

  public updateAttachedDocument(application: ApplicationFormBase, applAttDocument: AttachedDocument): Promise<void> {
      throw new ClientError("updateAttachedDocument is not Implemented.");
  }

  public saveApplicationContent(applicationForm: ApplicationFormBase): Promise<void> {
    throw new ClientError("saveApplicationContent is not Implemented.");
  }

  @action public clearContext() {
    this._applicationItem = null;
    this._isContextInitialized = false;
  }
  
  public startSinging(): Promise<void> {
    throw new ClientError("startSinging is not Implemented.");
  }

  public signingRejected(): void {
    throw new ClientError("signingRejected is not Implemented.");
  }

  public signingCompleted(): Promise<void> {
    throw new ClientError("signingCompleted is not Implemented.");
  }

  public startSending(): Promise<void> {
    throw new ClientError("startSending is not Implemented.");
  }

  public returnToBeginningStatus(): Promise<void> {
    throw new ClientError("returnToBeginningStatus is not Implemented.");
  }

  //#endregion 
}
