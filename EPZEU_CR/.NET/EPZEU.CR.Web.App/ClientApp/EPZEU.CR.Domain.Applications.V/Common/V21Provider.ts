import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationWithFieldsProviderBase, IApplicationFormManager, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { V21Validator } from '../Models/ApplicationForms/Validators/V21Validator';
import { V21UI } from '../UI/Applications/V21UI';
import { V21FormManager } from './V21FormManager';

export class V21Provider extends ApplicationWithFieldsProviderBase {
    getStartUIComponentType(): any {
        return null;
    }

    getUIComponentType(): any {
        return V21UI;
    }

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,
                label: ApplicationFormTypes[ApplicationFormTypes.V21]
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_GL_TRANSFORMATION_L"),
                anchor: "transformation"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"),
                anchor: "documents"
            }
        ];
    }

    getApplicationManager(): IApplicationFormManager {
        return new V21FormManager();
    }

    getValidator(): V21Validator {
        return new V21Validator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.V21;
    }
}