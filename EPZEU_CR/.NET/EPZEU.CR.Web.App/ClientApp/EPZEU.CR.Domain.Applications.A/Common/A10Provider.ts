import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationWithFieldsProviderBase, IApplicationFormManager, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { A10Validator } from '../Models/ApplicationForms/Validators/A10Validator';
import { A10UI } from '../UI/Applicaitons/A10UI';
import { A10FormManager } from './A10FormManager';

export class A10Provider extends ApplicationWithFieldsProviderBase {

    getUIComponentType(): any {
        return A10UI;
    }

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,
                label: ApplicationFormTypes[ApplicationFormTypes.A10]
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_GL_MAIN_CIRCUMSTANCES_L"),
                anchor: "mainCircumstances"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_GL_ADDITIONAL_INFORMATION_L"),
                anchor: "additionalInformation"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_GL_DEPAR_L"),
                anchor: "depar"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"),
                anchor: "documents"
            }
        ];
    }

    getApplicationManager(): IApplicationFormManager {
        return new A10FormManager();
    }

    getValidator(): A10Validator {
        return new A10Validator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.A10
    }
}