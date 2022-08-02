import { BindableReference, ObjectHelper } from "Cnsys.Core";
import { BaseProps } from "Cnsys.UI.React";
import { EPZEUBaseComponent, Period, ValidationSummary, ValidationSummaryStrategy, attributesClassFormControlMaxL14 } from "EPZEU.Core";
import { ApplicationFormTypes, UnassignedAssignmentSearchCriteria, UnassignedAssignmentSearchCriteriaFilter } from 'EPZEU.CR.Core';
import { action } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";

interface DocumentsWithoutAppointmentSearchUIProps extends BaseProps {
    onSearchCallback: () => void;
}

const valSummaryPropNames = ["", "UnassignedAssignmentSearchCriteria."];

@observer export class DocumentsWithoutAppointmentSearchUI extends EPZEUBaseComponent<DocumentsWithoutAppointmentSearchUIProps, UnassignedAssignmentSearchCriteria> {
    private searchButton: HTMLButtonElement = null;
    private cmpUniqueId: string;

    constructor(props: DocumentsWithoutAppointmentSearchUIProps) {
        super(props)

        //Init
        this.cmpUniqueId = ObjectHelper.newGuid();
        this.searchButton = null;

        //Bind
        this.onSearch = this.onSearch.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onSearchFilterChange = this.onSearchFilterChange.bind(this);
        this.documentKeyPress = this.documentKeyPress.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.onCollapseCriteria = this.onCollapseCriteria.bind(this);
        this.onDocTypeChange = this.onDocTypeChange.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.documentKeyPress, true);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.documentKeyPress, true);
    }

    render(): JSX.Element {
        return (
            <>
                <div className="search-box search-box--report">
                    <div className="card card--search card--collapsible">
                        <div id={`colapsable-triger-${this.cmpUniqueId}`} className="card-header">
                            <h3>{this.getResource('GL_SEARCHING_L')}</h3>
                            <button className="system-button toggle-collapse" onClick={() => { this.onCollapseCriteria(`collapsable-content-${this.cmpUniqueId}`) }}>
                                <i className="ui-icon ui-icon-chevron-up" aria-hidden="true"></i>
                            </button>
                        </div>
                        <div id={`collapsable-content-${this.cmpUniqueId}`} className="collapse" style={{ display: 'block' }}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12 form-group">
                                        <ValidationSummary {...this.props} propNames={valSummaryPropNames} strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true} />
                                        <div className="form-inline">
                                            <div className="custom-control-inline custom-control custom-radio">
                                                <input id="ByIncomingNumberId" type="radio" value="ByIncomingNumber" className="custom-control-input" checked={this.model.searchFilter == UnassignedAssignmentSearchCriteriaFilter.ByIncomingNumber} name="grSearchType" onChange={this.onSearchFilterChange} />
                                                <label htmlFor="ByIncomingNumberId" className="custom-control-label">{this.getResource('GL_INCOMING_NO_L')}</label>
                                            </div>
                                            <div className="custom-control-inline custom-control custom-radio">
                                                <input id="ByDocTypeId" type="radio" value="ByDocType" className="custom-control-input" name="grSearchType" checked={this.model.searchFilter == UnassignedAssignmentSearchCriteriaFilter.ByDocType} onChange={this.onSearchFilterChange} />
                                                <label htmlFor="ByDocTypeId" className="custom-control-label">{this.getResource('GL_DOCUMENT_KIND_L')}</label>
                                            </div>
                                            <div className="custom-control-inline custom-control custom-radio">
                                                <input id="ByPeriodId" type="radio" value="ByPeriod" className="custom-control-input" name="grSearchType" checked={this.model.searchFilter == UnassignedAssignmentSearchCriteriaFilter.ByPeriod} onChange={this.onSearchFilterChange} />
                                                <label htmlFor="ByPeriodId" className="custom-control-label">{this.getResource('GL_DATE_INPUT_L')}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {this.model.searchFilter == UnassignedAssignmentSearchCriteriaFilter.ByIncomingNumber ?
                                    <div className="row"><div className="form-group col-sm-6 col-lg-4">{this.textBoxFor(m => m.incomingNumber, attributesClassFormControlMaxL14)}</div></div>
                                    : null}

                                {this.model.searchFilter == UnassignedAssignmentSearchCriteriaFilter.ByDocType ?
                                    <div className="row">
                                        <div className="form-group col-12">
                                            <select className="form-control" onChange={this.onDocTypeChange} value={this.model.applicationFormType ? this.model.applicationFormType.toString() : ''}>
                                                <option value={''}>{this.getResource('GL_CHOICE_L')}</option>
                                                <option value={ApplicationFormTypes.AppointingExpert.toString()}>{this.getResource('CR_APP_REQUEST_APPOINTMENT_EXPERT_EXAMINER_SUPERVISOR_L')}</option>
                                                <option value={ApplicationFormTypes.AppointingDeclaration.toString()}>{this.getResource('CR_GL_DECLARATION_CONSENT_L')}</option>
                                                <option value={ApplicationFormTypes.AppointingReportAndExamination.toString()}>{this.getResource('CR_GL_REPORT_EXPERTISE_L')}</option>
                                                <option value={ApplicationFormTypes.AppointingRequestForCorrection.toString()}>{this.getResource('CR_GL_REQUEST_ADJUSTMENT_APPOINTMENT_L')}</option>
                                                <option value={ApplicationFormTypes.AppointingControllerReward.toString()}>{this.getResource('CR_GL_REQUEST_REMUNERATION_CONTROLLER_L')}</option>
                                                <option value={ApplicationFormTypes.AppointingReleaseDeposit.toString()} >{this.getResource('CR_GL_REQUEST_DEPOSIT_RELEASE_L')}</option>
                                                <option value={ApplicationFormTypes.AppointingChangeRequest.toString()}>{this.getResource('CR_GL_REQUEST_CHANGE_PERSON_L')}</option>
                                                <option value={ApplicationFormTypes.ReleaseAppointingExpert.toString()}>{this.getResource('CR_GL_INABILITY_OF_PERSON_L')}</option>
                                                <option value={ApplicationFormTypes.AppointingPaidDeposit.toString()}>{this.getResource('CR_GL_ACCEPTANCE_DEPOSIT_L')}</option>
                                                <option value={ApplicationFormTypes.AttitudeOfChangeRequest.toString()}>{this.getResource('CR_GL_OPINION_REQUEST_CHANGE_PERSION_L')}</option>
                                                <option value={ApplicationFormTypes.AppointingContactAddressChange.toString()}>{this.getResource('CR_GL_NOTIFICATION_CHANGE_CORRESPONDENCE_ADDRESS_L')}</option>
                                                <option value={ApplicationFormTypes.NotificationOfExaminationImpossibility.toString()}>Уведомление, че вещото лице не може да изготви експертизата в срок</option>
                                            </select>
                                        </div>
                                    </div>
                                    : null}

                                {this.model.searchFilter == UnassignedAssignmentSearchCriteriaFilter.ByPeriod ?
                                    <Period
                                        modelReferenceOfFirstDate={new BindableReference(this.model, 'fromDate', this.props.modelReference.getValidators())}
                                        modelReferenceOfSecondDate={new BindableReference(this.model, 'toDate', this.props.modelReference.getValidators())} />
                                    : null}
                            </div>
                            <div className="card-footer">
                                <div className="button-bar">
                                    <div className="left-side">
                                        <button type="button" onClick={this.onClear} className="btn btn-secondary">{this.getResource("GL_CLEAR_L")}</button>
                                    </div>
                                    <div className="right-side">
                                        <button type="button" ref={(btn: HTMLButtonElement) => { this.searchButton = btn; }} onClick={this.onSearch} className="btn btn-primary"><i className="ui-icon ui-icon-search ci-btn mr-1"></i>{this.getResource("GL_SEARCH_L")}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>);
    }



    private onSearch() {
        if (this.props.onSearchCallback) {
            this.props.onSearchCallback();
        }
    }

    @action onClear() {
        this.model.fromDate = undefined;
        this.model.toDate = undefined;
        this.model.incomingNumber = undefined;
        this.model.applicationFormType = undefined;
        this.model.count = 0;
        this.model.clearErrors();
    }

    @action onSearchFilterChange(event: any): void {
        let selectedValue = event.target.value;

        if (selectedValue == 'ByIncomingNumber') {
            this.model.searchFilter = UnassignedAssignmentSearchCriteriaFilter.ByIncomingNumber;
        } else if (selectedValue == 'ByDocType') {
            this.model.searchFilter = UnassignedAssignmentSearchCriteriaFilter.ByDocType;
        } else {
            this.model.searchFilter = UnassignedAssignmentSearchCriteriaFilter.ByPeriod;
        }

        this.onClear();
    }

    @action onDocTypeChange(event: any): void {
        let selectedValue = event.target.value;

        if (selectedValue === '')
            this.model.applicationFormType = undefined;
        else
            this.model.applicationFormType = Number(selectedValue);
    }

    private onCollapseCriteria(targetId: string): void {
        let triger = $(`#colapsable-triger-${this.cmpUniqueId}`);
        triger.toggleClass('collapsed');

        $('#' + targetId).slideToggle();
    }

    private documentKeyPress(e: any) {
        if (e.keyCode === 13) {
            this.searchButton.click();
        }
    }
}