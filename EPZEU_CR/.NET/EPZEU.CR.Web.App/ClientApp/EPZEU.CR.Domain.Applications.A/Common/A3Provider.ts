import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationWithFieldsProviderBase, IApplicationFormManager, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { A3Validator } from '../Models/ApplicationForms/Validators/A3Validator';
import { A3UI } from '../UI/Applicaitons/A3UI';
import { A3FormManager } from './A3FormManager';

export class A3Provider extends ApplicationWithFieldsProviderBase {

    //#region IApplicationProvider

    getUIComponentType(): any {
        return A3UI;
    }

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,
                label: ApplicationFormTypes[ApplicationFormTypes.A3]
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
        return new A3FormManager();
    }

    getValidator(): A3Validator {
        return new A3Validator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.A3;
    }

    //#endregion
}