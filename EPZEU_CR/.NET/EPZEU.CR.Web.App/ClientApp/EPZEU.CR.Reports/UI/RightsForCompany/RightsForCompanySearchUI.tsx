import { ObjectHelper } from "Cnsys.Core";
import { BaseProps } from "Cnsys.UI.React";
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy } from "EPZEU.Core";
import { action } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { RightsForCompanySearch } from "../../Models/RightsForCompanySearch";

interface RightsForCompanySearchUIUIProps extends BaseProps {
    onSearchCallback: () => void;
}

const valSummaryPropNames = ["", "RightsForCompanySearch."];

@observer export class RightsForCompanySearchUI extends EPZEUBaseComponent<RightsForCompanySearchUIUIProps, RightsForCompanySearch> {
    private searchButton: HTMLButtonElement = null;
    private cmpUniqueId: string;

    constructor(props: RightsForCompanySearchUIUIProps) {
        super(props)

        this.searchButton = null;

        this.onSearch = this.onSearch.bind(this);
        this.onClear = this.onClear.bind(this);
        this.documentKeyPress = this.documentKeyPress.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.cmpUniqueId = ObjectHelper.newGuid();
    }

    componentDidMount() {
        document.addEventListener('keypress', this.documentKeyPress, true);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.documentKeyPress, true);
    }

    render() {
        return (
            <>
                <div className="search-box search-box--report">
                    <div className="card card--search card--collapsible">
                        <div id={`colapsable-triger-${this.cmpUniqueId}`} className="card-header">
                            <h3>{this.getResource('GL_SEARCHING_L')}</h3>
                            <button className="system-button toggle-collapse" onClick={() => { this.onCollapseCriteria(`collapsable-content-${this.cmpUniqueId}`) }}>
                                <i className="ui-icon ui-icon-chevron-up"></i>
                            </button>
                        </div>
                        <div id={`collapsable-content-${this.cmpUniqueId}`} className="collapse" style={{ display: 'block' }}>
                            <div className="card-body">
                                <ValidationSummary {...this.props} propNames={valSummaryPropNames} strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true} />
                                <div className="row">
                                    <div className="form-group col-12">
                                        {this.labelFor(m => m.name, "CR_GL_COMPANY_NAME_L")}
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
                                        <button type="button" ref={(btn: HTMLButtonElement) => { this.searchButton = btn; }} onClick={this.onSearch} className="btn btn-primary">
                                            <i className="ui-icon ui-icon-search mr-1"></i>{this.getResource("GL_SEARCH_L")}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>);
    }

    //region helpers

    @action private onSearch() {
        if (this.props.onSearchCallback) {
            this.props.onSearchCallback();
        }
    }

    @action private onClear() {
        this.model.name = undefined;
        this.model.clearErrors();
    }

    private documentKeyPress(e: any) {
        if (e.keyCode === 13) {
            this.searchButton.click();
        }
    }

    private onCollapseCriteria(targetId: string): void {
        let triger = $(`#colapsable-triger-${this.cmpUniqueId}`);
        triger.toggleClass('collapsed');


        $('#' + targetId).slideToggle();
    }

    //#endregion
}