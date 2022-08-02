import { DataServiceProvider, Nomenclatures } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationItem, ApplicationWithFieldsProviderBase, IApplicationFormManager, IApplicationFormValidationContext, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { V24Validator } from '../Models/ApplicationForms/Validators/V24Validator';
import { V24UI } from '../UI/Applications/V24UI';
import { V24FormManager } from './V24FormManager';

export class V24Provider extends ApplicationWithFieldsProviderBase {
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
        return V24UI;
    }

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,
                label: ApplicationFormTypes[ApplicationFormTypes.V24]
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
        return new V24FormManager();
    }

    getValidator(): V24Validator {
        return new V24Validator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.V24;
    }
}