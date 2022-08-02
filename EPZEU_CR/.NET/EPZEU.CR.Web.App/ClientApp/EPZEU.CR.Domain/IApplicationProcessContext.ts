import { ApplicationFormTypes } from 'EPZEU.CR.Core'
import { IApplicationFormManager, IApplicationProvider, ProcessStates, ApplicationFormBase, AttachedDocument, ProcessStatuses } from './'


export interface ApplicationItem {
    order: number,
    applicationManager: IApplicationFormManager,
    applicationProvider: IApplicationProvider,
    isMainAppl: boolean,
}

export interface IApplicationProcessContext {
    applicationItems: ApplicationItem[];
    isContextInitialized: boolean;
    status: ProcessStatuses;
    signingGuid: string;
    documents: AttachedDocument[];

    isDraftApplicationProcess: () => boolean; 

    clearContext: () => void; 
    deleteApplicationProcess: () => Promise<void>;   

    addApplication: (request: { applicationType: ApplicationFormTypes, additionalData: any }) => Promise<ApplicationItem>;
    deleteApplication: (applicationForm: ApplicationFormBase) => Promise<void>;
    saveApplication: (applicationForm: ApplicationFormBase) => Promise<void>;
    getAdditionalApplicationFormTypes: () => { applicationType: ApplicationFormTypes, possibleProcessStates: ProcessStates[] }[];

    getAttachedDocumentUploadURL: (applicationForm: ApplicationFormBase) => string;
    getAttachedDocumentDownloadURL: (document: AttachedDocument) => Promise<string>;
    getAttachedDocumentCopyDownloadURL: (document: AttachedDocument) => string;
    addAttachedDocument: (applicationForm: ApplicationFormBase, applAttDocument: AttachedDocument) => Promise<AttachedDocument>;
    updateAttachedDocument: (applicationForm: ApplicationFormBase, applAttDocument: AttachedDocument) => Promise<void>;
    deleteAttachedDocument: (applicationForm: ApplicationFormBase, document: AttachedDocument) => Promise<void>;
    startSigningAttachedDocumentTemplate: (applicationForm: ApplicationFormBase, document: AttachedDocument) => Promise<void>;
    signingAttachedDocumentTemplateCompleted: (applicationForm: ApplicationFormBase, document: AttachedDocument) => Promise<void>;
    signingAttachedDocumentTemplateRejected: (applicationForm: ApplicationFormBase, document: AttachedDocument) => Promise<void>; 

    startSinging: () => Promise<void>;    
    startSending: () => Promise<void>;
    signingRejected: () => void;
    signingCompleted: () => Promise<void>;
    completePreregistration: () => Promise<void>;
    returnToBeginningStatus: () => Promise<void>;
}