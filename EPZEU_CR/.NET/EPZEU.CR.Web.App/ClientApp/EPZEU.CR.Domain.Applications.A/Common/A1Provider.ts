import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationWithFieldsProviderBase, IApplicationFormManager, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { A1Validator } from '../Models/ApplicationForms/Validators/A1Validator';
import { A1UI } from '../UI/Applicaitons/A1UI';
import { A1FormManager } from './A1FormManager';

export class A1Provider extends ApplicationWithFieldsProviderBase {

    //#region IApplicationProvider

    getUIComponentType(): any {
        return A1UI;
    } 

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,                
                label: ApplicationFormTypes[ApplicationFormTypes.A1]
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_GL_MAIN_CIRCUMSTANCES_L"),
                anchor: "mainCircumstances"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"),
                anchor: "documents"
            }
        ];
    }
        
    getApplicationManager(): IApplicationFormManager {
        return new A1FormManager();
    }

    getValidator(): A1Validator {
        return new A1Validator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.A1
    }

    //#endregion
}
