import { ObjectHelper } from "Cnsys.Core";
import { ApplicationFormTypes } from 'EPZEU.PR.Core';
import { IApplicationProvider, MenuNavItem, ApplicationFormBase, IApplicationFormManager } from 'EPZEU.PR.ApplicationBase';
import { ApplicationForCertificateForPropertyFormManager } from "./ApplicationForCertificateForPropertyFormManager";
import { ApplicationForCertificateForPropertyUI } from "../UI/Applications/ApplicationForCertificateForPropertyUI";
import { ApplicationForCertificateForPropertyValidator } from "../Models/Applications/Validators/ApplicationForCertificateForPropertyValidator";
import { moduleContext } from "../ModuleContext";
import { ApplicationForCertificateForProperty } from "../Models/Applications/ApplicationForCertificateForProperty";

export class ApplicationForCertificateForPropertyProvider implements IApplicationProvider {

  getUIComponentType(): any {
    return ApplicationForCertificateForPropertyUI;
  }

  getMenuNavItems(application: ApplicationFormBase): MenuNavItem[] {
    let app = application as ApplicationForCertificateForProperty;

    let menuNavItems = [];

    if (!ObjectHelper.isNullOrUndefined(app.initialApplicationData) && !ObjectHelper.isNullOrUndefined(app.initialApplicationData.incomingReauNumber)) {
      menuNavItems.push({label: moduleContext.resourceManager.getResourceByKey("PR_APPLICATION_CORRECTION_L"), sectionName: "applicationCorrection"});
    }

    menuNavItems.push({label: moduleContext.resourceManager.getResourceByKey("GL_APPLICANT_DATA_L"), sectionName: "applicantData"});
    menuNavItems.push({label: moduleContext.resourceManager.getResourceByKey("PR_REQUESTED_PROPERTY_L"), sectionName: "requestedProperty"});
    menuNavItems.push({label: moduleContext.resourceManager.getResourceByKey("PR_APP_CURRENT_OWNERS_L"), sectionName: "currentOwners"});
    menuNavItems.push({label: moduleContext.resourceManager.getResourceByKey("PR_APP_PREVIOUS_OWNERS_L"), sectionName: "previousOwners"});
    menuNavItems.push({label: moduleContext.resourceManager.getResourceByKey("PR_APP_WAY_OF_PROVIDING_THE_SERVICE_L"), sectionName: "wayOfProvision"});
    menuNavItems.push({label: moduleContext.resourceManager.getResourceByKey("PR_APP_CONTACT_DATA_L"), sectionName: "contactData"});
    menuNavItems.push({label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"), sectionName: "documents"});
    menuNavItems.push({label: moduleContext.resourceManager.getResourceByKey("GL_INFORMED_AGREEMENT_L"), sectionName: "gdprAgreement"});

    return menuNavItems;
  }

  getApplicationManager(): IApplicationFormManager {
    return new ApplicationForCertificateForPropertyFormManager();
  }

  getValidator(): ApplicationForCertificateForPropertyValidator {
    return new ApplicationForCertificateForPropertyValidator();
  }

  get appFormType(): ApplicationFormTypes {
    return ApplicationFormTypes.ApplicationForCertificateForProperty;
  }

  getStartUIComponentType(): any {
    return null;
  }
}
