import { BindableReference, moduleContext, ObjectHelper } from 'Cnsys.Core';
import { AsyncUIProps, withAsyncFrame, withRouter } from 'Cnsys.UI.React';
import { attributesClassFormControl, attributesClassFormControlMaxL4, attributesClassFormControlMaxL9, Authority, AutoComplete, Button, EPZEUBaseComponent, Nomenclatures, ValidationSummaryErrors } from 'EPZEU.Core';
import { ApplicationFormTypes, SubDeedStatuses, SubUICTypes } from 'EPZEU.CR.Core';
import { action, observable, runInAction } from "mobx";
import { observer } from 'mobx-react';
import * as React from 'react';
import { ApplicationFormTypesHelper, BulstatDeed, BulstatsDataService, DeedsDataService, F001_UIC, ProcessStates, SectionInfoUI, StartUIProps, ValidatorHelpers } from "../../";
import { SubDeedSummary } from '../../Models';
import { SubDeedChoiceUI } from './SubDeedChoiceUI';

const infoTextKeys1 = ['GL_CR_INPUT_DATA_COMPANY_CASE_I'];
const infoTextKeys2 = ['CR_APP_00018_I'];
const infoTextKeys3 = ['CR_APP_00261_I'];

@observer class StartUIImpl extends EPZEUBaseComponent<StartUIProps & AsyncUIProps, F001_UIC> {
    private deedsDataService: DeedsDataService;
    private bulstatsDataService: BulstatsDataService;
    private articleGroupName: string;

    @observable private courtName: string = "";
    @observable private processState: ProcessStates = null;
    @observable subDeedSelectionUI: any = null;
    @observable error: JSX.Element = null;
    @observable errors: any[] = [];
    @observable hasError: boolean = null;
    @observable private uicErrorText: string;
    @observable private bulstatLegalForm: string;
    @observable private article63: boolean = true;
    @observable private article6: boolean = false;

    constructor(props?: StartUIProps) {
        super(props);

        this.deedsDataService = new DeedsDataService();
        this.bulstatsDataService = new BulstatsDataService();
        this.articleGroupName = ObjectHelper.newGuid();

        this.renderArticleSelection = this.renderArticleSelection.bind(this);
        this.handleF529_ReasonForEntry529Change = this.handleF529_ReasonForEntry529Change.bind(this);

        this.selectAuthority = this.selectAuthority.bind(this);
        this.showAuthorityValue = this.showAuthorityValue.bind(this);
        this.handleAuthoritySelectOption = this.handleAuthoritySelectOption.bind(this);
        this.handleAuthorityChangeOption = this.handleAuthorityChangeOption.bind(this);

        this.reject = this.reject.bind(this);
        this.deedSearch = this.deedSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onUICChange = this.onUICChange.bind(this);
        if (this.props.applicationType == ApplicationFormTypes.E1 ||
            this.props.applicationType == ApplicationFormTypes.G1 ||
            this.props.applicationType == ApplicationFormTypes.G2 ||
            this.props.applicationType == ApplicationFormTypes.G3) {
            this.processState = ProcessStates.New;
        }

        if (!this.model) {
            this.model = new F001_UIC();
            this.model.bulstatDeed = new BulstatDeed();
        }
    }

    render(): JSX.Element {
        if (this.subDeedSelectionUI)
            return <div className="page-wrapper">
                <div className="section-wrapper">
                    <ValidationSummaryErrors errors={this.props.asyncErrorMessages} />
                    {this.subDeedSelectionUI}
                </div>
            </div>
        else
            return this.renderProcessStatesSelection();
    }

    renderProcessStatesSelection() {
        return (
            <>
                <div className="page-wrapper">
                    <div className="section-wrapper">
                        {
                            ApplicationFormTypesHelper.applicationOnlyForNew(this.props.applicationType)
                                ? null
                                : <SectionInfoUI infoTextKey={this.props.applicationType == ApplicationFormTypes.D1 ? infoTextKeys3 : infoTextKeys2} />
                        }
                        {this.processState == ProcessStates.Preregistration ?
                            <div className="alert alert-warning" role="alert">
                                {moduleContext.resourceManager.getResourceByKey('CR_APP_00013_E')}
                            </div>
                            : null}
                        {this.error}
                        {this.uicErrorText &&
                            <div className="alert alert-danger" role="alert">
                                {this.uicErrorText}
                            </div>
                        }
                        <ValidationSummaryErrors errors={this.props.asyncErrorMessages} />
                        {
                            ApplicationFormTypesHelper.applicationOnlyForNew(this.props.applicationType)
                                ? null
                                : <>
                                    <div className="field-container">
                                        <div className="row">
                                            <div className="form-group col">
                                                <label className="field-title field-title--form">{this.getResource('GL_APPLICATION_FILED_L')}:</label>
                                                {this.renderProcessStateRadioButtons()}
                                            </div>
                                        </div>
                                    </div>
                                    {(this.processState == ProcessStates.New && this.props.applicationType == ApplicationFormTypes.B7) ? this.renderArticleSelection() : null}
                                </>

                        }
                        {this.hasUICInput ? this.renderUICInput() : null}
                        <div className="button-bar button-bar--form">
                            <div className="left-side">
                                <Button type="button" className="btn btn-secondary" lableTextKey={"GL_REFUSE_L"} onClick={this.props.returnToInitialPage}></Button>
                            </div>
                            <div className="right-side">
                                <Button type="btn btn-primary" className="btn btn-primary" lableTextKey={"GL_CONTINUE_L"} onClick={() => this.continue(null)}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    private get hasUICInput(): boolean {
        return (((!ApplicationFormTypesHelper.isTypeAorV(this.props.applicationType) && this.processState == ProcessStates.New) || this.processState == ProcessStates.ForChange || this.processState == ProcessStates.Preregistration) && (this.props.applicationType != ApplicationFormTypes.D1))
    }

    private renderUICInput() {
        return (
            <>
                <div className="field-container">
                    <div className="row">
                        <div className="col">
                            <label className="field-title field-title--form required-field">{this.getResource(this.processState == ProcessStates.Preregistration ? 'CR_GL_COMPANY_ID_BULSTAT_L' : 'CR_GL_COMPANY_ID_L')}</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col col-sm-6 col-lg-4">
                            {this.textBoxFor(m => m.text, attributesClassFormControlMaxL9, this.onUICChange)}
                        </div>
                        <div className="form-group col-auto">
                            <Button type="button" className="btn btn-outline-light text-dark" lableTextKey={"GL_CHECK_L"} onClick={this.deedSearch}>
                                <i className="ui-icon ui-icon-import mr-1" aria-hidden="true"></i></Button>
                        </div>
                    </div>
                </div>
                {this.model.companyControl && this.processState != ProcessStates.Preregistration && (
                    <div className="field-container">
                        <div className="row">
                            <div className="form-group col">
                                <label className="field-title field-title--form">{this.getResource('CR_GL_vCOMPANY_NAME_TR_L')}</label>
                                <p className="field-text">{this.model.companyControl}</p>
                            </div>
                        </div>
                    </div>)}
                {this.processState == ProcessStates.Preregistration && this.renderUICInputForPreregistration()}
            </>
        );
    }

    renderArticleSelection(): JSX.Element {
        return (
            <div className="field-container">
                <div className="row">
                    <div className="form-group col">
                        <label className="field-title field-title--form">{this.getResource('CR_GL_REASON_FOR_REGISTRATION_L')}:</label>
                        <div className="custom-control custom-radio">
                            <input className={"custom-control-input"} type="radio" onChange={this.handleF529_ReasonForEntry529Change} id={this.articleGroupName + '_article63'} name={this.articleGroupName} value={'article63'} checked={this.article63} />
                            <label className={"custom-control-label"} htmlFor={this.articleGroupName + '_article63'}>{this.getResource('CR_APP_00049_L')}</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input className={"custom-control-input"} type="radio" onChange={this.handleF529_ReasonForEntry529Change} id={this.articleGroupName + '_article6'} name={this.articleGroupName} value={'article6'} checked={this.article6} />
                            <label className={"custom-control-label"} htmlFor={this.articleGroupName + '_article6'}>{this.getResource('CR_APP_00050_L')}</label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderUICInputForPreregistration() {
        return (
            <>
                <div className="field-container">
                    <div className="row">
                        <div className="col-12">
                            <label className="field-title field-title--form">{this.getResource('CR_GL_COMPANY_CASE_L')}</label>
                        </div>
                    </div>
                    <SectionInfoUI infoTextKey={infoTextKeys1} />
                    {this.errors && this.errors.length > 0 ? this.errors.map(err => err) : null}
                    <div className="row">
                        <div className="form-group col-6 col-sm-3 col-lg-2" >
                            <label className="field-title field-title--form required-field">{this.getResource('CR_GL_NUMBER_L')}</label>
                            {this.textBoxFor(m => m.bulstatDeed.deed)}
                        </div>
                        <div className="form-group col-6 col-sm-3 col-lg-2">
                            <label className="field-title field-title--form required-field">{this.getResource('GL_YEAR_L')}</label>
                            {this.textBoxFor(m => m.bulstatDeed.year, attributesClassFormControlMaxL4)}
                        </div>
                        <div className="form-group col-sm-6 col-lg-4">
                            <label className="field-title field-title--form required-field">{this.getResource('GL_COURT_CODE_L')}</label>
                            <AutoComplete
                                fullHtmlName="courtName"
                                modelReference={new BindableReference(this, "courtName")}
                                selector={this.selectAuthority}
                                showValue={this.showAuthorityValue}
                                handleSelectCallback={this.handleAuthoritySelectOption}
                                handleChangeCallback={this.handleAuthorityChangeOption}
                                hasSelectedValue={this.model.bulstatDeed.courtCode ? true : false}
                                triggerLength={1}
                                attributes={attributesClassFormControl} />
                        </div>
                    </div>

                </div>
                <div className="field-container">
                    <div className="row">
                        <div className="form-group col-8">
                            <label className="field-title field-title--form">{this.getResource('CR_GL_COMPANY_NAME_L')}</label>
                            {this.textBoxFor(m => m.companyControl)}
                        </div>
                    </div>
                </div>
                <div className="field-container">
                    <div className="row">
                        <div className="form-group col-12">
                            <label className="field-title field-title--form">{this.getResource('GL_BULSTAT_LEGAL_FORM_L')}</label>
                            <p className="field-text">{this.bulstatLegalForm}</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    renderProcessStateRadioButtons(): any {
        if (ApplicationFormTypesHelper.renderHelperTreeRadioButtons(this.props.applicationType)) {
            return [this.renderForNew(), this.renderForChange(), this.renderForPreregistration()];
        }
        else if (ApplicationFormTypesHelper.renderHelperTwoRadioButtons(this.props.applicationType)) {
            return [this.renderForNew(), this.renderForChange()];
        }
        else if (ApplicationFormTypesHelper.renderHelperOneRadioButtons(this.props.applicationType)) {
            return this.renderForNew();
        }
        else {
            return this.renderForChange();
        }
    }

    renderForNew() {
        return (
            <div className="custom-control custom-radio" key="new">
                <input className="custom-control-input" type="radio" onChange={this.handleChange} id="new" name="new" value={ProcessStates.New} checked={
                    this.processState == ProcessStates.New} />
                {this.labelFor(m => m, 'CR_GL_INITIAL_ENTRY_L', { htmlFor: "new", className: "custom-control-label" })}
            </div>);
    };

    renderForChange() {
        return (
            <div className="custom-control custom-radio" key="forChange">
                <input className="custom-control-input" type="radio" onChange={this.handleChange} id="forChange" name="forChange" value={ProcessStates.ForChange} checked={this.processState == ProcessStates.ForChange} />
                {this.labelFor(m => m, 'CR_GL_CHANGE_CIRCUMSTANCES_L', { htmlFor: "forChange", className: "custom-control-label" })}
            </div>
        );
    }

    renderForPreregistration() {
        return (
            <div className="custom-control custom-radio" key="forPreregistration">
                <input className="custom-control-input" type="radio" onChange={this.handleChange} id="forPreregistration" name="forPreregistration" value={ProcessStates.Preregistration} checked={this.processState == ProcessStates.Preregistration} />
                {this.labelFor(m => m, 'CR_GL_RE_REGISTRATION_L', { htmlFor: "forPreregistration", className: "custom-control-label" })}
            </div>
        );
    }

    @action reject(): void {
        this.props.asyncErrorMessages.splice(0);
        this.hasError = false;
        this.uicErrorText = '';
        this.error = null;
        this.errors = [];
        this.subDeedSelectionUI = null;
        this.processState = null;
        this.model = new F001_UIC();
        this.model.bulstatDeed = new BulstatDeed();

        this.article63 = true;
        this.article6 = false;
    }

    @action deedSearch(): any {
        let that = this;
        this.props.asyncErrorMessages.splice(0);
        this.hasError = false;
        this.uicErrorText = '';
        this.error = null;
        this.errors = [];

        if (ValidatorHelpers.isValidUIC(this.model.text)) {
            if (this.processState == ProcessStates.Preregistration) {

                this.clearDataForPreregistration();

                this.props.registerAsyncOperation(this.deedsDataService.getDeedSummary(this.model.text).then((deed) => {
                    runInAction(() => {
                        if (deed) {
                            that.model.companyControl = deed.companyFullName;
                            that.hasError = true;
                            that.uicErrorText = that.getResource('CR_APP_00225_E');
                        } else {
                            that.props.registerAsyncOperation(that.bulstatsDataService.getBulstatSummary(that.model.text).bind(that).then((deed) => {
                                if (deed) {
                                    runInAction(() => {
                                        that.bulstatLegalForm = deed.legalForm;
                                        that.model.companyControl = deed.companyName;
                                        that.model.bulstatDeed.deed = deed.caseNumber ? deed.caseNumber.toString() : null;
                                        that.model.bulstatDeed.year = deed.caseYear ? deed.caseYear.toString() : null;

                                        if (!ObjectHelper.isStringNullOrEmpty(deed.courtCode)) {

                                            Nomenclatures.getCourts().then(authorities => {
                                                const courts = authorities.filter(authority => authority.authorityID == parseInt(deed.courtCode));

                                                if (courts && courts.length > 0) {
                                                    runInAction(() => {
                                                        that.model.bulstatDeed.courtCode = courts[0].authorityID.toString();
                                                        that.courtName = courts[0].authorityName;
                                                    })
                                                }
                                            })
                                        }
                                    })
                                } else {
                                    that.hasError = true;
                                    that.uicErrorText = that.getResource('GL_CR_COMPANY_NOT_FOUND_BULSTAT_E');
                                    this.model.companyControl = "";
                                }
                            }))
                        }
                    })
                }))
            } else if (this.processState == ProcessStates.New && this.props.applicationType == ApplicationFormTypes.B6) {

                this.props.registerAsyncOperation(this.deedsDataService.getDeedSummary(this.model.text).then((deed) => {

                    if (deed) {
                        runInAction(() => {
                            that.model.companyControl = deed.companyFullName;
                        })
                    } else {
                        return that.bulstatsDataService.getBulstatSummary(that.model.text).bind(that).then((deed) => {
                            runInAction(() => {
                                if (deed) {
                                    that.model.companyControl = deed.companyName;
                                } else {
                                    that.hasError = true;
                                    that.uicErrorText = that.getResource('GL_CR_COMPANY_NOT_FOUND_BULSTAT_E');
                                    that.model.companyControl = "";
                                }
                            })
                        })
                    }
                }))

            } else {
                this.props.registerAsyncOperation(this.deedsDataService.getDeedSummary(this.model.text).bind(this).then((deed) => {
                    runInAction(() => {
                        if (deed) {
                            this.model.companyControl = deed.companyFullName;
                            this.hasError = false;
                            this.uicErrorText = '';
                            this.error = null;
                            this.errors = [];
                        }
                        else {
                            this.hasError = true;
                            this.uicErrorText = this.getResource('GL_CR_COMPANY_NOT_FOUND_E');
                            this.model.companyControl = "";
                        }
                    })
                }));
            }
        } else {
            this.hasError = true;
            this.model.removeError('text');
            this.model.addError('text', this.getResource('GL_INVALID_IDENTIFIER_E'));
            this.model.companyControl = "";
        }
    }

    @action continue(subUIC?: string): void {
        this.props.asyncErrorMessages.splice(0);
        this.hasError = false;
        this.uicErrorText = '';
        this.error = null;
        this.errors = [];
        const that = this;

        if (this.processState == null) {
            this.error = (<><div className="alert alert-danger">
                {
                    ApplicationFormTypesHelper.renderHelperTwoRadioButtons(this.props.applicationType)
                        ? this.getResource('CR_APP_00226_E')
                        : this.getResource('CR_APP_00066_E')
                }
            </div></>);
        }
        else if (this.props.applicationType == ApplicationFormTypes.B7 && this.article6 != true && this.article63 != true) {
            this.error = (<><div className="alert alert-danger">
                {this.getResource('CR_APP_SELECT_REASON_L')}
            </div></>);
        }
        else if (this.props.applicationType == ApplicationFormTypes.B2
            && ValidatorHelpers.isValidUIC(this.model.text)
            && this.processState == ProcessStates.ForChange && !subUIC) {
            this.props.registerAsyncOperation(this.deedsDataService.getSubDeedSummaries(this.model.text, SubUICTypes.B2_Branch).bind(this).then(branches => {
                var activeBranches = branches ? branches.filter(x => x.status == SubDeedStatuses.Active) : [];
                if (activeBranches.length > 0) {
                    //Показваме само активните клонове.
                    this.subDeedSelectionUI = <SubDeedChoiceUI uic={this.model.text} subUICType={SubUICTypes.B2_Branch} subDeeds={activeBranches} onSubDeedSelected={(branch) => { this.continue(branch.subUIC) }} onSubDeedSelectionRejected={this.reject} subDeedTitleLabel={this.getResource('CR_APP_SELECT_BRANCH_FOR_CHANGE_L')} subDeedDescriptionLabel={this.getResource('CR_GL_BRANCH_L')} />
                } else {
                    // Няма клон за избраното ЕИК. Заявлението трябва да се подава за първоначално вписване.
                    this.error = (
                        <div className="alert alert-danger">
                            {this.getResource('CR_APP_00091_E')}
                        </div>);
                }

            }))
        } else if (this.props.applicationType == ApplicationFormTypes.B3
            && ValidatorHelpers.isValidUIC(this.model.text)
            && this.processState == ProcessStates.ForChange && !subUIC) {
            this.props.registerAsyncOperation(this.deedsDataService.getSubDeedSummaries(this.model.text, SubUICTypes.B3_Pledge_DD).bind(this).then(pledges => {
                var activePledges = pledges ? pledges.filter(x => x.status == SubDeedStatuses.Active) : [];
                if (activePledges.length > 0) {
                    this.subDeedSelectionUI = <SubDeedChoiceUI uic={this.model.text} subUICType={SubUICTypes.B3_Pledge_DD} subDeeds={activePledges} onSubDeedSelected={(pledge) => { this.continue(pledge.subUIC) }} onSubDeedSelectionRejected={this.reject} subDeedTitleLabel={this.getResource('CR_GL_CHOOSE_PLEDGE_SHARE_L')} subDeedDescriptionLabel={this.getResource('CR_GL_PLEDGE_SHARE_L')} />
                } else {
                    //Няма залог на дружествен дял за избраното ЕИК. Заявлението трябва да се подава за първоначално вписване.
                    this.error = (
                        <div className="alert alert-danger">
                            {this.getResource('CR_APP_00092_E')}
                        </div>);
                }
            }))
        } else if (this.props.applicationType == ApplicationFormTypes.B4
            && ValidatorHelpers.isValidUIC(this.model.text)
            && this.processState == ProcessStates.ForChange && !subUIC) {
            this.props.registerAsyncOperation(this.deedsDataService.getSubDeedSummaries(this.model.text, SubUICTypes.B4_Pledge_TP).bind(this).then(pledges => {
                var activePledges = pledges ? pledges.filter(x => x.status == SubDeedStatuses.Active) : [];
                if (activePledges.length > 0) {
                    this.subDeedSelectionUI = <SubDeedChoiceUI uic={this.model.text} subUICType={SubUICTypes.B4_Pledge_TP} subDeeds={activePledges} onSubDeedSelected={(pledge) => { this.continue(pledge.subUIC) }} onSubDeedSelectionRejected={this.reject} subDeedTitleLabel={this.getResource('CR_GL_CHOOSE_PLEDGE_COMPANY_L')} subDeedDescriptionLabel={this.getResource('CR_GL_PLEDGE_COMPANY_L')} />
                } else {
                    // Няма залог на търговско предприятие за избраното ЕИК. Заявлението трябва да се подава за първоначално вписване.
                    this.error = (
                        <div className="alert alert-danger">
                            {this.getResource('CR_APP_00093_E')}
                        </div>);
                }
            }))
        } else if (this.props.applicationType == ApplicationFormTypes.B5
            && ValidatorHelpers.isValidUIC(this.model.text)
            && this.processState == ProcessStates.ForChange && !subUIC) {
            this.props.registerAsyncOperation(this.deedsDataService.getSubDeedSummaries(this.model.text, SubUICTypes.B5_Distraint_DD).bind(this).then((distraints: SubDeedSummary[]) => {
                // Показваме само активните.
                var activeDistraints = distraints ? distraints.filter(x => x.status == SubDeedStatuses.Active) : [];
                if (activeDistraints.length > 0) {
                    this.subDeedSelectionUI = <SubDeedChoiceUI uic={this.model.text} subUICType={SubUICTypes.B5_Distraint_DD} subDeeds={activeDistraints} onSubDeedSelected={(distraint) => { this.continue(distraint.subUIC) }} onSubDeedSelectionRejected={this.reject} subDeedTitleLabel={this.getResource('CR_GL_CHOOSE_ARREST_L')} subDeedDescriptionLabel={this.getResource('CR_APP_ARREST_SHARE_L')} />
                } else {
                    // Няма запор върху дружествен дял за избраното ЕИК. Заявлението трябва да се подава за първоначално вписване.
                    this.error = (
                        <div className="alert alert-danger">
                            {this.getResource('CR_APP_00094_E')}
                        </div>);
                }
            }))
        } else if (this.props.applicationType == ApplicationFormTypes.B7
            && ValidatorHelpers.isValidUIC(this.model.text)
            && this.processState == ProcessStates.ForChange && !subUIC) {
            this.props.registerAsyncOperation(this.deedsDataService.getSubDeedSummaries(this.model.text, SubUICTypes.B7_ActualOwner).bind(this).then(actualOwners => {
                let activeActualOwners = actualOwners ? actualOwners.filter(x => x.status == SubDeedStatuses.Active) : [];
                if (activeActualOwners.length > 0) {
                    this.subDeedSelectionUI = <SubDeedChoiceUI uic={this.model.text} subUICType={SubUICTypes.B7_ActualOwner} subDeeds={activeActualOwners} onSubDeedSelected={(owner) => { this.continue(owner.subUIC) }} onSubDeedSelectionRejected={this.reject} subDeedTitleLabel={this.getResource('CR_APP_SELECT_REASON_L')} subDeedDescriptionLabel={this.getResource('CR_GL_REASON_FOR_REGISTRATION_L')} />
                } else {
                    this.error = (
                        <div className="alert alert-danger">
                            {this.getResource('CR_APP_00096_E')}
                        </div>);
                }
            }))
        }
        else {

            if ((
                ((!ApplicationFormTypesHelper.isTypeAorV(this.props.applicationType) && this.processState == ProcessStates.New)
                    || this.processState == ProcessStates.ForChange
                    || this.processState == ProcessStates.Preregistration)
                && (ObjectHelper.isStringNullOrEmpty(this.model.text) || !ValidatorHelpers.isValidUIC(this.model.text))
            )
                && (this.props.applicationType != ApplicationFormTypes.D1)
                && (this.props.applicationType != ApplicationFormTypes.J1)
            ) {

                this.hasError = true;
                this.model.removeError('text');
                this.model.addError('text', this.getResource('GL_INVALID_IDENTIFIER_E'));
            }

            if (!this.hasError && this.errors.length == 0) {

                if (this.processState == ProcessStates.Preregistration) {
                    this.props.registerAsyncOperation(this.deedsDataService.getDeedSummary(this.model.text).then(deed => {
                        if (deed) {
                            runInAction(() => {
                                that.hasError = true;
                                that.uicErrorText = that.getResource('CR_APP_00225_E');
                            })
                        } else {

                            that.errors = that.validatePreregistration();

                            if (!that.errors || that.errors.length == 0) {
                                var request: any = {};
                                request.applicationType = that.props.applicationType;
                                request.additionalData = {};

                                request.additionalData.state = that.processState;
                                request.additionalData.uic = that.model.text;
                                request.additionalData.subUIC = subUIC;

                                if (that.model.bulstatDeed != null) {
                                    request.additionalData.deed = that.model.bulstatDeed.deed;
                                    request.additionalData.year = that.model.bulstatDeed.year;
                                    request.additionalData.courtCode = that.model.bulstatDeed.courtCode;
                                    request.additionalData.companyName = that.model.companyControl;
                                }

                                that.props.registerAsyncOperation(that.props.createApplicationProcess(request));
                            }
                        }
                    }))

                } else {
                    var request: any = {};
                    request.applicationType = this.props.applicationType;
                    request.additionalData = {};

                    request.additionalData.state = this.processState;
                    request.additionalData.uic = this.model.text;
                    request.additionalData.subUIC = subUIC;

                    if (this.props.applicationType == ApplicationFormTypes.B6 && this.processState == ProcessStates.New) {
                        this.props.registerAsyncOperation(this.deedsDataService.getDeedSummary(this.model.text).then(deed => {
                            if (!deed) {

                                that.props.registerAsyncOperation(that.bulstatsDataService.getBulstatSummary(that.model.text).bind(that).then((bulstatDeed) => {
                                    if (bulstatDeed) {
                                        runInAction(() => {

                                            if (that.model.bulstatDeed != null) {
                                                request.additionalData.deed = bulstatDeed.caseNumber ? bulstatDeed.caseNumber.toString() : null;
                                                request.additionalData.year = bulstatDeed.caseYear ? bulstatDeed.caseYear.toString() : null;
                                                request.additionalData.courtCode = bulstatDeed.courtCode
                                                request.additionalData.companyName = bulstatDeed.companyName
                                            }

                                            this.props.registerAsyncOperation(this.props.createApplicationProcess(request));
                                        })
                                    } else {
                                        that.hasError = true;
                                        that.uicErrorText = that.getResource('GL_CR_COMPANY_NOT_FOUND_BULSTAT_E');
                                        this.model.companyControl = "";
                                    }
                                }))
                            } else {
                                this.props.registerAsyncOperation(this.props.createApplicationProcess(request));
                            }
                        }))
                    } else {
                        if (this.props.applicationType == ApplicationFormTypes.B7 && this.processState == ProcessStates.New) {
                            request.additionalData.article63 = this.article63;
                            request.additionalData.article6 = this.article6;
                        }

                        this.props.registerAsyncOperation(this.props.createApplicationProcess(request));
                    }
                }
            }
        }
    }

    @action private handleChange(e: any) {
        this.error = null;
        this.subDeedSelectionUI = null;
        this.hasError = null;
        this.errors = [];

        if (e.target.value == ProcessStates.New) {
            this.processState = ProcessStates.New;
            this.hasError = null;
            this.uicErrorText = null;
        } else if (e.target.value == ProcessStates.ForChange) {
            this.processState = ProcessStates.ForChange;
            this.hasError = null;
            this.uicErrorText = null;
        } else if (e.target.value = ProcessStates.Preregistration) {
            this.processState = ProcessStates.Preregistration;
            this.hasError = null;
            this.uicErrorText = null;
        }

        if (!this.hasUICInput) {
            this.model.text = null;
            this.model.companyControl = null;
        }
    }

    @action private handleF529_ReasonForEntry529Change(e: any) {
        if (e.target.value == 'article63') {
            this.article63 = true;
            this.article6 = false;
        } else if (e.target.value == 'article6') {
            this.article63 = false;
            this.article6 = true;
        }
    }

    @action clearDataForPreregistration() {
        this.model.bulstatDeed.deed = null;
        this.model.bulstatDeed.year = null;
        this.model.bulstatDeed.courtCode = null;
        this.model.companyControl = null;
        this.bulstatLegalForm = "";
        this.courtName = "";
    }

    selectAuthority(value: string): Promise<Authority[]> {
        var valueLowerCase = value.toLowerCase();

        if (valueLowerCase.trim() != "")
            return Nomenclatures.getCourts().then(s => {
                return s.filter(s => {
                    let authorityCheck: string = s.authorityID.toString().toLowerCase() + " - " + s.authorityName.toLowerCase();

                    return authorityCheck.indexOf(" " + valueLowerCase) > -1
                        || authorityCheck.indexOf(valueLowerCase) == 0;
                });
            });
        else
            return Promise.resolve([]);
    }

    showAuthorityValue(value: Authority): string {
        return value.authorityID.toString() + " - " + value.authorityName;
    }

    handleAuthorityChangeOption() {
        this.model.bulstatDeed.courtCode = null;
    }

    @action handleAuthoritySelectOption(value?: Authority) {
        if (value) {
            this.model.bulstatDeed.courtCode = value.authorityID.toString();
            this.courtName = value.authorityName;
        }
    }

    @action private validatePreregistration(): any[] {
        if (ObjectHelper.isStringNullOrEmpty(this.model.bulstatDeed.deed)) {
            this.errors.push(<><div className="alert alert-danger">
                {this.getResource('CR_APP_00175_E')}
            </div></>);
        }
        if (ObjectHelper.isStringNullOrEmpty(this.model.bulstatDeed.year)) {
            this.errors.push(<><div className="alert alert-danger">
                {this.getResource('CR_APP_00176_E')}
            </div></>);
        } else if (!ObjectHelper.isNumber(this.model.bulstatDeed.year)) {
            this.errors.push(<><div className="alert alert-danger">
                {this.getResource('CR_APP_00107_E')}
            </div></>);
        }
        if (ObjectHelper.isStringNullOrEmpty(this.model.bulstatDeed.courtCode)) {
            this.errors.push(<><div className="alert alert-danger">
                {this.getResource('CR_APP_INPUT_COURT_CODE_NAME_E')}
            </div></>);
        }
        return this.errors;
    }

    private onUICChange(): void {
        this.model.removeError('text');

        if (!(/^\d{9}$/.test(this.model.text) || /^\d{13}$/.test(this.model.text)) || ValidatorHelpers.isValidUIC(this.model.text) == false) {
            this.hasError = true;
            this.model.addError('text', this.getResource('GL_INVALID_IDENTIFIER_E'));
        }
    }
}

export const ApplicationWithFieldsStartUI = withAsyncFrame(withRouter(StartUIImpl), false);