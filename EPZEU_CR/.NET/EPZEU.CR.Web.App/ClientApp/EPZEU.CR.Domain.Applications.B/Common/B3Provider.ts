import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationWithFieldsProviderBase, IApplicationFormManager, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { B3Validator } from '../Models/ApplicationForms/Validators/B3Validator';
import { B3UI } from '../UI/Applicaitons/B3UI';
import { B3FormManager } from './B3FormManager';

export class B3Provider extends ApplicationWithFieldsProviderBase {

    getUIComponentType(): any {
        return B3UI;
    }

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,
                label: ApplicationFormTypes[ApplicationFormTypes.B3]
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_PLEDGER_L"),
                anchor: "pledger"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_DEBTOR_SEC_CLAIM_L"),
                anchor: "debtorSecClaim"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_PLEDGEE_L"),
                anchor: "pledgee"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_SECURED_CLAIM_L"),
                anchor: "securedClaim"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_AMOUNT_BET_SET_L"),
                anchor: "amountBetSet"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_PLEDGE_POSSESSION_L"),
                anchor: "pledgePossession"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_MODALITIES_L"),
                anchor: "modalities"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_GL_CONSENT_PLEDGE_CREDITOR_L"),
                anchor: "consent_pledge_creditor"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_TAKE_BET_L"),
                anchor: "takeBet"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_ARREST_AMOUNT_L"),
                anchor: "arrestAmount"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_ABANDONMENT_EXECUTION_L"),
                anchor: "abandonmentExecution"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_GL_ENTRY_PLEDGE_CREDITOR_RIGHTS_L"),
                anchor: "entry_pledge_creditor_rights"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_RENEWAL_ENTRY_BET_L"),
                anchor: "renewalEntryBet"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_DELETE_PLEDGE_L"),
                anchor: "deletePledge"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"),
                anchor: "documents"
            }
        ];
    }

    getApplicationManager(): IApplicationFormManager {
        return new B3FormManager();
    }

    getValidator(): B3Validator {
        return new B3Validator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.B3;
    }
}