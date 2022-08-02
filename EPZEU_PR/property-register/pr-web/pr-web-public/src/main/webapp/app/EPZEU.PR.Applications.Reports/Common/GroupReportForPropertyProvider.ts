import { ApplicationFormTypes } from "EPZEU.PR.Core";
import {
  ApplicationFormBase, ApplicationFormBaseValidator, 
  IApplicationFormManager,
  IApplicationProvider,
  MenuNavItem
} from "EPZEU.PR.ApplicationBase";
import { GroupReportForPropertyFormManager } from "./GroupReportForPropertyFormManager";
import { GroupReportForPropertyUI } from "../UI/Applications/GroupReportForPropertyUI";
import { ReportForPropertyValidator } from "../Models/Applications/Validators/ReportForPropertyValidator";
import { moduleContext } from "../ModuleContext";

export  class GroupReportForPropertyProvider implements IApplicationProvider{

  getUIComponentType(): any {
    return GroupReportForPropertyUI;
  }

  getMenuNavItems(application: ApplicationFormBase): MenuNavItem[] {
    return [
      {
        label: moduleContext.resourceManager.getResourceByKey("PR_APP_REQUESTED_BY"),
        sectionName: "applicantDataOfReport",       
        readonly: true
      },
      {
        label: moduleContext.resourceManager.getResourceByKey("PR_SELECTED_PROPERTIES_L"),
        sectionName: "propertySubjectOfReportSection"
      },
      {
        label: moduleContext.resourceManager.getResourceByKey("GL_INFORMED_AGREEMENT_L"),
        sectionName: "gdprAgreement",
      }
    ];
  }

  getApplicationManager(): IApplicationFormManager {
    return new GroupReportForPropertyFormManager();
  }

  getValidator(): ApplicationFormBaseValidator<ApplicationFormBase> {
    return new ReportForPropertyValidator();
  }

  get appFormType(): ApplicationFormTypes {
    return ApplicationFormTypes.RequestForReportForProperty;
  }

  getStartUIComponentType(): any {
    return null;
  }
}
