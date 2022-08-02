﻿import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { IApplicationFormManager, MenuNavItem, ApplicationProviderBase, ApplicationItem, Form, EntityIdentificationUI, UICValidator, FormState, entityIdentificationOrderNumber, ApplicantInfoUI, ApplicantInfoValidator, applicantInfoOrderNumber, ApplicantExchangeUI, ApplicantExchangeValidator, applicantExchangeOrderNumber } from 'EPZEU.CR.Domain';
import { moduleContext } from '../';
import { J1Validator } from '../Models/ApplicationForms/Validators/J1Validator';
import { J1UI } from '../UI/Applications/J1UI';
import { J1FormManager } from './J1FormManager';
import { ApplicationJ1StartUI } from '../UI/Applications/J1StartUI';
import { DataServiceProvider } from 'EPZEU.Core';
import { J1 } from '../Models/ModelsAutoGenerated';

export class J1Provider extends ApplicationProviderBase {

    getStartUIComponentType(): any {
        return ApplicationJ1StartUI;
    }

    getUIComponentType(): any {
        return J1UI;
    }

    getMenuNavItems(appManager: IApplicationFormManager): MenuNavItem[] {
        return [
            {
                isApplicationTitle: true,
                label: ApplicationFormTypes[ApplicationFormTypes.J1]
            },
            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("GL_APPLICATION_L"),
                anchor: "application"
            },

            {
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("GL_APPLIEDS_L"),
                anchor: "documents"
            }
        ];
    }

    public getApplicationForms(appItem: ApplicationItem, dataServiceProvider: DataServiceProvider): Form[] {
        var forms = super.getApplicationForms(appItem, dataServiceProvider);

        if (appItem.applicationManager.additionalData && appItem.applicationManager.additionalData.uic) {

            var entityIdentification: Form = {
                form: (<J1>appItem.applicationManager.application).uic,
                formManager: appItem.applicationManager,
                formMenuNavItems: [{
                    isApplicationTitle: false,
                    label: moduleContext.resourceManager.getResourceByKey("GL_IDENTIFICATION_L"),
                }],
                formUICmp: EntityIdentificationUI,
                formValidator: new UICValidator(),
                state: FormState.New,
                order: entityIdentificationOrderNumber,
                isMain: false,
                canEdit: false,
                canDelete: false
            }

            entityIdentification.formValidator.setValidationContext(this.getValidationContext(appItem, dataServiceProvider));

            forms.push(entityIdentification);
        }

        var applicantInfo: Form = {
            form: appItem.applicationManager.application.applicantInfo,
            formManager: appItem.applicationManager,
            formMenuNavItems: [{
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("GL_APPLICANT_DATA_L"),
            }],
            formUICmp: ApplicantInfoUI,
            formValidator: new ApplicantInfoValidator(),
            state: FormState.New,
            order: applicantInfoOrderNumber,
            isMain: false,
            canEdit: true,
            canDelete: false
        }

        applicantInfo.formValidator.setValidationContext(this.getValidationContext(appItem, dataServiceProvider));

        forms.push(applicantInfo);

        var applicantExchange: Form = {
            form: appItem.applicationManager.application.applicantExchange,
            formManager: appItem.applicationManager,
            formMenuNavItems: [{
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey("CR_APP_00001_SHORT_L"),
            }],
            formUICmp: ApplicantExchangeUI,
            formValidator: new ApplicantExchangeValidator(),
            state: FormState.New,
            order: applicantExchangeOrderNumber,
            isMain: false,
            canEdit: true,
            canDelete: false
        }

        applicantExchange.formValidator.setValidationContext(this.getValidationContext(appItem, dataServiceProvider));

        forms.push(applicantExchange);

        return forms;
    }

    getApplicationManager(): IApplicationFormManager {
        return new J1FormManager();
    }

    getValidator(): J1Validator {
        return new J1Validator();
    }

    get applicationType(): ApplicationFormTypes {
        return ApplicationFormTypes.J1;
    }
}