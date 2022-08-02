import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationWithFieldsProviderBase, IApplicationFormManager, MenuNavItem, ApplicationItem, IApplicationFormValidationContext } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { V23Validator } from '../Models/ApplicationForms/Validators/V23Validator';
import { V23UI } from '../UI/Applications/V23UI';
import { V23FormManager } from './V23FormManager';
import { DataServiceProvider, Nomenclatures } from 'EPZEU.Core';

export class V23Provider extends ApplicationWithFieldsProviderBase {

    protected getValidationContext(appItem: ApplicationItem, dataServiceProvider: DataServiceProvider): IApplicationFormValidationContext {
        let valContext = super.getValidationContext(appItem, dataServiceProvider);

        Nomenclatures.getForeignComRegistersCache().then(cr => valContext.foreignCommercialRegisters = cr);
        Nomenclatures.getForeignLegalForms().then(lf => valContext.legalForms = lf);

        return valContext;
    }

    getStartUIComponentType(): any {
        return null;
    }

    getUIComponentType(): any {
        return V23UI;
    }

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,
                label: ApplicationFormTypes[ApplicationFormTypes.V23]
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_GL_TRANSFORMATION_L"),
                anchor: "transformation"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"),
                anchor: "documents"
            }
        ];
    }

    getApplicationManager(): IApplicationFormManager {
        return new V23FormManager();
    }

    getValidator(): V23Validator {
        return new V23Validator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.V23;
    }
}