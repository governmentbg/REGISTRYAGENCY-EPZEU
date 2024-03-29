﻿import { BindableReference, ObjectHelper } from "Cnsys.Core";
import { AsyncUIProps, BaseProps, withAsyncFrame } from "Cnsys.UI.React";
import { attributesClassFormControl, Authority, AutoComplete, EPZEUBaseComponent, Nomenclatures, Period, ValidationSummary, ValidationSummaryStrategy } from "EPZEU.Core";
import { action, observable } from 'mobx';
import { observer } from "mobx-react";
import * as React from "react";
import { BulstatDeedsSearchCriteria } from "../../Models/ModelsAutoGenerated";

interface BulstatDeedsSearchUIProps extends BaseProps, AsyncUIProps {
    onSearchCallback: () => void;
}

const valSummaryPropNames = ["", "SearchCriteria."];

@observer class BulstatDeedsSearchImpl extends EPZEUBaseComponent<BulstatDeedsSearchUIProps, BulstatDeedsSearchCriteria> {
    @observable private courtName: string = "";

    private searchButton: HTMLButtonElement = null;
    private cmpUniqueId: string;

    constructor(props: BulstatDeedsSearchUIProps) {
        super(props)

        this.searchButton = null;
        this.cmpUniqueId = ObjectHelper.newGuid();

        this.onSearch = this.onSearch.bind(this);
        this.onClear = this.onClear.bind(this);
        this.documentKeyPress = this.documentKeyPress.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.onCollapseCriteria = this.onCollapseCriteria.bind(this);

        this.selectAuthority = this.selectAuthority.bind(this);
        this.showAuthorityValue = this.showAuthorityValue.bind(this);
        this.handleAuthorityChange = this.handleAuthorityChange.bind(this);
        this.handleAuthoritySelectOption = this.handleAuthoritySelectOption.bind(this);

        if (this.model.courtNumber != undefined && this.model.courtNumber != null) {
            this.props.registerAsyncOperation(Nomenclatures.getCourts().bind(this).then(authorities => {
                let filteredAuthorities = authorities.filter(a => a.authorityID == this.model.courtNumber);
                if (filteredAuthorities && filteredAuthorities.length > 0) {
                    this.courtName = filteredAuthorities[0].authorityName;
                }
            }));
        }
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
                                    <div className="form-group col-lg-6">
                                        {this.labelFor(m => m.courtNumber, "GL_COURT_CODE_L")}
                                        <AutoComplete
                                            fullHtmlName="courtName"
                                            modelReference={new BindableReference(this, "courtName")}
                                            selector={this.selectAuthority}
                                            showValue={this.showAuthorityValue}
                                            handleSelectCallback={this.handleAuthoritySelectOption}
                                            hasSelectedValue={this.model.courtNumber ? true : false}
                                            handleChangeCallback={this.handleAuthorityChange}
                                            triggerLength={1}
                                            attributes={attributesClassFormControl}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <label>{this.getResource('GL_DATE_REREGISTRATION_L')}</label>
                                    </div>
                                </div>
                                <Period
                                    modelReferenceOfFirstDate={new BindableReference(this.model, 'fromDate', this.props.modelReference.getValidators())}
                                    modelReferenceOfSecondDate={new BindableReference(this.model, 'toDate', this.props.modelReference.getValidators())} />
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
        this.model.fromDate = undefined;
        this.model.toDate = undefined;
        this.model.courtNumber = undefined;
        this.courtName = "";
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

    //#region Authority

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

    @action handleAuthorityChange() {
        this.model.courtNumber = null;
    }

    @action handleAuthoritySelectOption(value?: Authority) {
        if (value) {
            this.model.courtNumber = value.authorityID;
            this.courtName = value.authorityName;
        }
    }

    //#endregion
}

export const BulstatDeedsSearchUI = withAsyncFrame(BulstatDeedsSearchImpl);