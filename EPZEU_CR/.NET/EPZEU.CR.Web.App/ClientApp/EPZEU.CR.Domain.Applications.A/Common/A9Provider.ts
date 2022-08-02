import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationWithFieldsProviderBase, IApplicationFormManager, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { A9Validator } from '../Models/ApplicationForms/Validators/A9Validator';
import { A9UI } from '../UI/Applicaitons/A9UI';
import { A9FormManager } from './A9FormManager';

export class A9Provider extends ApplicationWithFieldsProviderBase {

    getUIComponentType(): any {
        return A9UI;
    }

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,
                label: ApplicationFormTypes[ApplicationFormTypes.A9]
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
        return new A9FormManager();
    }

    getValidator(): A9Validator {
        return new A9Validator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.A9
    }
}