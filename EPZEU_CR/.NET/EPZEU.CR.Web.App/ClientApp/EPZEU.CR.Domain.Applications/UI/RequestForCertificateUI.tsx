import { BindableReference, ObjectHelper } from 'Cnsys.Core';
import { BaseProps, BaseRoutePropsExt, ViewMode, withRouter } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, Period, ValidationSummary, ValidationSummaryErrorsPreviewUI, ValidationSummaryStrategy } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { ApplicationFormContextProviderProps, DeedsDataService, FieldsSelectTreeUI, SectionTitleUI, withApplicationFormContext } from 'EPZEU.CR.Domain';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as moment from 'moment';
import * as React from "react";
import { RequestForCertificate } from '../Models/RequestForCertificate';
import { RequestForCertificateBase } from '../Models/RequestForCertificateBase';

interface RequestForCertificateProps extends BaseProps, ApplicationFormContextProviderProps, BaseRoutePropsExt {
    children?: any
    formOrder?: number;
    isDisplayViewInEditMode?: boolean;
}

const valSummaryPropNameDateTo = ["dateTo"];
const valSummaryPropNameDate = ["dateTo", "dateFrom"];
const valSummaryPropNameFieldIdents = ["fieldIdents"];

export class RequestForCertificateUIImpl extends EPZEUBaseComponent<RequestForCertificateProps, RequestForCertificateBase> {
    private certificateStepTitleKey: string;
    private renderResult: any;

    constructor(props: RequestForCertificateProps) {
        super(props);

        if (this.props.applicationManager.application.appType == ApplicationFormTypes.ActOrCopyOfActCertificate && !ObjectHelper.isStringNullOrEmpty(this.model.certificate.uicNumber)) {
            new DeedsDataService().getDeedFieldIdents(this.model.certificate.uicNumber, this.model.certificate.dateTo, this.model.certificate.includeHistory).then((fieldIdents) => {
                this.model.certificate.draftFieldIdents = fieldIdents;
            })
        }
    }

    renderEdit(): JSX.Element {
        let applicationOrder = (this.props.routerExt as any).props.match.params.applicationOrder || 1;
        this.renderResult = this.WizardCertificate(applicationOrder)

        return (<>
            <SectionTitleUI titleKey={this.certificateStepTitleKey} />
            <CompanyInfoUI {...this.bind(m => m.certificate)} />
            {this.renderResult}
        </>);
    }

    renderDisplay(): JSX.Element {
        let applicationOrder = (this.props.routerExt as any).props.match.params.applicationOrder || "preview";

        this.renderResult = this.WizardCertificate(applicationOrder)

        return (<>
            {this.renderResult}
        </>);
    }

    //#region Helpers

    private WizardCertificate(step: number) {

        switch (this.props.applicationManager.application.appType) {
            case ApplicationFormTypes.ActualStateCertificate:
                return <>
                    {this.showStep(ActualDateUI, step, 1)}
                    {this.showStep(EmailForReceivingUI, step, 2)}
                </>
            case ApplicationFormTypes.EntryByPeriodCertificate:
                return <>
                    {this.showStep(DefineDatePeriodUI, step, 1)}
                    {this.showStep(EmailForReceivingUI, step, 2)}
                </>
            case ApplicationFormTypes.PublicationByPeriodCertificate:
                return <>
                    {this.showStep(DefineDatePeriodUI, step, 1)}
                    {this.showStep(EmailForReceivingUI, step, 2)}
                </>
            case ApplicationFormTypes.MissingActsCertificate:
                return <>
                    {this.showStep(ActualDateUI, step, 1)}
                    {this.showStep(CertificateCircumstancesUI, step, 2)}
                    {this.showStep(EmailForReceivingUI, step, 3)}
                </>
            case ApplicationFormTypes.EnteredCircumstancesCertificate:
                return <>
                    {this.showStep(ActualDateUI, step, 1, { hasIncludeHistoryCheckbox: true })}
                    {this.showStep(CertificateCircumstancesUI, step, 2, { excludeActs: true })}
                    {this.showStep(EmailForReceivingUI, step, 3)}
                </>
            case ApplicationFormTypes.ActOrCopyOfActCertificate:
                return <>
                    {this.showStep(SelectActUI, step, 1)}
                    {this.showStep(EmailForReceivingUI, step, 2)}
                </>
        }
    }

    private showStep(Cmp: any, currentStep: number, cmpStep: number, props?: any) {

        if (this.props.viewMode == ViewMode.Display && cmpStep == this.props.formOrder) {
            if (cmpStep == 1)
                return <><CompanyInfoUI {...this.bind(m => m.certificate)} /><Cmp {...this.bind(m => m.certificate, ViewMode.Display)} isDisplayViewInEditMode={false} /></>

            return <Cmp {...this.bind(m => m.certificate, ViewMode.Display)} isDisplayViewInEditMode={false} {...props} />

        } else {
            if (currentStep < cmpStep)
                return null;
            else if (currentStep == cmpStep) {
                if (Cmp == ActualDateUI)
                    this.certificateStepTitleKey = "CR_GL_ACT_TO_DATE_L";
                else if (Cmp == DefineDatePeriodUI)
                    this.certificateStepTitleKey = "GL_PERIOD_L";
                else if (Cmp == CertificateCircumstancesUI)
                    this.certificateStepTitleKey = "CR_GL_SECTION_GROUP_FIELD_L";
                else if (Cmp == EmailForReceivingUI)
                    this.certificateStepTitleKey = "CR_APP_EMAIL_ADDRESSES_OBTAIN_CERTIFICATE_L";
                else if (Cmp == SelectActUI)
                    this.certificateStepTitleKey = "GL_ACT_KIND_L";

                return <Cmp {...this.bind(m => m.certificate)} isDisplayViewInEditMode={true} {...props} />

            } else if (currentStep > cmpStep)
                return <Cmp {...this.bind(m => m.certificate, ViewMode.Display)} isDisplayViewInEditMode={true} {...props} />
        }

        return null;
    }

    //#endregion
}

export const RequestForCertificateUI = withApplicationFormContext(withRouter(RequestForCertificateUIImpl))

//#region RequestForCertificate Sub components

class CompanyInfoUI extends EPZEUBaseComponent<RequestForCertificateProps, RequestForCertificate> {

    render() {
        return <>
            {
                this.model.uicNumber
                    ? <div className="field-container">
                        <div className="row">
                            <div className="form-group col">
                                <label className={`field-title ${this.props.viewMode == ViewMode.Edit ? 'field-title--form' : 'field-title--preview'}`}>{this.getResource("CR_GL_COMPANY_ID_L")}</label>
                                <p className="field-text">{this.model.uicNumber}</p>
                            </div>
                        </div>
                    </div>
                    : null
            }
            {
                this.model.firmName
                    ? <div className="field-container">
                        <div className="row">
                            <div className="form-group col">
                                <label className={`field-title ${this.props.viewMode == ViewMode.Edit ? 'field-title--form' : 'field-title--preview'}`}>{this.getResource("CR_GL_COMPANY_NAME_L")}</label>
                                <p className="field-text">{this.model.firmName}</p>
                            </div>
                        </div>
                    </div>
                    : null
            }
        </>
    }
}

interface ActualDateProps extends RequestForCertificateProps {
    hasIncludeHistoryCheckbox?: boolean;
}

class ActualDateUI extends EPZEUBaseComponent<ActualDateProps, RequestForCertificate> {

    constructor(props: ActualDateProps) {
        super(props);

        this.loadFieldIdents = this.loadFieldIdents.bind(this);

        if (!moment.isMoment(this.model.dateTo))
            this.model.dateTo = moment();
    }

    renderEdit(): JSX.Element {
        return (<>
            <div className="field-container">
                <div className="row">
                    <div className="col-sm-8 col-xl-6">
                        <div className="row">
                            <div className="col">
                                {this.labelFor(m => m.dateTo, 'CR_GL_ACT_TO_DATE_L', { className: "field-title field-title--form" })}
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-sm-6">
                                {this.dateFor(x => x.dateTo, null, null, null, this.loadFieldIdents)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                this.props.hasIncludeHistoryCheckbox
                    ? <div className="field-container">
                        <div className="row">
                            <div className="form-group col-12">
                                <div className="custom-control custom-checkbox">{this.checkBoxFor(x => x.includeHistory, "CR_GL_INCLUDED_HISTORY_L", null, this.loadFieldIdents)}</div>
                            </div>
                        </div>
                    </div>
                    : null
            }
        </>);
    }

    renderDisplay(): JSX.Element {

        if (this.props.isDisplayViewInEditMode) {

            if (moment.isMoment(this.model.dateTo) || this.model.includeHistory === true) {
                return <div className="field-container">
                    <div className="row">
                        {
                            moment.isMoment(this.model.dateTo)
                                ? <div className="form-group col-12">{this.labelFor(m => m.dateTo, 'CR_GL_ACT_TO_DATE_L', { className: "field-title field-title--form" })}
                                    <p className="field-text">{this.dateDisplayFor(this.model.dateTo, null, this.getResource('GL_YEAR_ABBREVIATION_L'))}</p></div>
                                : null
                        }
                        {
                            this.model.includeHistory === true
                                ? <div className="form-group col-12"><p className="field-text">{this.getResource("CR_GL_INCLUDED_HISTORY_L")}</p></div>
                                : null
                        }
                    </div>
                </div>
            }

            return null
        }

        return <>
            <SectionTitleUI titleKey={"CR_GL_ACT_TO_DATE_L"} isForPreview={true} />
            {
                moment.isMoment(this.model.dateTo)
                    ? <div className="field-container">{this.labelFor(m => m.dateTo, 'CR_GL_ACT_TO_DATE_L', { className: "field-title field-title--preview" })}
                        <p className="field-text">{this.dateDisplayFor(this.model.dateTo, null, this.getResource('GL_YEAR_ABBREVIATION_L'))}</p> </div>
                    : null
            }
            {
                this.model.includeHistory === true
                    ? <div className="field-container"><p className="field-text">{this.getResource("CR_GL_INCLUDED_HISTORY_L")}</p></div>
                    : null
            }
            <ValidationSummary {...this.props} propNames={valSummaryPropNameDateTo} strategy={ValidationSummaryStrategy.excludeAllExcept} />
        </>

    }

    private loadFieldIdents() {

        if (!ObjectHelper.isStringNullOrEmpty(this.model.uicNumber)) {
            new DeedsDataService().getDeedFieldIdents(this.model.uicNumber, this.model.dateTo, this.model.includeHistory).then((fieldIdents) => {
                this.model.draftFieldIdents = fieldIdents;
            })
        }
    }
}

class EmailForReceivingUI extends EPZEUBaseComponent<RequestForCertificateProps, RequestForCertificate> {

    renderEdit(): JSX.Element {
        return <div className="field-container">
            <div className="row">
                <div className="col-sm-6">
                    {this.labelFor(m => m.email, 'CR_APP_EMAIL_ADDRESSES_OBTAIN_CERTIFICATE_L', { className: "field-title field-title--form" })}
                    {this.textBoxFor(x => x.email)}
                </div>
            </div>
        </div>
    }

    renderDisplay(): JSX.Element {

        if (this.props.isDisplayViewInEditMode) {

            return !ObjectHelper.isStringNullOrEmpty(this.model.email)
                ? <div className="field-container">
                    <div className="row">
                        <div className="form-group col-12">
                            {this.labelFor(m => m.email, 'CR_APP_EMAIL_ADDRESSES_OBTAIN_CERTIFICATE_L', { className: "field-title field-title--form" })}
                            <p className="field-text">{this.model.email}</p>
                        </div>
                    </div>
                </div>
                : null
        }

        return <>
            <SectionTitleUI titleKey={"CR_APP_EMAIL_ADDRESSES_OBTAIN_CERTIFICATE_L"} isForPreview={true} />
            <div className="field-container">
                {
                    !ObjectHelper.isStringNullOrEmpty(this.model.email)
                        ? <>{this.labelFor(m => m.email, 'CR_APP_EMAIL_ADDRESSES_OBTAIN_CERTIFICATE_L', { className: "field-title field-title--preview" })}<p className="field-text">{this.model.email}</p></>
                        : null
                }
                <ValidationSummaryErrorsPreviewUI errors={this.model.getPropertyErrors("email")} />
            </div>
        </>

    }
}

class DefineDatePeriodUI extends EPZEUBaseComponent<RequestForCertificateProps, RequestForCertificate> {

    renderEdit(): JSX.Element {
        return <div className="field-container">
            {this.labelFor(m => m.dateFrom, 'GL_PERIOD_L', { className: "field-title field-title--form" })}
            <Period
                modelReferenceOfFirstDate={new BindableReference(this.model, 'dateFrom', this.props.modelReference.getValidators())}
                modelReferenceOfSecondDate={new BindableReference(this.model, 'dateTo', this.props.modelReference.getValidators())}
            />
        </div>
    }

    renderDisplay(): JSX.Element {

        if (this.props.isDisplayViewInEditMode) {

            if (moment.isMoment(this.model.dateFrom) || moment.isMoment(this.model.dateTo)) {
                return <div className="field-container">
                    <div className="row">
                        <div className="form-group col-12">
                            {moment.isMoment(this.model.dateFrom) || moment.isMoment(this.model.dateTo) ? this.labelFor(m => m.dateFrom, 'GL_PERIOD_L', { className: "field-title field-title--form" }) : null}
                            {
                                moment.isMoment(this.model.dateFrom) || moment.isMoment(this.model.dateTo)
                                    ? <div className="row">
                                        <div className="col-12">
                                            {moment.isMoment(this.model.dateFrom) ? <><label className="mr-1">{this.getResource("GL_START_DATE_L")}:</label>{this.dateDisplayFor(this.model.dateFrom, null, this.getResource('GL_YEAR_ABBREVIATION_L'))}</> : null}
                                            {moment.isMoment(this.model.dateFrom) ? <span className="mr-1"></span> : null}
                                            {moment.isMoment(this.model.dateTo) ? <><label className="mr-1">{this.getResource("GL_END_DATE_L")}:</label>{this.dateDisplayFor(this.model.dateTo, null, this.getResource('GL_YEAR_ABBREVIATION_L'))}</> : null}
                                        </div>
                                    </div>
                                    : null
                            }
                        </div>
                    </div>
                </div>
            }

            return null;
        }

        return <>
            <SectionTitleUI titleKey={"GL_PERIOD_L"} isForPreview={true} />
            <div className="field-container">
                {moment.isMoment(this.model.dateFrom) || moment.isMoment(this.model.dateTo) ? this.labelFor(m => m.dateFrom, 'GL_PERIOD_L', { className: "field-title field-title--preview" }) : null}
                {
                    moment.isMoment(this.model.dateFrom) || moment.isMoment(this.model.dateTo)
                        ? <div className="row">
                            <div className="col-12">
                                {moment.isMoment(this.model.dateFrom) ? <><label className="mr-1">{this.getResource("GL_START_DATE_L")}:</label>{this.dateDisplayFor(this.model.dateFrom, null, this.getResource('GL_YEAR_ABBREVIATION_L'))}</> : null}
                                {moment.isMoment(this.model.dateFrom) ? <span className="mr-1"></span> : null}
                                {moment.isMoment(this.model.dateTo) ? <><label className="mr-1">{this.getResource("GL_END_DATE_L")}:</label>{this.dateDisplayFor(this.model.dateTo, null, this.getResource('GL_YEAR_ABBREVIATION_L'))}</> : null}
                            </div>
                        </div>
                        : null
                }
                <ValidationSummary {...this.props} propNames={valSummaryPropNameDate} strategy={ValidationSummaryStrategy.excludeAllExcept} />
            </div>
        </>
    }
}

@observer class SelectActUI extends EPZEUBaseComponent<RequestForCertificateProps, RequestForCertificate> {

    private _lastFieldIdentsSearchCriteria: any;

    constructor(props: RequestForCertificateProps) {
        super(props);

        this.onChangeCallback = this.onChangeCallback.bind(this);
    }

    renderEdit(): JSX.Element {
        return <div className="field-container">
            <ValidationSummary {...this.props} propNames={valSummaryPropNameFieldIdents} strategy={ValidationSummaryStrategy.excludeAllExcept} />
            {this.labelFor(m => m.fieldIdents, "GL_ACT_KIND_L", { className: "field-title field-title--form" })}
            <FieldsSelectTreeUI uic={this.model.uicNumber} onlyActs={true} onChangeCallback={this.onChangeCallback} {...this.bind(m => m.fieldIdents, ViewMode.Edit)} />
        </div>
    }

    renderDisplay(): JSX.Element {

        if (this.props.isDisplayViewInEditMode) {

            if (this.model.fieldIdents && this.model.fieldIdents.length > 0) {
                return <div className="field-container">
                    <div className="row">
                        <div className="col-12">
                            {this.labelFor(m => m.fieldIdents, "GL_ACT_KIND_L", { className: "field-title field-title--form" })}
                            <FieldsSelectTreeUI uic={this.model.uicNumber} onlyActs={true} onChangeCallback={this.onChangeCallback} {...this.bind(m => m.fieldIdents, ViewMode.Display)} />
                        </div>
                    </div>
                </div>
            }

            return null
        }

        return <>
            <SectionTitleUI titleKey={"GL_ACT_KIND_L"} isForPreview={true} />
            <div className="field-container">
                {this.model.fieldIdents && this.model.fieldIdents.length > 0 ? this.labelFor(m => m.fieldIdents, "GL_ACT_KIND_L", { className: "field-title field-title--preview" }) : null}
                <FieldsSelectTreeUI uic={this.model.uicNumber} onlyActs={true} onChangeCallback={this.onChangeCallback} {...this.bind(m => m.fieldIdents, ViewMode.Display)} />
                <ValidationSummary {...this.props} propNames={valSummaryPropNameFieldIdents} strategy={ValidationSummaryStrategy.excludeAllExcept} />
            </div>
        </>
    }

    onChangeCallback(fieldIdents: string[]) {
        this.model.fieldIdents = fieldIdents;
        this.loadFieldIdents();
    }

    @action private loadFieldIdents() {
        if (!this._lastFieldIdentsSearchCriteria
            || (this._lastFieldIdentsSearchCriteria.dateTo != this.model.dateTo || this._lastFieldIdentsSearchCriteria.includeHistory != this.model.includeHistory)) {

            this._lastFieldIdentsSearchCriteria = {};
            this._lastFieldIdentsSearchCriteria.dateTo = this.model.dateTo;
            this._lastFieldIdentsSearchCriteria.includeHistory = this.model.includeHistory;

            if (!ObjectHelper.isStringNullOrEmpty(this.model.uicNumber)) {
                new DeedsDataService().getDeedFieldIdents(this.model.uicNumber, this.model.dateTo, this.model.includeHistory).then((fieldIdents) => {
                    this.model.draftFieldIdents = fieldIdents;
                })
            }
        }
    }
}

interface CertificateCircumstancesProps extends RequestForCertificateProps {
    excludeActs?: boolean;
}

@observer class CertificateCircumstancesUI extends EPZEUBaseComponent<CertificateCircumstancesProps, RequestForCertificate> {

    private _lastFieldIdentsSearchCriteria: any;

    constructor(props: CertificateCircumstancesProps) {
        super(props);

        this.onChangeCallback = this.onChangeCallback.bind(this);
    }

    renderEdit(): JSX.Element {
        return <div className="field-container">
            <ValidationSummary {...this.props} propNames={valSummaryPropNameFieldIdents} strategy={ValidationSummaryStrategy.excludeAllExcept} />
            {this.labelFor(m => m.fieldIdents, "CR_GL_SELECT_SECTION_GROUP_FIELD_L", { className: "field-title field-title--form" })}
            <FieldsSelectTreeUI uic={this.model.uicNumber} excludeActs={this.props.excludeActs} onChangeCallback={this.onChangeCallback} {...this.bind(m => m.fieldIdents, ViewMode.Edit)} />
        </div>
    }

    renderDisplay(): JSX.Element {

        if (this.props.isDisplayViewInEditMode) {

            if (this.model.fieldIdents && this.model.fieldIdents.length > 0) {
                return <div className="field-container">
                    <div className="row">
                        <div className="col-12">
                            {this.labelFor(m => m.fieldIdents, "CR_GL_SECTION_GROUP_FIELD_L", { className: "field-title field-title--form" })}
                            <FieldsSelectTreeUI uic={this.model.uicNumber} excludeActs={this.props.excludeActs} {...this.bind(m => m.fieldIdents, ViewMode.Display)} />
                        </div>
                    </div>
                </div>
            }

            return null
        }

        return <>
            <SectionTitleUI titleKey={"CR_GL_SECTION_GROUP_FIELD_L"} isForPreview={true} />
            <div className="field-container">
                {this.model.fieldIdents && this.model.fieldIdents.length > 0 ? this.labelFor(m => m.fieldIdents, "CR_GL_SECTION_GROUP_FIELD_L", { className: "field-title field-title--preview" }) : null}
                <FieldsSelectTreeUI uic={this.model.uicNumber} excludeActs={this.props.excludeActs} {...this.bind(m => m.fieldIdents, ViewMode.Display)} />
                <ValidationSummary {...this.props} propNames={valSummaryPropNameFieldIdents} strategy={ValidationSummaryStrategy.excludeAllExcept} />
            </div>
        </>
    }

    onChangeCallback(fieldIdents: string[]) {
        this.model.fieldIdents = fieldIdents;
        this.loadFieldIdents();
    }

    @action private loadFieldIdents() {
        if (!this._lastFieldIdentsSearchCriteria
            || (this._lastFieldIdentsSearchCriteria.dateTo != this.model.dateTo || this._lastFieldIdentsSearchCriteria.includeHistory != this.model.includeHistory)) {

            this._lastFieldIdentsSearchCriteria = {};
            this._lastFieldIdentsSearchCriteria.dateTo = this.model.dateTo;
            this._lastFieldIdentsSearchCriteria.includeHistory = this.model.includeHistory;

            if (!ObjectHelper.isStringNullOrEmpty(this.model.uicNumber)) {
                new DeedsDataService().getDeedFieldIdents(this.model.uicNumber, this.model.dateTo, this.model.includeHistory).then((fieldIdents) => {
                    this.model.draftFieldIdents = fieldIdents;
                })
            }
        }
    }
}

//#endregion