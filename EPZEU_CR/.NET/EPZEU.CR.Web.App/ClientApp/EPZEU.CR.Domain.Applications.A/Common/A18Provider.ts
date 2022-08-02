import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationWithFieldsProviderBase, IApplicationFormManager, MenuNavItem, ApplicationItem, IApplicationFormValidationContext } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { A18Validator } from '../Models/ApplicationForms/Validators/A18Validator';
import { A18UI } from '../UI/Applicaitons/A18UI';
import { A18FormManager } from './A18FormManager';
import { DataServiceProvider, Nomenclatures } from 'EPZEU.Core';

export class A18Provider extends ApplicationWithFieldsProviderBase {

    //#region IApplicationProvider

    getUIComponentType(): any {
        return A18UI;
    }

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,
                label: ApplicationFormTypes[ApplicationFormTypes.A18]
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
        return new A18FormManager();
    }

    getValidator(): A18Validator {
        return new A18Validator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.A18
    }

    //#endregion
}
