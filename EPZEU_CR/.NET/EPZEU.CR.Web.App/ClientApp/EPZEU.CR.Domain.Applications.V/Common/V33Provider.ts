import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationWithFieldsProviderBase, IApplicationFormManager, MenuNavItem, ApplicationItem, IApplicationFormValidationContext } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { V33Validator } from '../Models/ApplicationForms/Validators/V33Validator';
import { V33UI } from '../UI/Applications/V33UI';
import { V33FormManager } from './V33FormManager';
import { DataServiceProvider, Nomenclatures } from 'EPZEU.Core';

export class V33Provider extends ApplicationWithFieldsProviderBase {

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
        return V33UI;
    }

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,
                label: ApplicationFormTypes[ApplicationFormTypes.V33]
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_GL_REALIGNMENT_L"),
                anchor: "realignment"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"),
                anchor: "documents"
            }
        ];
    }

    getApplicationManager(): IApplicationFormManager {
        return new V33FormManager();
    }

    getValidator(): V33Validator {
        return new V33Validator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.V33;
    }
}