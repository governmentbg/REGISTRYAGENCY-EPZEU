import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationWithFieldsProviderBase, IApplicationFormManager, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { V32Validator } from '../Models/ApplicationForms/Validators/V32Validator';
import { V32UI } from '../UI/Applications/V32UI';
import { V32FormManager } from './V32FormManager';

export class V32Provider extends ApplicationWithFieldsProviderBase {
    getStartUIComponentType(): any {
        return null;
    }

    getUIComponentType(): any {
        return V32UI;
    }

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,
                label: ApplicationFormTypes[ApplicationFormTypes.V32]
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_GL_REALIGNMENT_L"),
                anchor: "realignment"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_GL_BRANCHES_L"),
                anchor: "branches"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"),
                anchor: "documents"
            }
        ];
    }

    getApplicationManager(): IApplicationFormManager {
        return new V32FormManager();
    }

    getValidator(): V32Validator {
        return new V32Validator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.V32;
    }
}