import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationProviderBase, IApplicationFormManager, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { ActOfContestationValidator } from '../Models/Validators/ActOfContestationValidator';
import { ActOfContestationUI } from '../UI/ActOfContestationUI';
import { ActOfContestationFormManager } from './ActOfContestationFormManager';

export class ActOfContestationProvider extends ApplicationProviderBase {

    //#region IApplicationProvider

    getStartUIComponentType(): any {
        return null;
    }

    getUIComponentType(): any {
        return ActOfContestationUI;
    } 

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,
                label: moduleContext.resourceManager.getResourceByKey("GL_ACT_L")
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_DETAILS_ABOUT_INTERESTED_PERSON_L"),
                anchor: "interestedPerson"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_00001_SHORT_L"),
                anchor: "address"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_ANNOUNCEMENT_COURT_ACT_APPL_CONTESTATION_TRANSFORM_L"),
                anchor: "contestationAct"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"),
                anchor: "documents"
            }
        ];
    }
        
    getApplicationManager(): IApplicationFormManager {
        return new ActOfContestationFormManager();
    }

    getValidator(): ActOfContestationValidator {
        return new ActOfContestationValidator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.ActOfContestation;
    }

    //#endregion
}
