import { ApplicationFormTypes } from 'EPZEU.PR.Core';
import { ApplicationFormBase, IApplicationFormManager, IApplicationProvider, MenuNavItem } from 'EPZEU.PR.ApplicationBase';
import { ApplicationForNotCertifiedCopyUI } from '../UI/Applications/ApplicationForNotCertifiedCopyUI';
import { ApplicationForNotCertifiedCopyValidator } from '../Models/Applications/Validators/ApplicationForNotCertifiedCopyValidator';
import { ApplicationForNotCertifiedCopyFormManager } from './ApplicationForNotCertifiedCopyFormManager';
import { moduleContext } from "../ModuleContext";

export class ApplicationForNotCertifiedCopyProvider implements IApplicationProvider {

  getUIComponentType(): any {
    return ApplicationForNotCertifiedCopyUI;
  }

  getMenuNavItems(application: ApplicationFormBase): MenuNavItem[] {
    return [
      {
        label: moduleContext.resourceManager.getResourceByKey("GL_APPLICANT_DATA_L"),
        sectionName: "applicantData"  
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
        label: moduleContext.resourceManager.getResourceByKey("GL_INFORMED_AGREEMENT_L"),
        sectionName: "gdprAgreement"
      }
    ];
  }

  getApplicationManager(): IApplicationFormManager {
    return new ApplicationForNotCertifiedCopyFormManager();
  }

  getValidator(): ApplicationForNotCertifiedCopyValidator {
    return new ApplicationForNotCertifiedCopyValidator();
  }

  get appFormType(): ApplicationFormTypes {
    return ApplicationFormTypes.ApplicationForNotCertifiedCopy;
  }

  getStartUIComponentType(): any {
    return null;
  }
}
