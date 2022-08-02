import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { IApplicationFormManager, ApplicationProviderBase, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { AppealRefusalValidator } from '../Models/Validators/AppealRefusalValidator';
import { AppealRefusalSearchUI } from '../UI/AppealRefusalSearchUI';
import { AppealRefusalUI } from '../UI/AppealRefusalUI';
import { AppealRefusalFormManager } from './AppealRefusalFormManager';

export class AppealRefusalProvider extends ApplicationProviderBase {

    //#region IApplicationProvider

    getStartUIComponentType(): any {
        return AppealRefusalSearchUI;
    }

    getUIComponentType(): any {
        return AppealRefusalUI;
    } 

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_COMPLAINT_L")
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_GL_COMPLAINANT_L"),
                anchor: "complaintPerson"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_ADDRESS_FOR_SUMMONING_L"),
                anchor: "address"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_GL_COMPLAINT_L"),
                anchor: "refusal"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"),
                anchor: "documents"
            }
        ];
    }
        
    getApplicationManager(): IApplicationFormManager {
        return new AppealRefusalFormManager();
    }

    getValidator(): AppealRefusalValidator {
        return new AppealRefusalValidator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.Complaint;
    }

    //#endregion
}
