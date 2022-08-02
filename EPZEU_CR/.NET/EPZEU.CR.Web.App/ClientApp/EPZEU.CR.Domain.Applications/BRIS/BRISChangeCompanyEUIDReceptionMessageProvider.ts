import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationWithFieldsProviderBase, IApplicationFormManager, MenuNavItem } from 'EPZEU.CR.Domain';
import { BRISChangeCompanyEUIDReceptionMessageValidator } from '../Models/ApplicationForms/Validators/BRISValidators';
import { BRISChangeCompanyEUIDReceptionMessageUI } from '../UI/Applications/BRIS/BRISChangeCompanyEUIDReceptionMessageUI';
import { moduleContext } from '../';
import { BRISChangeCompanyEUIDReceptionMessageFormManager } from './BRISChangeCompanyEUIDReceptionMessageFormManager';

export class BRISChangeCompanyEUIDReceptionMessageProvider extends ApplicationWithFieldsProviderBase {

    getUIComponentType(): any {
        return BRISChangeCompanyEUIDReceptionMessageUI;
    }

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,
                label: ApplicationFormTypes[ApplicationFormTypes.BRISChangeCompanyEUIDReceptionMessage]
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"),
                anchor: "documents"
            }
        ];
    }

    getApplicationManager(): IApplicationFormManager {
        return new BRISChangeCompanyEUIDReceptionMessageFormManager();
    }

    getValidator(): BRISChangeCompanyEUIDReceptionMessageValidator {
        return new BRISChangeCompanyEUIDReceptionMessageValidator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.BRISChangeCompanyEUIDReceptionMessage;
    }

    public getHasGRPRAgreement(): boolean { return false; }

    protected getHasApplicantInfo(): boolean { return false; }

    protected getHasApplicantExchange(): boolean { return false; }
}