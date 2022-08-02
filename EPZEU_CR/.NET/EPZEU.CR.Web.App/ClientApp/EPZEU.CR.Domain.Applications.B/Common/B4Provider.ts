import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationWithFieldsProviderBase, IApplicationFormManager, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { B4Validator } from '../Models/ApplicationForms/Validators/B4Validator';
import { B4UI } from '../UI/Applicaitons/B4UI';
import { B4FormManager } from './B4FormManager';

export class B4Provider extends ApplicationWithFieldsProviderBase {

    getUIComponentType(): any {
        return B4UI;
    }

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,
                label: ApplicationFormTypes[ApplicationFormTypes.B4]
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_DEBTOR_SEC_CLAIM_L"),
                anchor: "com_ent_mortgage_1_1"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_PLEDGEE_L"),
                anchor: "com_ent_mortgage_1_2"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_SECURED_CLAIM_L"),
                anchor: "com_ent_mortgage_2_1"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_AMOUNT_BET_SET_L"),
                anchor: "com_ent_mortgage_2_2"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_PLEDGE_POSSESSION_L"),
                anchor: "com_ent_mortgage_2_3"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_MODALITIES_L"),
                anchor: "com_ent_mortgage_2_4"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_GL_CONSENT_PLEDGE_CREDITOR_L"),
                anchor: "com_ent_consent_pledge_creditor_2_5"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_TAKE_BET_L"),
                anchor: "com_ent_mortgage_3_1"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_ARREST_AMOUNT_REMAIN_DISTRIBUTION_L"),
                anchor: "com_ent_mortgage_4_1"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_ABANDONMENT_EXECUTION_L"),
                anchor: "com_ent_mortgage_4_2"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_GL_ENTRY_PLEDGE_CREDITOR_RIGHTS_L"),
                anchor: "com_ent_pledge_creditor_rights"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_DELETE_PLEDGE_L"),
                anchor: "com_ent_mortgage_4_3"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_RENEWAL_ENTRY_BET_L"),
                anchor: "com_ent_mortgage_4_4"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"),
                anchor: "documents"
            }
        ];
    }

    getApplicationManager(): IApplicationFormManager {
        return new B4FormManager();
    }

    getValidator(): B4Validator {
        return new B4Validator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.B4;
    }
}