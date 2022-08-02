import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationWithFieldsProviderBase, IApplicationFormManager, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { G3Validator } from '../Models/ApplicationForms/Validators/G3Validator';
import { G3UI } from '../UI/Applicaitons/G3UI';
import { G3FormManager } from './G3FormManager';

export class G3Provider extends ApplicationWithFieldsProviderBase {

    //#region IApplicationProvider

    getUIComponentType(): any {
        return G3UI;
    } 

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,                
                label: ApplicationFormTypes[ApplicationFormTypes.G3]
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
        return new G3FormManager();
    }

    getValidator(): G3Validator {
        return new G3Validator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.G3
    }

    //#endregion
}
