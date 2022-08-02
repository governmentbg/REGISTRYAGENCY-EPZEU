import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationWithFieldsProviderBase, IApplicationFormManager, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { D1Validator } from '../Models/ApplicationForms/Validators/D1Validator';
import { D1UI } from '../UI/Applications/D1UI';
import { D1FormManager } from './D1FormManager';

export class D1Provider extends ApplicationWithFieldsProviderBase {

    getUIComponentType(): any {
        return D1UI;
    }

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,
                label: ApplicationFormTypes[ApplicationFormTypes.D1]
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_GL_COMPANY_NAME_RETENTION_L"),
                anchor: "companyRetention"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"),
                anchor: "documents"
            }
        ];
    }

    getApplicationManager(): IApplicationFormManager {
        return new D1FormManager();
    }

    getValidator(): D1Validator {
        return new D1Validator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.D1;
    }
}