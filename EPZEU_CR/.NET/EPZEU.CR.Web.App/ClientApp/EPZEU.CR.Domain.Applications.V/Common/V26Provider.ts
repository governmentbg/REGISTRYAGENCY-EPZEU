import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationWithFieldsProviderBase, IApplicationFormManager, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { V26Validator } from '../Models/ApplicationForms/Validators/V26Validator';
import { V26UI } from '../UI/Applications/V26UI';
import { V26FormManager } from './V26FormManager';

export class V26Provider extends ApplicationWithFieldsProviderBase {
    getStartUIComponentType(): any {
        return null;
    }

    getUIComponentType(): any {
        return V26UI;
    }

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,
                label: ApplicationFormTypes[ApplicationFormTypes.V26]
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_GL_TRANSFORMATION_L"),
                anchor: "transformation"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_GL_BRANCHES_SEPARATION_L"),
                anchor: "branchesSeparation"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"),
                anchor: "documents"
            }
        ];
    }

    getApplicationManager(): IApplicationFormManager {
        return new V26FormManager();
    }

    getValidator(): V26Validator {
        return new V26Validator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.V26;
    }
}