import { ApplicationFormTypes } from "EPZEU.PR.Core";
import {
  ApplicationFormBase, ApplicationFormBaseValidator,
  IApplicationFormManager,
  IApplicationProvider, MenuNavItem
} from "EPZEU.PR.ApplicationBase";
import { ReportForPersonInAllRegistryOfficesFormManager } from "./ReportForPersonInAllRegistryOfficesFormManager";
import { ReportForPersonInAllRegistryOfficesUI } from "../UI/Applications/ReportForPersonInAllRegistryOfficesUI";
import { ReportForPersonInAllRegistryOfficesValidator } from "../Models/Applications/Validators/ReportForPersonInAllRegistryOfficesValidator";
import { moduleContext } from "../ModuleContext";

export class ReportForPersonInAllRegistryOfficesProvider implements IApplicationProvider {

  getUIComponentType(): any {
    return ReportForPersonInAllRegistryOfficesUI;
  }

  getMenuNavItems(application: ApplicationFormBase): MenuNavItem[] {
    return [
      {
        label: moduleContext.resourceManager.getResourceByKey("PR_APP_REQUESTED_BY"),
        sectionName: "applicantDataOfReport",
        readonly: true
      },
      {
        label: moduleContext.resourceManager.getResourceByKey("PR_APP_00048_L"),
        sectionName: "personSubjectOfReportInAllRegistryOfficesSection",
      },
      {
        label: moduleContext.resourceManager.getResourceByKey("GL_INFORMED_AGREEMENT_L"),
        sectionName: "gdprAgreement",
      }
    ];
  }

  getApplicationManager(): IApplicationFormManager {
    return new ReportForPersonInAllRegistryOfficesFormManager();
  }

  getValidator(): ApplicationFormBaseValidator<ApplicationFormBase> {
    return new ReportForPersonInAllRegistryOfficesValidator();
  }

  get appFormType(): ApplicationFormTypes {
    return ApplicationFormTypes.RequestForReportForPersonInAllRegistryOffices;
  }

  getStartUIComponentType(): any {
    return null;
  }
}
