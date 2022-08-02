import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationWithFieldsProviderBase, IApplicationFormManager, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { A4Validator } from '../Models/ApplicationForms/Validators/A4Validator';
import { A4UI } from '../UI/Applicaitons/A4UI';
import { A4FormManager } from './A4FormManager';

export class A4Provider extends ApplicationWithFieldsProviderBase {

    //#region IApplicationProvider

    getUIComponentType(): any {
        return A4UI;
    } 

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,                
                label: ApplicationFormTypes[ApplicationFormTypes.A4]
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_GL_MAIN_CIRCUMSTANCES_L"),
                anchor: "mainCircumstances"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_GL_FUND_L"),
                anchor: "fund"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"),
                anchor: "documents"
            }
        ];
    }
        
    getApplicationManager(): IApplicationFormManager {
        return new A4FormManager();
    }

    getValidator(): A4Validator {
        return new A4Validator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.A4
    }

    //#endregion
}
