import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationWithFieldsProviderBase, IApplicationFormManager, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { B2Validator } from '../Models/ApplicationForms/Validators/B2Validator';
import { B2UI } from '../UI/Applicaitons/B2UI';
import { B2FormManager } from './B2FormManager';

export class B2Provider extends ApplicationWithFieldsProviderBase {

    getUIComponentType(): any {
        return B2UI;
    }

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,
                label: ApplicationFormTypes[ApplicationFormTypes.B2]
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_GL_BRANCH_L"),
                anchor: "branch"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"),
                anchor: "documents"
            }
        ];
    }

    getApplicationManager(): IApplicationFormManager {
        return new B2FormManager();
    }

    getValidator(): B2Validator {
        return new B2Validator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.B2;
    }
}