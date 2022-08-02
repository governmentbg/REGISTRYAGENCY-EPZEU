import { DataServiceProvider, Nomenclatures } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationItem, DomainModelHepler, Form, FormState, IApplicationFormManager, IApplicationFormValidationContext, IApplicationProvider } from 'EPZEU.CR.Domain';
import { RequestForCertificateBase } from '../Models/RequestForCertificateBase';
import { ActualDateBaseValidator, DefineDatePeriodBaseValidator, EmailForReceivingBaseValidator, FieldIdentsBaseValidator, RequestForCertificateValidator } from '../Models/Validators/RequestForCertificateValidator';
import { moduleContext } from '../ModuleContext';
import { RequestForCertificateStartUI } from '../UI/RequestForCertificateStartUI';
import { RequestForCertificateUI } from '../UI/RequestForCertificateUI';
import { RequestForCertificateFormManager } from './RequestForCertificateFormManager';

export class RequestForCertificateProvider implements IApplicationProvider {

    private _appType: ApplicationFormTypes = null;

    constructor(appType: ApplicationFormTypes) {

        this._appType = appType;
    }

    getStartUIComponentType(): any {
        return RequestForCertificateStartUI;
    }

    getUIComponentType(): any {
        return RequestForCertificateUI;
    }

    public getApplicationForms(appItem: ApplicationItem, dataServiceProvider: DataServiceProvider): Form[] {
        let validationContext: IApplicationFormValidationContext = {
            appType: appItem.applicationManager.application.appType,
            isRecordNew: DomainModelHepler.isRecordNew,
            isRecordEmpty: DomainModelHepler.isRecordEmpty,
            isRecordDirty: DomainModelHepler.isRecordDirty,
            processStates: appItem.applicationManager.processState,
            applicationManager: appItem.applicationManager,
            dataServiceProvider: dataServiceProvider,
            ekatteAreas: null,
            foreignCommercialRegisters: null
        };

        Nomenclatures.getEkatteAreas().then(areas => validationContext.ekatteAreas = areas);

        let forms: Form[] = [];

        switch (this._appType) {
            case ApplicationFormTypes.ActualStateCertificate:
                forms.push(this.generateForm(appItem, validationContext, "CR_GL_ACT_TO_DATE_L", "1", ["dateTo"], new ActualDateBaseValidator()));
                forms.push(this.generateForm(appItem, validationContext, "CR_APP_EMAIL_ADDRESSES_OBTAIN_CERTIFICATE_L", "2", ["email"], new EmailForReceivingBaseValidator()));
                break;
            case ApplicationFormTypes.EntryByPeriodCertificate:
            case ApplicationFormTypes.PublicationByPeriodCertificate:
                forms.push(this.generateForm(appItem, validationContext, "GL_PERIOD_L", "1", ["dateTo", "dateFrom"], new DefineDatePeriodBaseValidator()));
                forms.push(this.generateForm(appItem, validationContext, "CR_APP_EMAIL_ADDRESSES_OBTAIN_CERTIFICATE_L", "2", ["email"], new EmailForReceivingBaseValidator()));
                break;
            case ApplicationFormTypes.EnteredCircumstancesCertificate:
                forms.push(this.generateForm(appItem, validationContext, "CR_GL_ACT_TO_DATE_L", "1", ["dateTo"], new ActualDateBaseValidator()));
                forms.push(this.generateForm(appItem, validationContext, "CR_GL_SECTION_GROUP_FIELD_L", "2", ["fieldIdents"], new FieldIdentsBaseValidator()));
                forms.push(this.generateForm(appItem, validationContext, "CR_APP_EMAIL_ADDRESSES_OBTAIN_CERTIFICATE_L", "3", ["email"], new EmailForReceivingBaseValidator()));
                break;
            case ApplicationFormTypes.MissingActsCertificate:
                forms.push(this.generateForm(appItem, validationContext, "CR_GL_ACT_TO_DATE_L", "1", ["dateTo"], new ActualDateBaseValidator()));
                forms.push(this.generateForm(appItem, validationContext, "CR_GL_SECTION_GROUP_FIELD_L", "2", ["fieldIdents"], new FieldIdentsBaseValidator(null, null, false)));
                forms.push(this.generateForm(appItem, validationContext, "CR_APP_EMAIL_ADDRESSES_OBTAIN_CERTIFICATE_L", "3", ["email"], new EmailForReceivingBaseValidator()));
                break;
            case ApplicationFormTypes.ActOrCopyOfActCertificate:
                forms.push(this.generateForm(appItem, validationContext, "GL_ACT_KIND_L", "1", ["fieldIdents"], new FieldIdentsBaseValidator("CR_APP_SELECT_ACT_E", "GL_CR_NO_ANNOUNCEMENT_ACT_L")));
                forms.push(this.generateForm(appItem, validationContext, "CR_APP_EMAIL_ADDRESSES_OBTAIN_CERTIFICATE_L", "2", ["email"], new EmailForReceivingBaseValidator()));
                break;
        }

        return forms;
    }

    public getHasGRPRAgreement(): boolean { return false; }

    getApplicationManager(): IApplicationFormManager {
        return new RequestForCertificateFormManager();
    }

    getValidator(): RequestForCertificateValidator {
        return new RequestForCertificateValidator();
    }

    get applicationType(): ApplicationFormTypes {
        return this._appType;
    }

    //#region private helpers 

    private generateForm(appItem: ApplicationItem, validationContext: IApplicationFormValidationContext, labelKey: string, order: string, errorPropNames: string[], validatorInstance: any): Form {

        var form: Form = {
            form: (<RequestForCertificateBase>(appItem.applicationManager.application)),
            formManager: appItem.applicationManager,
            formMenuNavItems: [{
                isApplicationTitle: false,
                label: moduleContext.resourceManager.getResourceByKey(labelKey),
            }],
            formUICmp: RequestForCertificateUI,
            formValidator: validatorInstance,
            state: FormState.New,
            order: order,
            isMain: order === "1",
            canEdit: true,
            canDelete: false,
            errorPropNames: errorPropNames
        }

        form.formValidator.setValidationContext(validationContext)

        return form
    }

    //#endregion
}
