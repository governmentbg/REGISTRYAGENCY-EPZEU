import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationWithFieldsProviderBase, IApplicationFormManager, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { A15Validator } from '../Models/ApplicationForms/Validators/A15Validator';
import { A15UI } from '../UI/Applicaitons/A15UI';
import { A15FormManager } from './A15FormManager';

export class A15Provider extends ApplicationWithFieldsProviderBase {

    //#region IApplicationProvider

    getUIComponentType(): any {
        return A15UI;
    }

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,
                label: ApplicationFormTypes[ApplicationFormTypes.A15]
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_GL_MAIN_CIRCUMSTANCES_L"),
                anchor: "mainCircumstances"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"),
                anchor: "documents"
            }
        ];
    }

    getApplicationManager(): IApplicationFormManager {
        return new A15FormManager();
    }

    getValidator(): A15Validator {
        return new A15Validator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.A15
    }

    //#endregion
}
