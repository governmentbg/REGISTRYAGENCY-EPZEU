import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationWithFieldsProviderBase, IApplicationFormManager, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { A7Validator } from '../Models/ApplicationForms/Validators/A7Validator';
import { A7UI } from '../UI/Applicaitons/A7UI';
import { A7FormManager } from './A7FormManager';

export class A7Provider extends ApplicationWithFieldsProviderBase {

    getUIComponentType(): any {
        return A7UI;
    }

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,
                label: ApplicationFormTypes[ApplicationFormTypes.A7]
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
        return new A7FormManager();
    }

    getValidator(): A7Validator {
        return new A7Validator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.A7
    }
}