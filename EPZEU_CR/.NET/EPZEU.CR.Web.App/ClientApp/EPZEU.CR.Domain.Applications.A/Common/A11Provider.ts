import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationWithFieldsProviderBase, IApplicationFormManager, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { A11Validator } from '../Models/ApplicationForms/Validators/A11Validator';
import { A11UI } from '../UI/Applicaitons/A11UI';
import { A11FormManager } from './A11FormManager';

export class A11Provider extends ApplicationWithFieldsProviderBase {

    getUIComponentType(): any {
        return A11UI;
    }

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,
                label: ApplicationFormTypes[ApplicationFormTypes.A11]
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
        return new A11FormManager();
    }

    getValidator(): A11Validator {
        return new A11Validator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.A11
    }
}