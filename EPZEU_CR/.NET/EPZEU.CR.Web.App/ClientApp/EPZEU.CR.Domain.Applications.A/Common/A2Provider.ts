import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationWithFieldsProviderBase, IApplicationFormManager, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { A2Validator } from '../Models/ApplicationForms/Validators/A2Validator';
import { A2UI } from '../UI/Applicaitons/A2UI';
import { A2FormManager } from './A2FormManager';

export class A2Provider extends ApplicationWithFieldsProviderBase {

    //#region IApplicationProvider

    getUIComponentType(): any {
        return A2UI;
    }

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,
                label: ApplicationFormTypes[ApplicationFormTypes.A2]
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
        return new A2FormManager();
    }

    getValidator(): A2Validator {
        return new A2Validator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.A2;
    }

    //#endregion
}