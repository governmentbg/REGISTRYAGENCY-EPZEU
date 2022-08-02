import { ApplicationFormTypes } from 'EPZEU.PR.Core';
import { ApplicationFormBase, IApplicationFormManager, IApplicationProvider, MenuNavItem } from 'EPZEU.PR.ApplicationBase';
import { ApplicationForUpcomingDealUI } from '../UI/Applications/ApplicationForUpcomingDealUI';
import { ApplicationForUpcomingDealValidator } from '../Models/Applications/Validators/ApplicationForUpcomingDealValidator';
import { ApplicationForUpcomingDealFormManager } from './ApplicationForUpcomingDealFormManager';
import { moduleContext } from "../ModuleContext";

export class ApplicationForUpcomingDealProvider implements IApplicationProvider {

  getUIComponentType(): any {
    return ApplicationForUpcomingDealUI;
  }

  getMenuNavItems(application: ApplicationFormBase): MenuNavItem[] {
    return [
      {
        label: moduleContext.resourceManager.getResourceByKey("GL_APPLICANT_DATA_L"),
        sectionName: "applicantData"  
      },
      {
        label: moduleContext.resourceManager.getResourceByKey("PR_UPCOMING_DEALS_L"),
        sectionName: "upcomingDealForProperty"
      },
      {
        label: moduleContext.resourceManager.getResourceByKey("GL_INFORMED_AGREEMENT_L"),
        sectionName: "gdprAgreement",
      }
    ];
  }

  getApplicationManager(): IApplicationFormManager {
    return new ApplicationForUpcomingDealFormManager();
  }

  getValidator(): ApplicationForUpcomingDealValidator {
    return new ApplicationForUpcomingDealValidator();
  }

  get appFormType(): ApplicationFormTypes {
    return ApplicationFormTypes.ApplicationForDeclarationOfUpcomingDealWithProperty;
  }

  getStartUIComponentType(): any {
    return null;
  }
}
