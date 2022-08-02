import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationWithFieldsProviderBase, IApplicationFormManager, MenuNavItem } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { B7 } from '../Models/ApplicationForms/ApplicationFormsB';
import { B7Validator } from '../Models/ApplicationForms/Validators/B7Validator';
import { B7UI } from '../UI/Applicaitons/B7UI';
import { B7FormManager } from './B7FormManager';

export class B7Provider extends ApplicationWithFieldsProviderBase {

    getUIComponentType(): any {
        return B7UI;
    }

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        var res = [
            {
                isApplicationTitle: true,
                label: ApplicationFormTypes[ApplicationFormTypes.B7]
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_GL_MAIN_CIRCUMSTANCES_L"),
                anchor: "mainCircumstances"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_GL_DIRECT_COMPANY_CONTROL_L"),
                anchor: "offshoreDirectControl"
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_GL_NO_DIRECT_COMPANY_CONTROL_L"),
                anchor: "offshoreNoDirectControl"
            }];

        if ((<B7>appManager.application).fields.reasonForEntry529 && (<B7>appManager.application).fields.reasonForEntry529.article6 == true) {
            res.push({
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_GL_CIRCUMSTANCES_PART4_L"),
                anchor: "circumstances4"
            });
        }
        res.push(
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_GL_ACTUAL_PERSON_OWNERS_L"),
                anchor: "actualOwners"
            });

        res.push(
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"),
                anchor: "documents"
            });

        return res;
    }

    getApplicationManager(): IApplicationFormManager {
        return new B7FormManager();
    }

    getValidator(): B7Validator {
        return new B7Validator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.B7;
    }
}