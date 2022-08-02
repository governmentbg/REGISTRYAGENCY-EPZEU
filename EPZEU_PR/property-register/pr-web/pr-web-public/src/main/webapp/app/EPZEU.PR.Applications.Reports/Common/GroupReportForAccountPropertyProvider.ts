import { ApplicationFormTypes } from "EPZEU.PR.Core";
import {
  IApplicationFormManager, ApplicationFormBase, ApplicationFormBaseValidator,
  IApplicationProvider, MenuNavItem
} from "EPZEU.PR.ApplicationBase";
import { GroupReportForAccountPropertyFormManager } from "./GroupReportForAccountPropertyFormManager";
import { GroupReportForAccountPropertyUI } from "../UI/Applications/GroupReportForAccountPropertyUI";
import { ReportForAccountPropertyValidator } from "../Models/Applications/Validators/ReportForAccountPropertyValidator";
import { moduleContext } from "../ModuleContext";

export class GroupReportForAccountPropertyProvider implements IApplicationProvider {

  getUIComponentType(): any {
    return GroupReportForAccountPropertyUI;
  }

  getMenuNavItems(application: ApplicationFormBase): MenuNavItem[] {
    return [
      {
        label: moduleContext.resourceManager.getResourceByKey("PR_APP_REQUESTED_BY"),
        sectionName: "applicantDataOfReport",      
        readonly: true
      },
      {
        label: moduleContext.resourceManager.getResourceByKey("PR_SELECTED_ACCOUNT_PROPERTIES_L"),
        sectionName: "accountPropertySubjectOfReportSection",
      },
      {
        label: moduleContext.resourceManager.getResourceByKey("GL_INFORMED_AGREEMENT_L"),
        sectionName: "gdprAgreement",
      }
    ];
  }

  getApplicationManager(): IApplicationFormManager {
    return new GroupReportForAccountPropertyFormManager();
  }


  getValidator(): ApplicationFormBaseValidator<ApplicationFormBase> {
    return new ReportForAccountPropertyValidator();
  }

  get appFormType(): ApplicationFormTypes {
    return ApplicationFormTypes.RequestForReportForAccountProperty;
  }

  getStartUIComponentType(): any {
    return null;
  }
}
