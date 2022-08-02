import { ApplicationFormTypes } from 'EPZEU.PR.Core';
import { ApplicationFormBase, IApplicationFormManager, IApplicationProvider, MenuNavItem } from 'EPZEU.PR.ApplicationBase';
import { ApplicationForCertifiedCopyUI } from '../UI/Applications/ApplicationForCertifiedCopyUI';
import { ApplicationForCertifiedCopyValidator } from '../Models/Applications/Validators/ApplicationForCertifiedCopyValidator';
import { ApplicationForCertifiedCopyFormManager } from './ApplicationForCertifiedCopyFormManager';
import { moduleContext } from "../ModuleContext";

export class ApplicationForCertifiedCopyProvider implements IApplicationProvider {

  getUIComponentType(): any {
    return ApplicationForCertifiedCopyUI;
  }

  getMenuNavItems(application: ApplicationFormBase): MenuNavItem[] {
    return [
      {
        label: moduleContext.resourceManager.getResourceByKey("GL_APPLICANT_DATA_L"),
        sectionName: "applicantData"  
      },
      {
        label: moduleContext.resourceManager.getResourceByKey("PR_SERVICE_RECIPIENT_L"),
        sectionName: "serviceRecipient"
      },
      {
        label: moduleContext.resourceManager.getResourceByKey("PR_APP_COPY_OF_ACT_L"),
        sectionName: "actRequestingACopy"
      },
      {
        label: moduleContext.resourceManager.getResourceByKey("PR_APP_WAY_OF_PROVIDING_THE_SERVICE_L"),
        sectionName: "wayOfProvision"
      },
      {
        label: moduleContext.resourceManager.getResourceByKey("PR_APP_CONTACT_DATA_L"),
        sectionName: "contactData"
      },
      {
        label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"),
        sectionName: "documents"
      },
      {
        label: moduleContext.resourceManager.getResourceByKey("GL_INFORMED_AGREEMENT_L"),
        sectionName: "gdprAgreement"
      }
    ];
  }

  getApplicationManager(): IApplicationFormManager {
    return new ApplicationForCertifiedCopyFormManager();
  }

  getValidator(): ApplicationForCertifiedCopyValidator {
    return new ApplicationForCertifiedCopyValidator();
  }

  get appFormType(): ApplicationFormTypes {
    return ApplicationFormTypes.ApplicationForCertifiedCopy;
  }

  getStartUIComponentType(): any {
    return null;
  }
}
