import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationWithFieldsProviderBase, IApplicationFormManager, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { V22Validator } from '../Models/ApplicationForms/Validators/V22Validator';
import { V22UI } from '../UI/Applications/V22UI';
import { V22FormManager } from './V22FormManager';

export class V22Provider extends ApplicationWithFieldsProviderBase {
    getStartUIComponentType(): any {
        return null;
    }

    getUIComponentType(): any {
        return V22UI;
    }

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,
                label: ApplicationFormTypes[ApplicationFormTypes.V22]
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_GL_TRANSFORMATION_L"),
                anchor: "transformation"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_GL_BRANCHES_SEPARATION_L"),
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
        return new V22FormManager();
    }

    getValidator(): V22Validator {
        return new V22Validator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.V22;
    }
}