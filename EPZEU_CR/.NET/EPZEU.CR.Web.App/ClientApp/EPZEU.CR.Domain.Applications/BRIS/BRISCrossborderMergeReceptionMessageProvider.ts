import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationWithFieldsProviderBase, IApplicationFormManager, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { BRISCrossborderMergeReceptionMessageValidator } from '../Models/ApplicationForms/Validators/BRISValidators';
import { BRISCrossborderMergeReceptionMessageUI } from '../UI/Applications/BRIS/BRISCrossborderMergeReceptionMessageUI';
import { BRISCrossborderMergeReceptionMessageFormManager } from './BRISCrossborderMergeReceptionMessageFormManager';

export class BRISCrossborderMergeReceptionMessageProvider extends ApplicationWithFieldsProviderBase {

    getUIComponentType(): any {
        return BRISCrossborderMergeReceptionMessageUI;
    }

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,
                label: ApplicationFormTypes[ApplicationFormTypes.BRISCrossborderMergeReceptionMessage]
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"),
                anchor: "documents"
            }
        ];
    }

    getApplicationManager(): IApplicationFormManager {
        return new BRISCrossborderMergeReceptionMessageFormManager();
    }

    getValidator(): BRISCrossborderMergeReceptionMessageValidator {
        return new BRISCrossborderMergeReceptionMessageValidator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.BRISCrossborderMergeReceptionMessage;
    }

    public getHasGRPRAgreement(): boolean { return false; }

    protected getHasApplicantInfo(): boolean { return false; }

    protected getHasApplicantExchange(): boolean { return false; }
}