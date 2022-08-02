import * as React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { BaseProps } from "Cnsys.UI.React";
import { EPZEUBaseComponent, attributesClassFormControlMaxL9, ValidationSummaryStrategy, ValidationSummary } from "EPZEU.Core";
import { ActiveConditionSearch } from "../../Models/ActiveConditionSearch";
import { ObjectHelper } from "Cnsys.Core";

interface ActiveConditionSearchProps extends BaseProps {
    onSearchCallback: () => void;
}

const valSummaryPropNames = ["", "ActiveConditionSearch."];

@observer export class ActiveConditionSearchUI extends EPZEUBaseComponent<ActiveConditionSearchProps, ActiveConditionSearch> {
    private searchButton: HTMLButtonElement = null;
    private cmpUniqueId: string;

    constructor(props: any) {
        super(props);

        //Init
        this.searchButton = null;
        this.cmpUniqueId = ObjectHelper.newGuid();

        //Bind
        this.onSearch = this.onSearch.bind(this);
        this.onClear = this.onClear.bind(this);
        this.documentKeyPress = this.documentKeyPress.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.onCollapseCriteria = this.onCollapseCriteria.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.documentKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.documentKeyPress);
    }

    render(): JSX.Element {
        return (
            <>
                <ValidationSummary {...this.props} propNames={valSummaryPropNames} strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true} />
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
                                <div className="help-text">
                                    <p>{this.getResource('GL_SEARCH_TRADER_DEPARTMENT_L')}</p>
                                </div>
                                <div className="row">
                                    <div className="form-group col-sm-6 col-lg-4">
                                        {this.labelFor(m => m.uic, "GL_COMPANY_ID_L")}
                                        {this.textBoxFor(m => m.uic, attributesClassFormControlMaxL9)}
                                    </div>
                                    <div className="form-group col-sm">
                                        {this.labelFor(m => m.entryDate, "GL_STATE_BY_DATE_L")}
                                        {this.dateFor(m => m.entryDate)}
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

    @action onSearch() {
        if (this.props.onSearchCallback) {
            this.props.onSearchCallback();
        }
    }

    @action onClear() {
        this.model.uic = "";
        this.model.entryDate = null;
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
}