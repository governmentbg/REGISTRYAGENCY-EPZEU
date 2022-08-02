import { TypeSystem } from 'Cnsys.Core';
import { Nomenclatures, Registers } from "EPZEU.Core";
import { ApplicationTypePR, NomenclaturesPR } from "EPZEU.PR.Core";
import { ApplicationFormBase } from '../Models';
import { moduleContext } from '../ModuleContext';
import { IApplicationProcessContext } from "../IApplicationProcessContext";
import { AttachedDocument } from "../Models/AttachedDocument";

export interface ApplicationManagerInitParams {
  processContext: IApplicationProcessContext,
  isMainApplication: boolean,
  applicationManager: IApplicationFormManager,
  uiMode: UIModes,
  additionalData?: any
}

export enum UIModes {
  Preview = 1,
  Edit = 2
}

TypeSystem.registerEnumInfo(UIModes, 'UIModes', moduleContext.moduleName);

export interface IApplicationFormManager {
  application: ApplicationFormBase,
  processContext: IApplicationProcessContext,
  cost: number;
  additionalData: any

  init: (appJson: any, initParams: ApplicationManagerInitParams, appFormType: number) => Promise<ApplicationFormBase>

  getPossibleAttachedDocumentTypes: () => Promise<{ documentTypeID: string, documentTypeName: string, minOccurs: number, maxOccurs: number }[]>;

  addAttachedDocument: (applAttDocument: AttachedDocument) => void;
  deleteAttachedDocument: (applAttDocument: AttachedDocument) => void;
  isTaxFree: boolean;
}

export abstract class ApplicationFormBaseManager<TAppl extends ApplicationFormBase> implements IApplicationFormManager {

  private _application: TAppl;
  protected initParams: ApplicationManagerInitParams;
  protected nomApplicationType: ApplicationTypePR;

  constructor() {
    this.getPossibleAttachedDocumentTypes = this.getPossibleAttachedDocumentTypes.bind(this);
  }

  public isTaxFree: boolean;

  protected abstract createApplication(obj: any): TAppl;

  protected initApplicationData(): Promise<void> {
    return Promise.resolve();
  }

  public abstract cost: number;

  public get additionalData(): any {
    return this.initParams.additionalData;
  }

  public init(appJson: any, initParams: ApplicationManagerInitParams, appFormType: number): Promise<ApplicationFormBase> {
    this.initParams = initParams;
    this._application = this.createApplication(appJson);
    this._application.appFormType = appFormType;

    return NomenclaturesPR.getApplicationTypes(at => at.appType == appFormType).bind(this).then(appTypes => {
      this.nomApplicationType = appTypes[0];

      if (this.initParams.uiMode == UIModes.Edit) {
        return this.initApplicationData().bind(this).then((app) => {
          return this.application;
        });
      }
      else {
        return Promise.resolve(this.application);
      }
    });
  }

  public get application(): TAppl {
    return this._application;
  }

  public get processContext(): IApplicationProcessContext {
    return this.initParams.processContext;
  }

  public addAttachedDocument(applAttDocument: AttachedDocument): void {
    if (!this.application.documents.attachedDocuments) {
      this.application.documents.attachedDocuments = [];
    }

    this.application.documents.attachedDocuments.push(applAttDocument);
  }

  public deleteAttachedDocument(applAttDocument: AttachedDocument): void {
    let applAttDocumentIndex = this.application.documents.attachedDocuments.indexOf(applAttDocument);

    if (applAttDocumentIndex > -1) {
      this.application.documents.attachedDocuments.splice(applAttDocumentIndex, 1);
    }
  }

  public getPossibleAttachedDocumentTypes(): Promise<{ documentTypeID: string, documentTypeName: string, minOccurs: number, maxOccurs: number }[]> {
    return Nomenclatures.getApplicationDocumentTypes(Registers.PR, this.application.appFormType.toString()).bind(this)
      .then(appDocTypes => {
        return appDocTypes
          .map(appDocType => {
            return { documentTypeID: appDocType.documentTypeID, documentTypeName: appDocType.documentType.name, minOccurs: appDocType.minOccurs, maxOccurs: appDocType.maxOccurs }
          })
      });
  }
}
