import { BindableReference } from "Cnsys.Core";
import { AsyncUIProps, withAsyncFrame } from "Cnsys.UI.React";
import { attributesClassFormControl, attributesClassFormControlMaxL14, Authority, AutoComplete, EPZEUBaseComponent, Nomenclatures, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { FieldContainerProps } from 'EPZEU.CR.Domain';
import { action, observable } from 'mobx';
import * as React from "react";
import { ContestationAct } from '../Models/ContestationAct';

const valSummaryPropNames = ["courtCode"];

interface ContestationActProps extends FieldContainerProps, AsyncUIProps {

}

class ContestationActImpl extends EPZEUBaseComponent<ContestationActProps, ContestationAct> {
    @observable private courtName: string = "";

    private persistedCourt: string;

    constructor(props?: ContestationActProps) {
        super(props);

        this.selectAuthority = this.selectAuthority.bind(this);
        this.showAuthorityValue = this.showAuthorityValue.bind(this);
        this.handleAuthorityChange = this.handleAuthorityChange.bind(this);
        this.handleAuthoritySelectOption = this.handleAuthoritySelectOption.bind(this);

        this.initCourtName = this.initCourtName.bind(this);

        this.initCourtName();
    }

    componentDidUpdate(prevProps: FieldContainerProps, prevState: any, snapshot?: never): void {
        if (super.componentDidUpdate) {
            super.componentDidUpdate(prevProps, prevState, snapshot);
        }

        if (this.model.courtCode != this.persistedCourt) {
            this.initCourtName();
        }
    }

    initCourtName() {
        if (this.model.courtCode) {
            this.persistedCourt = this.model.courtCode;

            this.props.registerAsyncOperation(Nomenclatures.getCourts().bind(this).then(authorities => {
                this.courtName = authorities.filter(authority => authority.authorityID == +this.model.courtCode)[0].authorityName;
            }));
        }
        else {
            this.persistedCourt = null;
            this.courtName = "";
        }
    }

    renderEdit(): JSX.Element {
        return <>
            <ValidationSummary {...this.props} propNames={valSummaryPropNames} strategy={ValidationSummaryStrategy.excludeAllExcept} />
            <div className="field-container">
                <div className="row">
                    <div className="form-group col-12 col-sm-6">
                        {this.getResource('CR_GL_INCOMING_REG_NUMBER_APPL_CONTESTATION_TRANSFORM_L')}
                    </div>
                    <div className="form-group col-7 col-sm-4 col-xl-2">
                        {this.getResource('CR_APP_FROM_DATE_L')}
                    </div>
                    <div className="form-group col-12 col-sm-6 col-xl-4">
                        {this.getResource('GL_COURT_CODE_L')}
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-12 col-sm-6">
                        {this.textBoxFor(m => m.incomingNumber, attributesClassFormControlMaxL14)}
                    </div>
                    <div className="form-group col-7 col-sm-4 col-xl-2">
                        {this.dateFor(m => m.fromDate)}
                    </div>
                    <div className="form-group col-12 col-sm-6 col-xl-4">
                        <AutoComplete
                            fullHtmlName="courtName"
                            modelReference={new BindableReference(this, "courtName")}
                            selector={this.selectAuthority}
                            showValue={this.showAuthorityValue}
                            handleSelectCallback={this.handleAuthoritySelectOption}
                            hasSelectedValue={this.model.courtCode ? true : false}
                            handleChangeCallback={this.handleAuthorityChange}
                            triggerLength={1}
                            attributes={attributesClassFormControl}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {this.labelFor(m => m.outgoingNumber, 'CR_APP_DATA_COURT_ACT_APPL_CONTESTATION_TRANSFORMATION_L', { className: 'field-title field-title--form ' })}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {this.getResource('CR_GL_OUTGOING_NO_OF_COURT_L')}
                        {this.textBoxFor(m => m.outgoingNumber)}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {this.getResource('CR_GL_ACT_NUMBER_L')}
                        {this.textBoxFor(m => m.actNumber)}
                    </div>
                </div>
            </div>
        </>
    }

    renderDisplay(): JSX.Element {
        return (<>
            {this.model.incomingNumber && <>{this.getResource('GL_INCOMING_NO_L')}: {this.model.incomingNumber}<br /></>}
            {this.model.fromDate &&
                <>{this.getResource('CR_APP_FROM_DATE_L')}: {this.dateDisplayFor(this.model.fromDate, null, this.getResource('GL_YEAR_ABBREVIATION_L'))}< br /></>}
            {this.courtName && <>{this.getResource('GL_COURT_CODE_L')}: {this.courtName} <br /> </>}
            {this.model.outgoingNumber && <>{this.getResource('CR_GL_OUTGOING_NO_OF_COURT_L')}: {this.model.outgoingNumber} <br /> </>}
            {this.model.actNumber && <>{this.getResource('CR_GL_ACT_NUMBER_L')}: {this.model.actNumber} <br /> </>}
            <ValidationSummary {...this.props} includeErrorsRecursive={true} model={this.model} />
        </>
        );
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
        this.model.courtCode = null;
    }

    @action handleAuthoritySelectOption(value?: Authority) {
        if (value) {
            this.model.courtCode = value.authorityID.toString();
            this.courtName = value.authorityName;
        }
    }

    //#endregion
}

export const ContestationActUI = withAsyncFrame(ContestationActImpl)