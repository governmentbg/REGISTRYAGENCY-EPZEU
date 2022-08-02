import { BindableReference, ObjectHelper } from "Cnsys.Core";
import { BaseProps } from "Cnsys.UI.React";
import { attributesClassFormControlMaxL14, attributesClassFormControlMaxL2, EPZEUBaseComponent, Period, ValidationSummary, ValidationSummaryStrategy } from "EPZEU.Core";
import { MasterAssignmentSearchCriteria, MasterAssignmentSearchCriteriaFilter } from 'EPZEU.CR.Core';
import { action } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";

interface AssignmentsWithoutLotSearchUIProps extends BaseProps {
    onSearchCallback: () => void;
}

const valSummaryPropNames = ["", "MasterAssignmentSearchCriteria."];

@observer export class AssignmentsWithoutLotSearchUI extends EPZEUBaseComponent<AssignmentsWithoutLotSearchUIProps, MasterAssignmentSearchCriteria> {
    private searchButton: HTMLButtonElement = null;
    private cmpUniqueId: string;

    constructor(props: AssignmentsWithoutLotSearchUIProps) {
        super(props)

        this.cmpUniqueId = ObjectHelper.newGuid();
        this.searchButton = null;

        this.onSearch = this.onSearch.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onSearchFilterChange = this.onSearchFilterChange.bind(this);
        this.documentKeyPress = this.documentKeyPress.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.onCollapseCriteria = this.onCollapseCriteria.bind(this);
        this.model.searchFilter = MasterAssignmentSearchCriteriaFilter.ByCompanyName;
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
                                                <input id="ByCompanyNameId" type="radio" value="ByCompanyName" className="custom-control-input" name="grSearchType" checked={this.model.searchFilter == MasterAssignmentSearchCriteriaFilter.ByCompanyName} onChange={this.onSearchFilterChange} />
                                                <label htmlFor="ByCompanyNameId" className="custom-control-label">{this.getResource('CR_GL_COMPANY_NAME_L')}</label>
                                            </div>
                                            <div className="custom-control-inline custom-control custom-radio">
                                                <input id="ByIncomingNumberId" type="radio" value="ByIncomingNumber" className="custom-control-input" checked={this.model.searchFilter == MasterAssignmentSearchCriteriaFilter.ByIncomingNumber} name="grSearchType" onChange={this.onSearchFilterChange} />
                                                <label htmlFor="ByIncomingNumberId" className="custom-control-label">{this.getResource('CR_GL_INCOMING_NO_REQUEST_APPOINTMENT_L')}</label>
                                            </div>
                                            <div className="custom-control-inline custom-control custom-radio">
                                                <input id="ByOutgoingIncomingNumberId" type="radio" value="ByOutgoingIncomingNumber" className="custom-control-input" name="grSearchType" checked={this.model.searchFilter == MasterAssignmentSearchCriteriaFilter.ByOutgoingIncomingNumber} onChange={this.onSearchFilterChange} />
                                                <label htmlFor="ByOutgoingIncomingNumberId" className="custom-control-label">{this.getResource('CR_GL_ACT_APPOINT_NO_L')}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {this.model.searchFilter == MasterAssignmentSearchCriteriaFilter.ByIncomingNumber ?
                                    <div className="row"><div className="form-group col-sm-6 col-lg-4">{this.textBoxFor(m => m.incomingNumber, attributesClassFormControlMaxL14)}</div></div>
                                    : null}

                                {this.model.searchFilter == MasterAssignmentSearchCriteriaFilter.ByOutgoingIncomingNumber ?
                                    <div className="form-row">
                                        <div className="form-group col col-sm-4 col-xl-3">
                                            {this.textBoxFor(m => m.outgoingIncomingNumber, attributesClassFormControlMaxL14)}
                                        </div>
                                        <div className="form-group col-auto">
                                            <span className="form-text">-</span>
                                        </div>
                                        <div className="form-group col-3 col-sm-2 col-xl-1">
                                            {this.textBoxFor(m => m.outgoingSeqNumber, attributesClassFormControlMaxL2)}
                                        </div>
                                        <div className="form-group col-auto d-none d-sm-inline-block">
                                            <span className="form-text">/</span>
                                        </div>
                                        <div className="form-group col-12 col-sm-4 col-xl-2">
                                            {this.dateFor(m => m.outgoingNumberDate)}
                                        </div>
                                    </div>
                                    : null}

                                {this.model.searchFilter == MasterAssignmentSearchCriteriaFilter.ByCompanyName ?
                                    <>
                                        <div className="row">
                                            <div className="form-group col-12">
                                                {this.textBoxFor(m => m.companyName)}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <label>{this.getResource('GL_PERIOD_L')}</label>
                                            </div>
                                            <div className="col-12">
                                                <Period
                                                    modelReferenceOfFirstDate={new BindableReference(this.model, 'fromDate', this.props.modelReference.getValidators())}
                                                    modelReferenceOfSecondDate={new BindableReference(this.model, 'toDate', this.props.modelReference.getValidators())}
                                                />
                                            </div>
                                        </div>
                                    </>
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
        this.model.outgoingIncomingNumber = undefined;
        this.model.outgoingNumberDate = undefined;
        this.model.outgoingSeqNumber = undefined;
        this.model.count = 0;
        this.model.companyName = undefined;
        this.model.clearErrors();
    }

    @action onSearchFilterChange(event: any): void {
        let selectedValue = event.target.value;

        if (selectedValue == 'ByIncomingNumber') {
            this.model.searchFilter = MasterAssignmentSearchCriteriaFilter.ByIncomingNumber;
        } else if (selectedValue == 'ByOutgoingIncomingNumber') {
            this.model.searchFilter = MasterAssignmentSearchCriteriaFilter.ByOutgoingIncomingNumber;
        } else {
            this.model.searchFilter = MasterAssignmentSearchCriteriaFilter.ByCompanyName;
        }

        this.onClear();
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