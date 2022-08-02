import { ObjectHelper } from "Cnsys.Core";
import { ApplicationFormTypes } from "EPZEU.PR.Core";
import { IApplicationProvider, MenuNavItem, ApplicationFormBase, IApplicationFormManager } from 'EPZEU.PR.ApplicationBase';
import { ApplicationForCertificateForPersonFormManager } from './ApplicationForCertificateForPersonFormManager';
import { moduleContext } from '../ModuleContext';
import { ApplicationForCertificateForPersonUI } from "../UI/Applications/ApplicationForCertificateForPersonUI";
import { ApplicationForCertificateForPersonValidator } from "../Models/Applications/Validators/ApplicationForCertificateForPersonValidator";
import { ApplicationForCertificateForPerson } from "../Models/Applications/ApplicationForCertificateForPerson";

export class ApplicationForCertificateForPersonProvider implements IApplicationProvider {

  getUIComponentType(): any {
    return ApplicationForCertificateForPersonUI;
  }

  getMenuNavItems(application: ApplicationFormBase): MenuNavItem[] {
    let app = application as ApplicationForCertificateForPerson;
    let menuNavItems = [];

    if (!ObjectHelper.isNullOrUndefined(app.initialApplicationData) && !ObjectHelper.isNullOrUndefined(app.initialApplicationData.incomingReauNumber)) {
      menuNavItems.push({label: moduleContext.resourceManager.getResourceByKey("PR_APPLICATION_CORRECTION_L"), sectionName: "applicationCorrection"});
    }

    menuNavItems.push({label: moduleContext.resourceManager.getResourceByKey("GL_APPLICANT_DATA_L"), sectionName: "applicantData"});
    menuNavItems.push({label: moduleContext.resourceManager.getResourceByKey("PR_REQUESTED_PERSON_L"), sectionName: "requestedPerson"});
    menuNavItems.push({label: moduleContext.resourceManager.getResourceByKey("PR_APP_WAY_OF_PROVIDING_THE_SERVICE_L"), sectionName: "wayOfProvision"});
    menuNavItems.push({label: moduleContext.resourceManager.getResourceByKey("PR_APP_CONTACT_DATA_L"), sectionName: "contactData"});
    menuNavItems.push({label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"), sectionName: "documents"});
    menuNavItems.push({label: moduleContext.resourceManager.getResourceByKey("GL_INFORMED_AGREEMENT_L"), sectionName: "gdprAgreement"});

    return menuNavItems;
  }

  getApplicationManager(): IApplicationFormManager {
    return new ApplicationForCertificateForPersonFormManager();
  }

  getValidator(): ApplicationForCertificateForPersonValidator {
    return new ApplicationForCertificateForPersonValidator();
  }

  get appFormType(): ApplicationFormTypes {
    return ApplicationFormTypes.ApplicationForCertificateForPerson;
  }

  getStartUIComponentType(): any {
    return null;
  }
}
