import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationProviderBase, IApplicationFormManager, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { IncomingRequestForCorrectionValidator } from '../Models/Validators/IncomingRequestForCorrectionValidator';
import { IncomingRequestForCorrectionSearchUI } from '../UI/IncomingRequestForCorrectionSearchUI';
import { IncomingRequestForCorrectionUI } from '../UI/IncomingRequestForCorrectionUI';
import { IncomingRequestForCorrectionFormManager } from './IncomingRequestForCorrectionFormManager';

export class IncomingRequestForCorrectionProvider extends ApplicationProviderBase {

    //#region IApplicationProvider

    getStartUIComponentType(): any {
        return IncomingRequestForCorrectionSearchUI;
    }

    getUIComponentType(): any {
        return IncomingRequestForCorrectionUI;
    } 

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_REQUEST_L")
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
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_REQUEST_FOR_ERRORS_AND_INCOMPLETENESS_L"),
                anchor: "requestData"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"),
                anchor: "documents"
            }
        ];
    }
        
    getApplicationManager(): IApplicationFormManager {
        return new IncomingRequestForCorrectionFormManager();
    }

    getValidator(): IncomingRequestForCorrectionValidator {
        return new IncomingRequestForCorrectionValidator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.RequestForCorrection
    }

    //#endregion
}
