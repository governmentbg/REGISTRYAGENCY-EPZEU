import { ArrayHelper, BaseDataModel, ErrorInfo } from 'Cnsys.Core';
import { BaseProps } from 'Cnsys.UI.React';
import { DataServiceProvider, EPZEUBaseValidator, Nomenclatures, appConfig } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicantExchange, ApplicantExchangeUI, ApplicantExchangeValidator, ApplicantInfoUI, ApplicantInfoValidator, ApplicationFormBase, ApplicationFormBaseValidator, ApplicationFormTypesHelper, ApplicationItem, DomainModelHepler, EntityIdentificationUI, GDPRAgreementUI, IApplicationFormManager, IApplicationFormValidationContext, isApplicationWithFieldsFormManager, moduleContext, ProcessStates, UICValidator } from '../';
import { NRA100VatLawUI } from '../UI/Applications/NRA100VatLaw';
import { ApplicationWithFieldsStartUI } from '../UI/ApplicationWithFieldsStart/StartUI';
import { GDPRAgreementValidator } from '../Models/Validators/GDPRAgreementValidator';

export const entityIdentificationOrderNumber = '-2';
export const applicantInfoOrderNumber = '-1';
export const nra100VatLawOrderNumber = '1000';
export const applicantExchangeOrderNumber = '1001';
export const gDPRAgreementOrderNumber = '1002';

export interface MenuNavItem {
    isApplicationTitle: boolean;
    label: string;
    description?: string;
    anchor?: string;
    isCurrent?: boolean;
}

export enum FormState {
    New,
    WithError,
    Completed
}

export interface Form {
    order: string;
    formUICmp: any;
    formMenuNavItems: MenuNavItem[];
    form: BaseDataModel;
    formValidator: EPZEUBaseValidator<BaseDataModel, IApplicationFormValidationContext>;
    formManager: IApplicationFormManager;
    state: FormState;
    isMain: boolean;
    canEdit: boolean;
    canDelete: boolean;
    errors?: ErrorInfo[];
    errorPropNames?: string[];
}

export interface IApplicationProvider {
    getStartUIComponentType(): any;
    getUIComponentType(): any;
    getApplicationManager(): IApplicationFormManager;
    applicationType: ApplicationFormTypes;
    getApplicationForms(appItem: ApplicationItem, dataServiceProvider: DataServiceProvider, isPreview?: boolean): Form[];
}

export interface StartUIProps extends BaseProps {
    createApplicationProcess: (request: { applicationType: ApplicationFormTypes, additionalData: any }) => Promise<void>;
    errorMessages: any;
    applicationType: ApplicationFormTypes;
    returnToInitialPage: () => void;
}

export abstract class ApplicationProviderBase implements IApplicationProvider {

    protected getValidationContext(appItem: ApplicationItem, dataServiceProvider: DataServiceProvider): IApplicationFormValidationContext {
        let valContext: IApplicationFormValidationContext = {
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

        Nomenclatures.getEkatteAreas().then(areas => {
            valContext.ekatteAreas = areas
        });

        return valContext;
    }

    public getApplicationForms(appItem: ApplicationItem, dataServiceProvider: DataServiceProvider, isPreview?: boolean): Form[] {
        var forms: Form[] = [];

        var applicationForm: Form = {
            form: appItem.applicationManager.application,
            formManager: appItem.applicationManager,
            formMenuNavItems: this.getMenuNavItems(appItem.applicationManager),
            formUICmp: this.getUIComponentType(),
            formValidator: this.getValidator(),
            state: FormState.New,
            order: appItem.order.toString(),
            isMain: appItem.isMainAppl,
            canEdit: true,
            canDelete: appItem.order > 1 && !appItem.isMainAppl
        }

        applicationForm.formValidator.setValidationContext(this.getValidationContext(appItem, dataServiceProvider));

        forms.push(applicationForm);

        if (appItem.isMainAppl && this.getHasGRPRAgreement()) {
            var gDPRAgreement: Form = {
                form: appItem.applicationManager.application.gdprAgreement,
                formManager: appItem.applicationManager,
                formMenuNavItems: [{
                    isApplicationTitle: false,
                    label: moduleContext.resourceManager.getResourceByKey("GL_INFORMED_AGREEMENT_L"),
                }],
                formUICmp: GDPRAgreementUI,
                formValidator: new GDPRAgreementValidator(),
                state: FormState.New,
                order: gDPRAgreementOrderNumber,
                isMain: false,
                canEdit: true,
                canDelete: false
            }

            gDPRAgreement.formValidator.setValidationContext(this.getValidationContext(appItem, dataServiceProvider));

            forms.push(gDPRAgreement);
        }

        return forms;
    }

    public getHasGRPRAgreement(): boolean { return true; }
    protected getHasApplicantInfo(): boolean { return true; }
    protected getHasApplicantExchange(): boolean { return true; }

    public abstract getStartUIComponentType(): any;
    public abstract getUIComponentType(): any;
    public abstract getMenuNavItems(application: IApplicationFormManager): MenuNavItem[];
    public abstract getApplicationManager(): IApplicationFormManager;
    public abstract getValidator(): ApplicationFormBaseValidator<ApplicationFormBase>;
    public abstract applicationType: ApplicationFormTypes;
}

export abstract class ApplicationWithFieldsProviderBase extends ApplicationProviderBase {

    public getStartUIComponentType(): any {
        return ApplicationWithFieldsStartUI;
    }

    public getApplicationForms(appItem: ApplicationItem, dataServiceProvider: DataServiceProvider, isPreview?: boolean): Form[] {
        var forms = super.getApplicationForms(appItem, dataServiceProvider);

        if (appItem.isMainAppl) {
            //Секцията идентификация се показва само ако заявлението за Промяна или Пререгистрация и не е D1
            if ((isApplicationWithFieldsFormManager(appItem.applicationManager) && (!isPreview || (isPreview && appItem.applicationManager.application.fields.uic)))
                && (ApplicationFormTypesHelper.hasEntityIdentification(appItem.applicationManager.application.appType)
                    || (appItem.applicationManager.processState == ProcessStates.ForChange || appItem.applicationManager.processState == ProcessStates.Preregistration))
                && appItem.applicationManager.application.appType != ApplicationFormTypes.D1) {

                var entityIdentification: Form = {
                    form: appItem.applicationManager.application.fields.uic,
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

            if (this.getHasApplicantInfo()) {
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
            }

            if (ApplicationFormTypesHelper.isTypeA(appItem.applicationManager.application.appType) &&
                appItem.applicationManager.processState == ProcessStates.New) {

                var nra100VatLaw: Form = {
                    form: appItem.applicationManager.application.applicantExchange,
                    formManager: appItem.applicationManager,
                    formMenuNavItems: [{
                        isApplicationTitle: false,
                        label: moduleContext.resourceManager.getResourceByKey("CR_APP_00079_L"),
                    }],
                    formUICmp: NRA100VatLawUI,
                    formValidator: new EPZEUBaseValidator<ApplicantExchange, IApplicationFormValidationContext>(),
                    state: FormState.New,
                    order: nra100VatLawOrderNumber,
                    isMain: false,
                    canEdit: true,
                    canDelete: false
                }

                nra100VatLaw.formValidator.setValidationContext(this.getValidationContext(appItem, dataServiceProvider));

                forms.push(nra100VatLaw);
            }

            if (this.getHasApplicantExchange()) {
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
            }
        }

        return forms;
    }
}