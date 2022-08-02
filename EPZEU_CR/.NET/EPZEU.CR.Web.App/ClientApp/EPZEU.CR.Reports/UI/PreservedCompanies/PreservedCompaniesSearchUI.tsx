import { ObjectHelper, BindableReference } from "Cnsys.Core";
import { BaseProps } from "Cnsys.UI.React";
import { Constants, EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy, Period } from "EPZEU.Core";
import { action } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { PreservedCompaniesSearch } from "../../Models/PreservedCompaniesSearch";

interface PreservedCompaniesSearchUIProps extends BaseProps {
    onSearchCallback: () => void;
}

const valSummaryPropNames = ["", "PreservedCompaniesSearch."];

@observer export class PreservedCompaniesSearchUI extends EPZEUBaseComponent<PreservedCompaniesSearchUIProps, PreservedCompaniesSearch> {

    private searchButton: HTMLButtonElement = null;
    private cmpUniqueId: string;

    constructor(props: PreservedCompaniesSearchUIProps) {
        super(props)

        //Init
        this.searchButton = null;
        this.cmpUniqueId = ObjectHelper.newGuid();

        //Bind
        this.onSearch = this.onSearch.bind(this);
        this.onClear = this.onClear.bind(this);
        this.documentKeyPress = this.documentKeyPress.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.onFirstLetterChange = this.onFirstLetterChange.bind(this);
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
                                    <div className="col-12">
                                        <label>{this.getResource("CR_GL_DATE_OF_PROTECTION_L")}</label>
                                    </div>
                                </div>
                                <Period
                                    modelReferenceOfFirstDate={new BindableReference(this.model, 'fromDate', this.props.modelReference.getValidators())}
                                    modelReferenceOfSecondDate={new BindableReference(this.model, 'toDate', this.props.modelReference.getValidators())}
                                />
                                <div className="row">
                                    <div className="col-12">
                                        <label>{this.getResource("CR_GL_SELECT_FIRST_LETTER_NUMBER_L")}</label>
                                    </div>
                                    <div className="col-12">
                                        <div className="letter-selector">
                                            {
                                                Constants.CYRILLIC_LETTERS.map(letter => {
                                                    return <a key={letter} href="javascript:;" className={`btn btn-sm btn-square ${this.model.companyFirstLatter === letter ? "btn-primary" : "btn-secondary"}`} onClick={() => this.onFirstLetterChange(letter)}>{letter}</a>
                                                })
                                            }
                                            <br />
                                            {
                                                Constants.DIGITS.map(digit => {
                                                    return <a key={digit} href="javascript:;" className={`btn btn-sm btn-square ${this.model.companyFirstLatter === digit ? "btn-primary" : "btn-secondary"}`} onClick={() => this.onFirstLetterChange(digit)}>{digit}</a>
                                                })
                                            }
                                        </div>
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
                                            <i className="ui-icon ui-icon-search mr-1"></i>{this.getResource("GL_SEARCH_L")}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>);
    }



    //#region helpers

    @action private onFirstLetterChange(selectedChar: string): void {

        this.model.companyFirstLatter = selectedChar === this.model.companyFirstLatter ? null : selectedChar;
        this.searchButton.focus();
    }

    @action private onClear() {
        this.model.companyFirstLatter = null;
        this.model.fromDate = null;
        this.model.toDate = null;
        this.model.clearErrors();
    }

    private onSearch() {
        if (this.props.onSearchCallback) {
            this.props.onSearchCallback();
        }
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