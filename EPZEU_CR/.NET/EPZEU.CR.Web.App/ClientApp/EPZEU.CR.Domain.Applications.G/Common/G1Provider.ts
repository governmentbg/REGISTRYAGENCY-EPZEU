import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationWithFieldsProviderBase, IApplicationFormManager, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { G1Validator } from '../Models/ApplicationForms/Validators/G1Validator';
import { G1UI } from '../UI/Applicaitons/G1UI';
import { G1FormManager } from './G1FormManager';

export class G1Provider extends ApplicationWithFieldsProviderBase {

    //#region IApplicationProvider

    getUIComponentType(): any {
        return G1UI;
    }

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {

        var menu = null;

        if (appManager.isMainApplication) {
            menu = [
                { isApplicationTitle: true, label: ApplicationFormTypes[ApplicationFormTypes.G1] },
                { isApplicationTitle: false, label: moduleContext.resourceManager.getResourceByKey("CR_GL_PUBLICATION_ACTS_L"), anchor: "publicationActs" },
                { isApplicationTitle: false, label: moduleContext.resourceManager.getResourceByKey("CR_GL_TRANSFORMING_COMPANIES_L"), anchor: "transformingCompanies" },
                { isApplicationTitle: false, label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"), anchor: "documents" }
            ];
        } else {
            menu = [
                { isApplicationTitle: true, label: ApplicationFormTypes[ApplicationFormTypes.G1] },
                { isApplicationTitle: false, label: moduleContext.resourceManager.getResourceByKey("CR_GL_PUBLICATION_ACTS_L"), anchor: "publicationActs" },
                { isApplicationTitle: false, label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"), anchor: "documents" }
            ];
        }

        return menu;
    }

    getApplicationManager(): IApplicationFormManager {
        return new G1FormManager();
    }

    getValidator(): G1Validator {
        return new G1Validator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.G1
    }

    //#endregion
}