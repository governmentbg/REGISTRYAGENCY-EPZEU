import { appConfig } from 'EPZEU.Core'

export const Constants = {   
    PATHS: {
        REPORTS: "/Reports",
        APPLICATION_PROCESSES: `/${appConfig.paths.applications}/${appConfig.paths.applicationProcesses}/:applicationType/:applicationOrder?`.replace("//", "/").replace("//", "/"),
        APPLICATION_PROCESSES_SIMPLE:`/${ appConfig.paths.applicationProcesses }/:applicationType/:applicationOrder?`.replace("//", "/").replace("//", "/"),
        APPLICATION_DRAFT_PREVIEW: `${appConfig.paths.applicationDraftPreview}/:processID`,
        SUBDEEDPREVIEW: "/SubDeedPreview",
        INCOMING_DOCUMENTS: appConfig.paths.incomingDocuments,
        OUTGOING_DOCUMENTS: appConfig.paths.outgoingDocuments,
        INSTRUCTION: appConfig.paths.instructions,
        SESSION_TIMEOUT: "/SessionTimeout",
        DOCUMENT_ACCESS: "/DocumentAccess/:guid",
        DOCUMENT_DRAFT_ACCESS: "/DocumentDraftAccess/:guid",
        DOCUMENT_ACCESS_COMPANY_CF: "/DocumentAccess/:uic/:guid",
        DOCUMENT_LIMIT: "/DocumentLimit",
        REQUEST_FOR_CORRECTION_FOR_SCANNING: "/RequestForCorrectionForScanning/:incomingNumber",
    }
}