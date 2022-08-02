﻿import { BindableReference, ObjectHelper } from "Cnsys.Core";
import { AsyncUIProps, BaseProps, ViewMode, withAsyncFrame } from "Cnsys.UI.React";
import { attributesClassFormControl, attributesClassFormControlMaxL3, Authority, AutoComplete, EPZEUBaseComponent, Nomenclatures, ValidationSummary, ValidationSummaryErrorsPreviewUI, ValidationSummaryStrategy } from 'EPZEU.Core';
import { AddressUI, FieldContainerProps, ListRecordsContainerProps, PersonTypes, PersonUI, SectionSubTitle, withFieldContainer, withFieldRecordContainer, withListRecordsContainer } from 'EPZEU.CR.Domain';
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { F22001_DepozitarDistraint, F2200_DepozitarDistraintDetails, F220_Depozitar } from '../../Models/Fields/ModelsAutoGenerated';

interface F2200_DepozitarDistraintDetailsProps extends BaseProps, AsyncUIProps {
}

const depozitarDistraintValPropName = ["depozitarDistraintDetails"];

@observer class F2200_DepozitarDistraintDetailsUIImpl extends EPZEUBaseComponent<F2200_DepozitarDistraintDetailsProps, F2200_DepozitarDistraintDetails> {
    private groupName: string;
    private persistedCourt: string;

    @observable private courtName: string = "";

    constructor(props?: F2200_DepozitarDistraintDetailsProps) {
        super(props);

        this.groupName = ObjectHelper.newGuid();
        this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);
        this.selectAuthority = this.selectAuthority.bind(this);
        this.showAuthorityValue = this.showAuthorityValue.bind(this);
        this.handleAuthorityChange = this.handleAuthorityChange.bind(this);
        this.handleAuthoritySelectOption = this.handleAuthoritySelectOption.bind(this);
        this.initAuthorityName();
        this.initCourtName = this.initCourtName.bind(this);
        this.initCourtName();
    }

    componentDidUpdate(prevProps: F2200_DepozitarDistraintDetailsProps, prevState: any, snapshot?: never): void {
        if (super.componentDidUpdate) {
            super.componentDidUpdate(prevProps, prevState, snapshot);
        }

        if (this.model.court != this.persistedCourt) {
            this.initCourtName();
        }
    }

    initCourtName() {
        if (this.model.court && this.model.reasonCourt) {
            this.persistedCourt = this.model.court;

            this.props.registerAsyncOperation(Nomenclatures.getCourts().bind(this).then(authorities => {
                this.courtName = authorities.filter(authority => authority.authorityID == +this.model.court)[0].authorityName;
            }));
        }
        else {
            this.persistedCourt = null;
            this.courtName = "";
        }
    }

    renderEdit(): JSX.Element {
        return <>
            <ValidationSummary {...this.bind(x => x.subject)} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
            <PersonUI {...this.bind(x => x.subject)} PersonType={PersonTypes.Depozitar} />
            <AddressUI {...this.bind(x => x.address)} />
            <SectionSubTitle subTitleTextKey={"CR_GL_REASON_L"} />
            <div className="row">
                <div className="form-group col-12">
                    <div className="custom-control custom-radio">
                        <input className={"custom-control-input"} type="radio" onChange={this.handleRadioButtonChange} id={this.groupName + '_reasonCourt'} name={this.groupName} value={'reasonCourt'} checked={this.model.reasonCourt} />
                        <label className={"custom-control-label"} htmlFor={this.groupName + '_reasonCourt'}>{this.getResource('GL_COURT_CODE_L')}</label>
                    </div>
                    <div className="custom-control custom-radio">
                        <input className={"custom-control-input"} type="radio" onChange={this.handleRadioButtonChange} id={this.groupName + '_reasonCourtExecuter'} name={this.groupName} value={'reasonCourtExecuter'} checked={this.model.reasonCourtExecuter} />
                        <label className={"custom-control-label"} htmlFor={this.groupName + '_reasonCourtExecuter'}>{this.getResource('CR_APP_BAILIFF_L')}</label>
                    </div>
                    <div className="custom-control custom-radio">
                        <input className={"custom-control-input"} type="radio" onChange={this.handleRadioButtonChange} id={this.groupName + '_reasonADV'} name={this.groupName} value={'reasonADV'} checked={this.model.reasonADV} />
                        <label className={"custom-control-label"} htmlFor={this.groupName + '_reasonADV'}>{this.getResource('CR_APP_ADV_L')}</label>
                    </div>
                </div>
                {this.model.reasonCourt ?
                    <div className="form-group col-lg-6">
                        {this.labelFor(x => x.court, "CR_APP_COURT_BAILIFF_L")}
                        <AutoComplete fullHtmlName="courtName"
                            modelReference={new BindableReference(this, "courtName")}
                            selector={this.selectAuthority}
                            showValue={this.showAuthorityValue}
                            handleSelectCallback={this.handleAuthoritySelectOption}
                            hasSelectedValue={this.model.court ? true : false}
                            handleChangeCallback={this.handleAuthorityChange}
                            triggerLength={1}
                            attributes={attributesClassFormControl} />
                    </div> :
                    this.model.reasonCourtExecuter ?
                        <div className='form-group col-lg-6'>
                            {this.labelFor(m => m.court, 'CR_APP_COURT_BAILIFF_L')}
                            {this.textBoxFor(m => m.court, attributesClassFormControlMaxL3)}
                        </div> : null
                }
                <div className="form-group col-sm-6">
                    {this.labelFor(x => x.caseNo, "CR_APP_COURT_NUMBER_L")}
                    {this.textBoxFor(x => x.caseNo)}
                </div>
            </div>

            <SectionSubTitle subTitleTextKey={"CR_APP_ARREST_ON_L"} />

            <div className="row">
                <div className="form-group col-12">
                    <div className="custom-control custom-checkbox">
                        {this.checkBoxFor(x => x.incomingDistraint, "CR_APP_AMOUNT_RECEIVED_DISTRIBUTION_L")}
                    </div>
                </div>
            </div>
            <ValidationSummary {...this.props} includeErrorsRecursive={true} strategy={ValidationSummaryStrategy.excludeAllExcept} propNames={depozitarDistraintValPropName} />
            <SectionSubTitle subTitleTextKey={"CR_APP_00045_L"} />
            <div className="row">
                <div className="form-group col-sm-6 col-lg-4">
                    {this.labelFor(x => x.partCount, "CR_GL_PROPORTION_NUMBER_L")}
                    {this.textBoxFor(x => x.partCount)}
                </div>
                <div className="form-group col-sm-6 col-lg-4">
                    {this.labelFor(x => x.partValue, "GL_VALUE_L")}
                    {this.textBoxFor(x => x.partValue)}
                </div>
            </div>
        </>
    }

    renderDisplay(): JSX.Element {
        return <>
            <>
                <PersonUI {...this.bind(x => x.subject)} PersonType={PersonTypes.Depozitar} />
                <ValidationSummary {...this.bind(x => x.subject)} viewMode={ViewMode.Display} />
                <AddressUI {...this.bind(x => x.address)} />
                <div>{this.renderChosenWayOfRepresentation()}</div>
                {(this.model.reasonCourt && (this.model.court)) ? this.getResource('CR_APP_COURT_BAILIFF_L') + ": " + (this.courtName ? this.courtName : this.model.court) + (this.model.caseNo ? ", " : "") : ""}
                {(this.model.reasonCourtExecuter && (this.model.court)) ? this.getResource('CR_APP_COURT_BAILIFF_L') + ": " + this.model.court + (this.model.caseNo ? ", " : "") : ""}
                {this.model.caseNo && this.getResource('CR_APP_COURT_NUMBER_L') + ": " + this.model.caseNo}
                {this.model.incomingDistraint ? <div>{this.getResource("CR_APP_ARREST_ON_L") + " " + this.getResource('CR_APP_AMOUNT_RECEIVED_DISTRIBUTION_L')}</div> : null}
                {this.model.partCount || this.model.partValue ? < div >
                    <>{this.getResource('CR_APP_00045_L')}: </>
                    {this.model.partCount + " " + this.model.partValue}
                </div> : null}
                <ValidationSummaryErrorsPreviewUI errors={this.model.getModelErrors()} />
            </>
        </>
    }

    private renderChosenWayOfRepresentation() {
        if (this.model.reasonCourt) {
            return this.getResource('CR_GL_REASON_L') + ": " + this.getResource('GL_COURT_CODE_L')
        } else if (this.model.reasonCourtExecuter) {
            return this.getResource('CR_GL_REASON_L') + ": " + this.getResource('CR_APP_BAILIFF_L')
        } else if (this.model.reasonADV) {
            return this.getResource('CR_GL_REASON_L') + ": " + this.getResource('CR_APP_ADV_L')
        } else {
            return null;
        }
    }

    @action private handleRadioButtonChange(e: any) {
        if (e.target.value == 'reasonCourt') {
            this.model.reasonCourt = true;
            this.model.reasonCourtExecuter = false;
            this.model.reasonADV = false;
        } else if (e.target.value == 'reasonCourtExecuter') {
            this.model.reasonCourt = false;
            this.model.reasonCourtExecuter = true;
            this.model.reasonADV = false;
        } else if (e.target.value == 'reasonADV') {
            this.model.reasonCourt = false;
            this.model.reasonCourtExecuter = false;
            this.model.reasonADV = true;
        }

        this.model.court = null;
        this.courtName = '';
    }

    //#region Authority

    selectAuthority(value: string): Promise<Authority[]> {
        var valueLowerCase = value.toLowerCase();

        if (valueLowerCase.trim() != "")
            return Nomenclatures.getCourts().then(s => {
                return s.filter(s => {
                    let authorityCheck: string = s.authorityID.toString().toLowerCase() + " - " + s.authorityName.toLowerCase();

                    return authorityCheck.indexOf(" " + valueLowerCase) > -1
                        || authorityCheck.indexOf(valueLowerCase) == 0;
                }
                );
            }
            );
        else
            return Promise.resolve([]);
    }

    initAuthorityName() {
        let that = this;

        if (!ObjectHelper.isStringNullOrEmpty(this.model.court)) {
            that.props.registerAsyncOperation(Nomenclatures.getCourts().then(authorities => {
                var corts = authorities.filter(authority => authority.authorityID == +this.model.court);

                if (corts && corts.length > 0) {
                    this.courtName = corts[0].authorityName;
                }
                else {
                    this.courtName = null;
                }
            }))
        } else {
            that.courtName = null;
        }
    }

    showAuthorityValue(value: Authority): string {
        return value.authorityID.toString() + " - " + value.authorityName;
    }

    @action handleAuthorityChange() {
        this.model.court = null;
    }

    @action handleAuthoritySelectOption(value?: Authority) {
        if (value) {
            this.model.court = value.authorityID.toString();
            this.courtName = value.authorityName;
        }
    }

    //#endregion
}

const F2200_DepozitarDistraintDetailsUI = withAsyncFrame(withFieldRecordContainer(F2200_DepozitarDistraintDetailsUIImpl, {}));

class F22001_DepozitarDistraintUIImpl extends EPZEUBaseComponent<ListRecordsContainerProps, F22001_DepozitarDistraint> {

    renderEdit(): JSX.Element {
        return <>
            <PersonUI {...this.bind(m => m.subject)} PersonType={PersonTypes.Depozitar} /></>
    }

    renderDisplay(): JSX.Element {
        return <PersonUI {...this.bind(m => m.subject)} PersonType={PersonTypes.Depozitar} />
    }
}

const F22001_DepozitarDistraintUI = withListRecordsContainer(F22001_DepozitarDistraintUIImpl, F22001_DepozitarDistraint, {
    addButtonLabelKey: "CR_APP_ADD_PARTNER_L",
    hasAtLeastOneRecord: true,
    valSummaryStrategy: ValidationSummaryStrategy.excludeAllExcept,
    valSummaryRecursive: true,
    valSummaryPropNames: ["", "subject."]
})

@observer class F220_DepozitarUI extends EPZEUBaseComponent<FieldContainerProps, F220_Depozitar> {

    renderEdit(): JSX.Element {

        return <>
            <F2200_DepozitarDistraintDetailsUI {...this.bind(x => x.depozitarDistraintDetails)} />
            <F22001_DepozitarDistraintUI {...this.bind(x => x.depozitarDistraintList)} />
            <div className="row">
                <div className="form-group col-12">
                    <div className="custom-control custom-checkbox">
                        {this.checkBoxFor(x => x.depozitarReminderDistraint.reminderDistraint, "CR_APP_00046_L")}
                    </div>
                </div>
            </div>
            <ValidationSummary {...this.bind(x => x.depozitarReminderDistraint)} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
            <div className="row">
                <div className="form-group col-sm-6 col-lg-4">
                    {this.labelFor(x => x.depozitarReminderDistraint.value, "CR_APP_SIZE_L")}
                    {this.textBoxFor(x => x.depozitarReminderDistraint.value)}
                </div>
                <div className="form-group col-sm-6 col-lg-4">
                    {this.labelFor(x => x.depozitarReminderDistraint.currency, "CR_APP_CURRENCY_L")}
                    {this.textBoxFor(x => x.depozitarReminderDistraint.currency)}
                </div>
            </div>
        </>
    }

    renderDisplay(): JSX.Element {

        return <>
            <F2200_DepozitarDistraintDetailsUI {...this.bind(x => x.depozitarDistraintDetails)} />
            <F22001_DepozitarDistraintUI {...this.bind(x => x.depozitarDistraintList)} />
            {this.model.depozitarReminderDistraint && this.model.depozitarReminderDistraint.reminderDistraint && <>{this.getResource("CR_APP_ARREST_ON_L") + " " + this.getResource('CR_APP_00046_L')}: </>}
            {this.model.depozitarReminderDistraint && !ObjectHelper.isArrayNullOrEmpty(this.model.depozitarReminderDistraint.value) && <> {this.model.depozitarReminderDistraint.value}</>}
            {this.model.depozitarReminderDistraint && !ObjectHelper.isArrayNullOrEmpty(this.model.depozitarReminderDistraint.currency) && <>{" " + this.model.depozitarReminderDistraint.currency}</>}
            {this.model.depozitarReminderDistraint && <ValidationSummaryErrorsPreviewUI errors={this.model.depozitarReminderDistraint.getModelErrors()} />}
        </>
    }
}

export const F220_DepozitarFieldUI = withAsyncFrame(withFieldContainer(F220_DepozitarUI, {
    fieldLabelTextKey: "CR_F_220_L"
}));