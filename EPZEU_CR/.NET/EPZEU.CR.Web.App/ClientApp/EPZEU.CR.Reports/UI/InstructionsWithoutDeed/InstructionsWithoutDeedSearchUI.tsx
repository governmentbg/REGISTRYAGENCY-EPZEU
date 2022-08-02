import { ObjectHelper, BindableReference } from "Cnsys.Core";
import { BaseProps } from "Cnsys.UI.React";
import { EPZEUBaseComponent, Period, ValidationSummary, ValidationSummaryStrategy } from "EPZEU.Core";
import { action } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { InstructionSearchCriteria } from "../../Models/InstructionSearchCriteria";

interface InstructionsWithoutDeedSearchProps extends BaseProps {
    onSearchCallback: () => void;
}

const valSummaryPropNames = ["", "InstructionSearchCriteria."];

@observer export class InstructionsWithoutDeedSearchUI extends EPZEUBaseComponent<InstructionsWithoutDeedSearchProps, InstructionSearchCriteria> {
    private searchButton: HTMLButtonElement = null;
    private cmpUniqueId: string;

    constructor(props: InstructionsWithoutDeedSearchProps) {
        super(props)

        this.cmpUniqueId = ObjectHelper.newGuid();
        this.onSearch = this.onSearch.bind(this);
        this.documentKeyPress = this.documentKeyPress.bind(this);
        this.onCollapseCriteria = this.onCollapseCriteria.bind(this);
        this.onSearchFilterChange = this.onSearchFilterChange.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.documentKeyPress, true);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.documentKeyPress, true);
    }

    render() {
        return <div className="search-box search-box--report">
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
                            <div className="col-12">
                                <div className="form-inline">
                                    <div className="custom-control-inline custom-control custom-radio">
                                        <input id="Active" type="radio" value="Active" className="custom-control-input" checked={this.model.isActiveWithoutDeed} name="grSearchType" onChange={this.onSearchFilterChange} />
                                        <label htmlFor="Active" className="custom-control-label">{this.getResource('GL_ACTIVES_L')}</label>
                                    </div>
                                    <div className="custom-control-inline custom-control custom-radio">
                                        <input id="Achive" type="radio" value="Achive" className="custom-control-input" name="grSearchType" checked={!this.model.isActiveWithoutDeed} onChange={this.onSearchFilterChange} />
                                        <label htmlFor="Achive" className="custom-control-label">{this.getResource('GL_ARCHIVE_L')}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {this.model.isActiveWithoutDeed === false &&
                            <>
                                <div className="row">
                                    <div className="col-12">
                                    <label>{this.getResource('GL_PERIOD_APPLICATION_SUBMISSION_L')}</label>
                                    </div>
                                </div>
                                <Period
                                    modelReferenceOfFirstDate={new BindableReference(this.model, 'applicationDateFrom', this.props.modelReference.getValidators())}
                                    modelReferenceOfSecondDate={new BindableReference(this.model, 'applicationDateTo', this.props.modelReference.getValidators())} />
                            </>}
                    </div>
                    <div className="card-footer">
                        <div className="button-bar">
                            <div className="left-side">
                            </div>
                            <div className="right-side">
                                <button type="button" ref={(btn: HTMLButtonElement) => { this.searchButton = btn; }} onClick={this.onSearch} className="btn btn-primary"><i className="ui-icon ui-icon-search ci-btn mr-1"></i>{this.getResource("GL_SEARCH_L")}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    //#region Handlers

    private onSearch(): void {
        if (this.props.onSearchCallback)
            this.props.onSearchCallback();
    }

    @action private onSearchFilterChange(event: any): void {
        let selectedValue = event.target.value;

        this.model.isActiveWithoutDeed = selectedValue == 'Active' ? true : false;

        if (this.model.isActiveWithoutDeed === true) {
            this.model.applicationDateFrom = undefined;
            this.model.applicationDateTo = undefined;
        }
    }

    private onCollapseCriteria(targetId: string): void {
        let triger = $(`#colapsable-triger-${this.cmpUniqueId}`);
        triger.toggleClass('collapsed');

        $('#' + targetId).slideToggle();
    }

    private documentKeyPress(e: any): void {
        if (e.keyCode === 13)
            this.searchButton.click();
    }

    //#endregion
}