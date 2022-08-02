import { ApplicationFormTypes } from "EPZEU.PR.Core";
import { ApplicationFormBase, AttachedDocument, IApplicationFormManager, IApplicationProvider } from './'

export interface ApplicationItemBase {
  appFormManager: IApplicationFormManager,
  appProvider: IApplicationProvider
}

export interface ApplicationCreateRequest {
  type: ApplicationFormTypes,
  additionalData?: any
}

export enum ApplicationProcessContextType {
  Preview = 1,
  Edit = 2
}

export interface IApplicationProcessContext {
  applicationItem: ApplicationItemBase;
  isContextInitialized: boolean;
  contextType: ApplicationProcessContextType;
    
  clearContext: () => void;
   
  startSinging: () => Promise<void>;
  signingRejected: () => void;
  signingCompleted: () => Promise<void>;
  startSending: () => Promise<void>;
  returnToBeginningStatus: () => Promise<void>;

  saveApplicationContent: (applicationForm: ApplicationFormBase) => Promise<void>;

  getAttachedDocumentUploadURL: (applicationForm: ApplicationFormBase) => string;
  getAttachedDocumentDownloadURL: (applicationForm: ApplicationFormBase, document: AttachedDocument) => Promise<string>;
  addAttachedDocument: (applicationForm: ApplicationFormBase, applAttDocument: AttachedDocument) => Promise<AttachedDocument>;
  deleteAttachedDocument: (applicationForm: ApplicationFormBase, document: AttachedDocument) => Promise<void>;
  updateAttachedDocument: (applicationForm: ApplicationFormBase, applAttDocument: AttachedDocument) => Promise<void>;
}

