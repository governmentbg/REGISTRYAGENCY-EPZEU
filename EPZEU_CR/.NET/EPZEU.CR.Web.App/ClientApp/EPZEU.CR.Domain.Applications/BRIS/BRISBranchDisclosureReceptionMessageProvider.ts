import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationWithFieldsProviderBase, IApplicationFormManager, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { BRISBranchDisclosureReceptionMessageValidator } from '../Models/ApplicationForms/Validators/BRISValidators';
import { BRISBranchDisclosureReceptionMessageUI } from '../UI/Applications/BRIS/BRISBranchDisclosureReceptionMessageUI';
import { BRISBranchDisclosureReceptionMessageProviderFormManager } from './BRISBranchDisclosureReceptionMessageFormManager';

export class BRISBranchDisclosureReceptionMessageProvider extends ApplicationWithFieldsProviderBase {

    getUIComponentType(): any {
        return BRISBranchDisclosureReceptionMessageUI;
    }

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,
                label: ApplicationFormTypes[ApplicationFormTypes.BRISBranchDisclosureReceptionMessage]
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"),
                anchor: "documents"
            }
        ];
    }

    getApplicationManager(): IApplicationFormManager {
        return new BRISBranchDisclosureReceptionMessageProviderFormManager();
    }

    getValidator(): BRISBranchDisclosureReceptionMessageValidator {
        return new BRISBranchDisclosureReceptionMessageValidator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.BRISBranchDisclosureReceptionMessage;
    }

    public getHasGRPRAgreement(): boolean { return false; }

    protected getHasApplicantInfo(): boolean { return false; }

    protected getHasApplicantExchange(): boolean { return false; }
}