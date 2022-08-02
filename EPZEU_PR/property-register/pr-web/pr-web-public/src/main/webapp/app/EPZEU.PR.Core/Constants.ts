
export const Constants = {
  PATHS: {
    SERVICES: "/Services",
    REPORTS: "/Reports",
    SERVICE: "/Services/:serviceID",
    APPLICATIONS: "/Applications",
    APPLICATION_PROCESSES: "/Applications/ApplicationProcesses/:applicationType/:applicationSection?",
    APPLICATION_PROCESSES_SIMPLE: "/ApplicationProcesses/:applicationType/:applicationSection?",
    APPLICATION_PREVIEW: "/ApplicationPreview/:incomingNumber",
    TAXES_CALCULATOR: "/TaxesCalculator",
    SESSION_TIMEOUT: "/SessionTimeout",
    STATUS_TEXT: "/StatusText/:incomingDocument/:spid?",
    STATUS_HISTORY: "/StatusHistory/:incomingNumber",
    DOCUMENT_ACCESS: "/DocumentAccess/:guid",
    DOCUMENT_LIMIT: "/DocumentLimit",
    SRV_APPLICATION_PROCESSES: "/Services/:serviceID/ApplicationProcesses/:applicationType/:applicationSection?",
    INCOMING_DOCUMENTS: "/IncomingDocuments",
    PROPERTY_REGISTER: "/property-register",
    MY_APPLICATIONS: "/application-list"
  },
  BG_COUNTRY_CODE: 100,
}
