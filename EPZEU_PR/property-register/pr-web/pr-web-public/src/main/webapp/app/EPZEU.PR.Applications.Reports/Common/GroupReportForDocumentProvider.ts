import { ApplicationFormTypes } from "EPZEU.PR.Core";
import { IApplicationProvider, MenuNavItem, ApplicationFormBase, IApplicationFormManager } from 'EPZEU.PR.ApplicationBase';
import { GroupReportForDocumentUI} from "../UI/Applications/GroupReportForDocumentUI";
import { GroupReportForDocumentFormManager } from "./GroupReportForDocumentFormManager";
import { ReportForDocumentValidator } from "../Models/Applications/Validators/ReportForDocumentValidator";
import { moduleContext } from "../ModuleContext";

export class GroupReportForDocumentProvider implements IApplicationProvider {

  getUIComponentType(): any {
    return GroupReportForDocumentUI;
  }

  getMenuNavItems(application: ApplicationFormBase): MenuNavItem[] {
    return [
      {
        label: moduleContext.resourceManager.getResourceByKey("PR_APP_REQUESTED_BY"),
        sectionName: "applicantDataOfReport",        
        readonly: true
      },
      {
        label: moduleContext.resourceManager.getResourceByKey("PR_DOCUMENTS_SUBJECT_OF_REPORT_L"),
        sectionName: "documentSubjectOfReportSection",

      },
      {
        label: moduleContext.resourceManager.getResourceByKey("GL_INFORMED_AGREEMENT_L"),
        sectionName: "gdprAgreement",
      }
    ];
  }

  getApplicationManager(): IApplicationFormManager {
    return new GroupReportForDocumentFormManager();
  }

  getValidator(): ReportForDocumentValidator {
    return new ReportForDocumentValidator();
  }

  get appFormType(): ApplicationFormTypes {
    return ApplicationFormTypes.RequestForReportForDocument;
  }

  getStartUIComponentType(): any {
    return null;
  }
}
