import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationWithFieldsProviderBase, IApplicationFormManager, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { V31Validator } from '../Models/ApplicationForms/Validators/V31Validator';
import { V31UI } from '../UI/Applications/V31UI';
import { V31FormManager } from './V31FormManager';

export class V31Provider extends ApplicationWithFieldsProviderBase {
    getStartUIComponentType(): any {
        return null;
    }

    getUIComponentType(): any {
        return V31UI;
    }

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,
                label: ApplicationFormTypes[ApplicationFormTypes.V31]
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_GL_REALIGNMENT_L"),
                anchor: "realignment"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"),
                anchor: "documents"
            }
        ];
    }

    getApplicationManager(): IApplicationFormManager {
        return new V31FormManager();
    }

    getValidator(): V31Validator {
        return new V31Validator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.V31;
    }
}