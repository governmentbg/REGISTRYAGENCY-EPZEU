import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationProviderBase, IApplicationFormManager, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { AppointingDemandValidator } from '../Models/Validators/AppointingDemandValidator';
import { AppointingDemandUI } from '../UI/AppointingDemandUI';
import { AppointingDemandFormManager } from './AppointingDemandFormManager';

export class AppointingDemandProvider extends ApplicationProviderBase {

    getStartUIComponentType(): any {
        return null;
    }

    getUIComponentType(): any {
        return AppointingDemandUI;
    }

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_REQUEST_L")
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_APPOINTMENT_DATA_L"),
                anchor: "appointmentData"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("GL_APPLICANT_L"),
                anchor: "applicant"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_00001_SHORT_L"),
                anchor: "address"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"),
                anchor: "documents"
            }
        ];
    }

    getApplicationManager(): IApplicationFormManager {
        return new AppointingDemandFormManager();
    }

    getValidator(): AppointingDemandValidator {
        return new AppointingDemandValidator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.AppointingExpert;
    }
}