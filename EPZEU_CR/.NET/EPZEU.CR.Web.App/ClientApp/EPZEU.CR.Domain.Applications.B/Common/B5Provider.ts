import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationWithFieldsProviderBase, IApplicationFormManager, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { B5Validator } from '../Models/ApplicationForms/Validators/B5Validator';
import { B5UI } from '../UI/Applicaitons/B5UI';
import { B5FormManager } from './B5FormManager';

export class B5Provider extends ApplicationWithFieldsProviderBase {

    getUIComponentType(): any {
        return B5UI;
    }

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,
                label: ApplicationFormTypes[ApplicationFormTypes.B5]
            },       
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_PERSON_FAFOR_SHARE_L"),
                anchor: "personfaforshare"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_SECURED_CLAIM_L"),
                anchor: "securedclaim"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_AMOUNT_ARREST_L"),
                anchor: "amountarrest"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_ARREST_HAVINGS_L"),
                anchor: "arresthavings"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_ABANDONMENT_EXECUTION_L"),
                anchor: "abandonmentexecution"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"),
                anchor: "documents"
            } 
        ];
    }

    getApplicationManager(): IApplicationFormManager {
        return new B5FormManager();
    }

    getValidator(): B5Validator {
        return new B5Validator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.B5;
    }
}