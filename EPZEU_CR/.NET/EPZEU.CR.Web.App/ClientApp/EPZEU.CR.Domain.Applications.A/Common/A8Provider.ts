import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationWithFieldsProviderBase, IApplicationFormManager, MenuNavItem, ApplicationItem, IApplicationFormValidationContext } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { A8Validator } from '../Models/ApplicationForms/Validators/A8Validator';
import { A8UI } from '../UI/Applicaitons/A8UI';
import { A8FormManager } from './A8FormManager';
import { DataServiceProvider, Nomenclatures } from 'EPZEU.Core';

export class A8Provider extends ApplicationWithFieldsProviderBase {

    getUIComponentType(): any {
        return A8UI;
    }

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,
                label: ApplicationFormTypes[ApplicationFormTypes.A8]
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

    protected getValidationContext(appItem: ApplicationItem, dataServiceProvider: DataServiceProvider): IApplicationFormValidationContext {
        let valContext = super.getValidationContext(appItem, dataServiceProvider);

        Nomenclatures.getForeignComRegistersCache().then(cr => valContext.foreignCommercialRegisters = cr);

        return valContext;
    }

    getApplicationManager(): IApplicationFormManager {
        return new A8FormManager();
    }

    getValidator(): A8Validator {
        return new A8Validator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.A8
    }
}