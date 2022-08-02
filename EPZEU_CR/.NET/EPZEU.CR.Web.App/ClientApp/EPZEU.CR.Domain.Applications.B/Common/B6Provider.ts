import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationWithFieldsProviderBase, IApplicationFormManager, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { B6Validator } from '../Models/ApplicationForms/Validators/B6Validator';
import { B6UI } from '../UI/Applicaitons/B6UI';
import { B6FormManager } from './B6FormManager';

export class B6Provider extends ApplicationWithFieldsProviderBase {

    getUIComponentType(): any {
        return B6UI;
    }

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,
                label: ApplicationFormTypes[ApplicationFormTypes.B6]
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_TERMINATION_LIQUIDATION_L"),
                anchor: "liquidation"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"),
                anchor: "documents"
            }
        ];
    }

    getApplicationManager(): IApplicationFormManager {
        return new B6FormManager();
    }

    getValidator(): B6Validator {
        return new B6Validator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.B6;
    }
}