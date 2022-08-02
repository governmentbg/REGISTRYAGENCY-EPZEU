import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationWithFieldsProviderBase, IApplicationFormManager, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { G2Validator } from '../Models/ApplicationForms/Validators/G2Validator';
import { G2UI } from '../UI/Applicaitons/G2UI';
import { G2FormManager } from './G2FormManager';

export class G2Provider extends ApplicationWithFieldsProviderBase {

    //#region IApplicationProvider

    getUIComponentType(): any {
        return G2UI;
    } 

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,                
                label: ApplicationFormTypes[ApplicationFormTypes.G2]
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_GL_PUBLICATION_ACTS_L"),
                anchor: "publicationActs"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"),
                anchor: "documents"
            }
        ];
    }
        
    getApplicationManager(): IApplicationFormManager {
        return new G2FormManager();
    }

    getValidator(): G2Validator {
        return new G2Validator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.G2
    }

    //#endregion
}
