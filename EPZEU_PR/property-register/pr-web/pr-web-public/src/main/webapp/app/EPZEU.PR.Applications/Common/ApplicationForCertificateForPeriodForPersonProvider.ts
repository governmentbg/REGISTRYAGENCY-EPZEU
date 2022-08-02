import { ApplicationFormTypes } from "EPZEU.PR.Core";
import { ApplicationFormBase, IApplicationFormManager, IApplicationProvider, MenuNavItem } from 'EPZEU.PR.ApplicationBase';
import { moduleContext } from '../ModuleContext';
import { ApplicationForCertificateForPeriodFormManager } from "./ApplicationForCertificateForPeriodFormManager";
import { ApplicationForCertificateForPeriodUI } from "../UI/Applications/ApplicationForCertificateForPeriodUI";
import { ApplicationForCertificateForPeriodValidator } from "../Models/Applications/Validators/ApplicationForCertificateForPeriodValidator";
import { ObjectHelper } from "Cnsys.Core";
import { ApplicationForCertificateForPeriod } from "../Models/Applications/ApplicationForCertificateForPeriod";

export class ApplicationForCertificateForPeriodForPersonProvider implements IApplicationProvider {

  getStartUIComponentType(): any {
    return null;
  }

  getUIComponentType(): any {
    return ApplicationForCertificateForPeriodUI;
  }

  getMenuNavItems(application: ApplicationFormBase): MenuNavItem[] {
    let app = application as ApplicationForCertificateForPeriod;
    let menuNavItems = [];

    if (!ObjectHelper.isNullOrUndefined(app.initialApplicationData) && !ObjectHelper.isNullOrUndefined(app.initialApplicationData.incomingReauNumber)) {
      menuNavItems.push({label: moduleContext.resourceManager.getResourceByKey("PR_APPLICATION_CORRECTION_L"), sectionName: "applicationCorrection"});
    }

    menuNavItems.push({label: moduleContext.resourceManager.getResourceByKey("GL_APPLICANT_DATA_L"), sectionName: "applicantData"});
    menuNavItems.push({label: moduleContext.resourceManager.getResourceByKey("PR_CERTIFICATE_FOR_PERIOD_L"), sectionName: "periodForCertificate"});
    menuNavItems.push({label: moduleContext.resourceManager.getResourceByKey("PR_REQUESTED_PERSON_L"), sectionName: "requestedPerson"});
    menuNavItems.push({label: moduleContext.resourceManager.getResourceByKey("PR_APP_WAY_OF_PROVIDING_THE_SERVICE_L"), sectionName: "wayOfProvision"});
    menuNavItems.push({label: moduleContext.resourceManager.getResourceByKey("PR_APP_CONTACT_DATA_L"), sectionName: "contactData"});
    menuNavItems.push({label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"), sectionName: "documents"});
    menuNavItems.push({label: moduleContext.resourceManager.getResourceByKey("GL_INFORMED_AGREEMENT_L"), sectionName: "gdprAgreement"});

    return menuNavItems;
  }

  getApplicationManager(): IApplicationFormManager {
    return new ApplicationForCertificateForPeriodFormManager();
  }

  getValidator(): ApplicationForCertificateForPeriodValidator {
    return new ApplicationForCertificateForPeriodValidator();
  }

  get appFormType(): ApplicationFormTypes {
      return ApplicationFormTypes.ApplicationForCertificateForPeriodForPerson;
  }
}
