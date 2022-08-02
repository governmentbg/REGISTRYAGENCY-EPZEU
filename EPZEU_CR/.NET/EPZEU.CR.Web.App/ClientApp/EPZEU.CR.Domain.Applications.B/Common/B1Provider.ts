import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationWithFieldsProviderBase, IApplicationFormManager, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { B1Validator } from '../Models/ApplicationForms/Validators/B1Validator';
import { B1UI } from '../UI/Applicaitons/B1UI';
import { B1FormManager } from './B1FormManager';

export class B1Provider extends ApplicationWithFieldsProviderBase {

    getUIComponentType(): any {
        return B1UI;
    }

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,
                label: ApplicationFormTypes[ApplicationFormTypes.B1]
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_GL_PROCURA_L"),
                anchor: "procura"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"),
                anchor: "documents"
            }
        ];
    }

    getApplicationManager(): IApplicationFormManager {
        return new B1FormManager();
    }

    getValidator(): B1Validator {
        return new B1Validator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.B1;
    }
}