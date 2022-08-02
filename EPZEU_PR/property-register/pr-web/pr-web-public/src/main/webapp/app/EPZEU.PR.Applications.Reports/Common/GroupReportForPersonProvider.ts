import { ApplicationFormTypes } from "EPZEU.PR.Core";
import {
  ApplicationFormBase, ApplicationFormBaseValidator,
  IApplicationFormManager,
  IApplicationProvider, MenuNavItem
} from "EPZEU.PR.ApplicationBase";
import { GroupReportForPersonFormManager } from "./GroupReportForPersonFormManager";
import { GroupReportForPersonUI } from "../UI/Applications/GroupReportForPersonUI";
import { ReportForPersonValidator } from "../Models/Applications/Validators/ReportForPersonValidator";
import { moduleContext } from "../ModuleContext";

export class GroupReportForPersonProvider implements IApplicationProvider {

  getUIComponentType(): any {
    return GroupReportForPersonUI;
  }

  getMenuNavItems(application: ApplicationFormBase): MenuNavItem[] {
    return [
      {
        label: moduleContext.resourceManager.getResourceByKey("PR_APP_REQUESTED_BY"),
        sectionName: "applicantDataOfReport",        
        readonly: true
      },
      {
        label: moduleContext.resourceManager.getResourceByKey("PR_SELECTED_INDIVIDUALS_L"),
        sectionName: "personSubjectOfReportSection",        
      },
      {
        label: moduleContext.resourceManager.getResourceByKey("GL_INFORMED_AGREEMENT_L"),
        sectionName: "gdprAgreement",
      }
    ];
  }

  getApplicationManager(): IApplicationFormManager {
    return new GroupReportForPersonFormManager();
  }

  getValidator(): ApplicationFormBaseValidator<ApplicationFormBase> {
    return new ReportForPersonValidator();
  }

  get appFormType(): ApplicationFormTypes {
    return ApplicationFormTypes.RequestForReportForPerson;
  }

  getStartUIComponentType(): any {
    return null;
  }
}
