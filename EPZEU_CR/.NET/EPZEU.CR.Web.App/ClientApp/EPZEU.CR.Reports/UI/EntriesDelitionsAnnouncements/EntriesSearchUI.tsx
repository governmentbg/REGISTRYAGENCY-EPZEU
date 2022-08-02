import * as React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { BaseProps } from "Cnsys.UI.React";
import { EPZEUBaseComponent, ValidationSummaryStrategy, ValidationSummary, Period } from "EPZEU.Core";
import { ObjectHelper, BindableReference } from "Cnsys.Core";
import { EntriesSearchCriteria } from "EPZEU.CR.Core";

interface EntriesSearchUIProps extends BaseProps {
    onSearchCallback: () => void;
}

const valSummaryPropNames = ["", "EntriesSearchCriteria."];

@observer export class EntriesSearchUI extends EPZEUBaseComponent<EntriesSearchUIProps, EntriesSearchCriteria> {
    private searchButton: HTMLButtonElement = null;
    private cmpUniqueId: string;

    constructor(props: EntriesSearchUIProps) {
        super(props)

        this.searchButton = null;
        this.cmpUniqueId = ObjectHelper.newGuid();

        this.onSearch = this.onSearch.bind(this);
        this.onClear = this.onClear.bind(this);
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
                                <div className="row">
                                    <div className="col-12">
                                        <ValidationSummary {...this.props} propNames={valSummaryPropNames} strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true} />
                                        <label>{this.getResource('GL_PERIOD_L')}</label>
                                    </div>
                                </div>
                                <Period
                                    modelReferenceOfFirstDate={new BindableReference(this.model, 'dateFrom', this.props.modelReference.getValidators())}
                                    modelReferenceOfSecondDate={new BindableReference(this.model, 'dateTo', this.props.modelReference.getValidators())}
                                />
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

    @action onClear(): void {
        this.model.dateFrom = undefined;
        this.model.dateTo = undefined;
        this.model.clearErrors();
    }

    private onSearch(): void {
        if (this.props.onSearchCallback) {
            this.props.onSearchCallback();
        }
    }

    private onCollapseCriteria(targetId: string): void {
        let triger = $(`#colapsable-triger-${this.cmpUniqueId}`);
        triger.toggleClass('collapsed');

        $('#' + targetId).slideToggle();
    }

    private documentKeyPress(e: any): void {
        if (e.keyCode === 13) {
            this.searchButton.click();
        }
    }
}