import * as React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { BaseProps } from "Cnsys.UI.React";
import { EPZEUBaseComponent, attributesClassFormControlMaxL10, attributesClassFormControlMaxL9, ValidationSummaryStrategy, ValidationSummary } from "EPZEU.Core";
import { VerificationPersonOrgSearch } from "../../Models/VerificationPersonOrgSearch";
import { VerificationPersonOrgResultFilters } from "../../Models/Enums";
import { ObjectHelper } from "Cnsys.Core";

interface VerificationPersonOrgSearchUIProps extends BaseProps {
    onSearchCallback: () => void;
}

const valSummaryPropNames = ["", "VerificationPersonOrgSearch."];

@observer export class VerificationPersonOrgSearchUI extends EPZEUBaseComponent<VerificationPersonOrgSearchUIProps, VerificationPersonOrgSearch> {
    private searchButton: HTMLButtonElement = null;
    private cmpUniqueId: string;

    constructor(props: VerificationPersonOrgSearchUIProps) {
        super(props)

        this.cmpUniqueId = ObjectHelper.newGuid();
        this.searchButton = null;

        this.onSearch = this.onSearch.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onSearchFilterChange = this.onSearchFilterChange.bind(this);
        this.onIncludeHistory = this.onIncludeHistory.bind(this);
        this.documentKeyPress = this.documentKeyPress.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.onCollapseCriteria = this.onCollapseCriteria.bind(this);
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
                                <ValidationSummary {...this.props} propNames={valSummaryPropNames} strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true} />
                                <div className="row">
                                    <div className="col-12 form-group">
                                        <div className="form-inline">
                                            <div className="custom-control-inline custom-control custom-radio">
                                                <input id="PhysicalFormId" type="radio" value="PhysicalForm" className="custom-control-input" checked={this.model.selectedSearchFilter == VerificationPersonOrgResultFilters.PhysicalForm} name="grSearchType" onChange={this.onSearchFilterChange} />
                                                <label htmlFor="PhysicalFormId" className="custom-control-label">{this.getResource('GL_INDIVIDUAL_L')}</label>
                                            </div>
                                            <div className="custom-control-inline custom-control custom-radio">
                                                <input id="CompanyFormId" type="radio" value="CompanyForm" className="custom-control-input" name="grSearchType" checked={this.model.selectedSearchFilter == VerificationPersonOrgResultFilters.CompanyForm} onChange={this.onSearchFilterChange} />
                                                <label htmlFor="CompanyFormId" className="custom-control-label">{this.getResource('GL_LEGAL_ENTITY_L')}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-group col-sm-6 col-lg-4">
                                        {this.model.selectedSearchFilter == VerificationPersonOrgResultFilters.PhysicalForm ? this.labelFor(m => m.ident, "CR_GL_00003_L") : this.labelFor(m => m.ident, "CR_GL_COMPANY_ID_BULSTAT_L")}
                                        {this.model.selectedSearchFilter == VerificationPersonOrgResultFilters.PhysicalForm ? this.textBoxFor(m => m.ident, attributesClassFormControlMaxL10) : null}
                                        {this.model.selectedSearchFilter == VerificationPersonOrgResultFilters.CompanyForm ? this.textBoxFor(m => m.ident, attributesClassFormControlMaxL9) : null}
                                    </div>
                                    <div className="form-group col-sm-6 col-lg-8">
                                        {this.model.selectedSearchFilter == VerificationPersonOrgResultFilters.PhysicalForm ? this.labelFor(m => m.name, "GL_PERSON_NAME_L") : this.labelFor(m => m.name, "CR_GL_COMPANY_NAME_L")}
                                        {this.textBoxFor(m => m.name)}
                                    </div>
                                </div>
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
        this.model.ident = undefined;
        this.model.name = undefined;
        this.model.includeHistory = false;
        this.model.count = 0;
        this.model.clearErrors();
    }

    @action onSearchFilterChange(event: any): void {
        let selectedValue = event.target.value;

        if (selectedValue == 'PhysicalForm') {
            this.model.selectedSearchFilter = VerificationPersonOrgResultFilters.PhysicalForm;
        } else {
            this.model.selectedSearchFilter = VerificationPersonOrgResultFilters.CompanyForm;
        }

        this.model.ident = undefined;
        this.model.name = undefined;
        this.model.count = 0;
        this.model.clearErrors();
    }

    @action onIncludeHistory(event: any): void {
        this.model.includeHistory = this.model.includeHistory ? false : true;
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