﻿import { BindableReference, ObjectHelper } from 'Cnsys.Core';
import { AsyncUIProps, withAsyncFrame } from "Cnsys.UI.React";
import { attributesClassFormControl, Authority, AutoComplete, EPZEUBaseComponent, Nomenclatures, ValidationSummaryStrategy } from 'EPZEU.Core';
import { ListRecordsContainerProps, SectionSubTitle, withFieldSingleListRecordsContainer } from 'EPZEU.CR.Domain';
import { action, observable } from 'mobx';
import { observer } from "mobx-react";
import * as React from "react";
import { F02220_InsolvencyOfForeignTrader } from '../../Models/Fields/ModelsAutoGenerated';

interface F022b_InsolvenciesOfForeignTraderProps extends ListRecordsContainerProps, AsyncUIProps {

}

@observer class F022b_InsolvenciesOfForeignTraderUI extends EPZEUBaseComponent<F022b_InsolvenciesOfForeignTraderProps, F02220_InsolvencyOfForeignTrader> {
    private groupName: string;
    @observable private courtName: string = "";
    private persistedCourt: string;

    constructor(props?: F022b_InsolvenciesOfForeignTraderProps) {
        super(props);

        this.groupName = ObjectHelper.newGuid();
        this.handleChange = this.handleChange.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.selectAuthority = this.selectAuthority.bind(this);
        this.showAuthorityValue = this.showAuthorityValue.bind(this);
        this.handleAuthorityChange = this.handleAuthorityChange.bind(this);
        this.handleAuthoritySelectOption = this.handleAuthoritySelectOption.bind(this);
        this.initCourtName = this.initCourtName.bind(this);

        this.initCourtName();
    }

    componentDidUpdate(prevProps: ListRecordsContainerProps, prevState: any, snapshot?: never): void {
        if (super.componentDidUpdate) {
            super.componentDidUpdate(prevProps, prevState, snapshot);
        }

        if (this.model.judicialCode != this.persistedCourt) {
            this.initCourtName();
        }
    }

    initCourtName() {
        if (this.model.judicialCode) {
            this.persistedCourt = this.model.judicialCode;

            this.props.registerAsyncOperation(Nomenclatures.getCourts().bind(this).then(authorities => {
                var corts = authorities.filter(authority => authority.authorityID == +this.model.judicialCode);

                if (corts && corts.length > 0) {
                    this.courtName = corts[0].authorityName;
                }
                else {
                    this.courtName = "";
                }
            }));
        }
        else {
            this.persistedCourt = null;
            this.courtName = "";
        }
    }

    renderEdit(): JSX.Element {
        return (<>
            <div className="row">
                <div className="form-group col-12">
                    {this.textAreaFor(x => x.insolvencyText)}
                </div>
            </div>
            <SectionSubTitle subTitleTextKey={"CR_APP_COURT_ACT_L"} />
            <div className="row">
                <div className="form-group col">
                    {this.labelFor(x => x.actNumber, "CR_GL_NUMBER_L")}
                    {this.textBoxFor(x => x.actNumber)}
                </div>
                <div className="form-group col-auto">
                    {this.labelFor(x => x.date, "GL_DATE_L")}
                    {this.dateFor(x => x.date)}
                </div>
                <div className="form-group col-12 col-lg-6">
                    {this.labelFor(x => x.judicialCode, "GL_COURT_CODE_L")}
                    <AutoComplete
                        fullHtmlName="courtName"
                        modelReference={new BindableReference(this, "courtName")}
                        selector={this.selectAuthority}
                        showValue={this.showAuthorityValue}
                        handleSelectCallback={this.handleAuthoritySelectOption}
                        hasSelectedValue={this.model.judicialCode ? true : false}
                        handleChangeCallback={this.handleAuthorityChange}
                        triggerLength={1}
                        attributes={attributesClassFormControl}/>
                </div>
            </div>
            <div className="row">
                <div className="form-group col">
                    <div className="custom-control custom-radio">
                        <input className="custom-control-input" type="radio" onChange={this.handleChange} id={this.groupName + '_decision759'} name={this.groupName} value={'decision759'} checked={this.model.decision759} />
                        <label className="custom-control-label" htmlFor={this.groupName + '_decision759'}>{this.getResource('CR_APP_00019_L')}</label>
                    </div>
                    <div className="custom-control custom-radio">
                        <input className="custom-control-input" type="radio" onChange={this.handleChange} id={this.groupName + '_decision760'} name={this.groupName} value={'decision760'} checked={this.model.decision760} />
                        <label className="custom-control-label" htmlFor={this.groupName + '_decision760'}>{this.getResource('CR_APP_00020_L')}</label>
                    </div>
                </div>
            </div>
        </>);
    }

    renderDisplay(): JSX.Element {
        return (<>
            {!ObjectHelper.isStringNullOrEmpty(this.model.insolvencyText) ? <div className="preserve-line-breaks">{this.model.insolvencyText}</div> : null}
            {!ObjectHelper.isStringNullOrEmpty(this.model.actNumber) || !ObjectHelper.isNullOrUndefined(this.model.date)
                ? this.getResource('CR_APP_COURT_ACT_L') + ': ' + this.model.actNumber
                : null}
            {!ObjectHelper.isNullOrUndefined(this.model.date) ? '/' + this.dateDisplayFor(this.model.date) : null}
            {(!ObjectHelper.isStringNullOrEmpty(this.model.actNumber) || !ObjectHelper.isNullOrUndefined(this.model.date))
                && !ObjectHelper.isStringNullOrEmpty(this.model.judicialCode) ? ', ' : null}
            {!ObjectHelper.isStringNullOrEmpty(this.model.judicialCode) ? this.getResource('GL_COURT_CODE_L') + ': ' + this.courtName : null}
            {this.model.decision759 ? <div>{this.getResource('CR_APP_00019_L')}</div> : null}
            {this.model.decision760 ? <div>{this.getResource('CR_APP_00020_L')}</div> : null}
        </>);
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
                }
                );
            }
            );
        else
            return Promise.resolve([]);
    }

    showAuthorityValue(value: Authority): string {
        return value.authorityID.toString() + " - " + value.authorityName;
    }

    @action handleAuthorityChange() {
        this.model.judicialCode = null;
    }

    @action handleAuthoritySelectOption(value?: Authority) {
        if (value) {
            this.model.judicialCode = value.authorityID.toString();
            this.courtName = value.authorityName;
        }
    }

    //#endregion

    @action private handleChange(e: any) {
        if (e.target.value == 'decision759') {
            this.model.decision759 = true;
            this.model.decision760 = false;
        } else if (e.target.value == 'decision760') {
            this.model.decision759 = false;
            this.model.decision760 = true;
        }
    }
}

export const F022b_InsolvenciesOfForeignTraderFieldUI = withAsyncFrame(withFieldSingleListRecordsContainer(F022b_InsolvenciesOfForeignTraderUI, F02220_InsolvencyOfForeignTrader, {
    addButtonLabelKey: "CR_APP_ADD_ACT_L",
    listSelector: m => m.insolvencyOfForeignTraderList,
    fieldLabelTextKey: "CR_F_22b_L",
    hasAtLeastOneRecord: true,
    valSummaryStrategy: ValidationSummaryStrategy.excludeAllExcept,
    valSummaryRecursive: true,
    valSummaryPropNames: [""]
}))