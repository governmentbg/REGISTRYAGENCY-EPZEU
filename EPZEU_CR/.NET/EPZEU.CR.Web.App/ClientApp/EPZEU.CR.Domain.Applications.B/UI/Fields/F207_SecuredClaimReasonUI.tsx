﻿import { ObjectHelper } from 'Cnsys.Core';
import { EPZEUBaseComponent } from 'EPZEU.Core';
import { FieldContainerProps, withFieldRecordContainer } from 'EPZEU.CR.Domain';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from "react";
import { F207_SecuredClaimReason } from '../../Models/Fields/ModelsAutoGenerated';

@observer class F207_SecuredClaimReasonUI extends EPZEUBaseComponent<FieldContainerProps, F207_SecuredClaimReason> {
    private groupName: string;

    constructor(props?: FieldContainerProps) {
        super(props);

        this.groupName = ObjectHelper.newGuid();
        this.handleChange = this.handleChange.bind(this);
    }

    renderEdit(): JSX.Element {
        let result: any = null;

        if (this.model) {
            result = (
                <>
                    <div className="row">
                        <div className="form-group col-12">
                            <div className="custom-control custom-radio">
                                <input className={"custom-control-input"} type="radio" onChange={this.handleChange} id={this.groupName + '_contract'} name={this.groupName} value={'contract'} checked={this.model.contract} />
                                <label className={"custom-control-label"} htmlFor={this.groupName + '_contract'}>{this.getResource('CR_APP_CONTRACT_L')}</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input className={"custom-control-input"} type="radio" onChange={this.handleChange} id={this.groupName + '_courtOrder'} name={this.groupName} value={'courtOrder'} checked={this.model.courtOrder} />
                                <label className={"custom-control-label"} htmlFor={this.groupName + '_courtOrder'}>{this.getResource('CR_APP_JUDGMENT_DECISION_L')}</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input className={"custom-control-input"} type="radio" onChange={this.handleChange} id={this.groupName + '_administrativeAct'} name={this.groupName} value={'administrativeAct'} checked={this.model.administrativeAct} />
                                <label className={"custom-control-label"} htmlFor={this.groupName + '_administrativeAct'}>{this.getResource('CR_APP_ADMINISTRATIVE_ACT_L')}</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input className={"custom-control-input"} type="radio" onChange={this.handleChange} id={this.groupName + '_otherSource'} name={this.groupName} value={'otherSource'} checked={this.model.otherSource} />
                                <label className={"custom-control-label"} htmlFor={this.groupName + '_otherSource'}>{this.getResource('CR_APP_ANOTHER_SOURCE_L')}</label>
                            </div>
                        </div>
                        {this.model.otherSource == true ?
                            <div className="form-group col-12">
                                {this.textAreaFor(x => x.description, null, 3)}
                            </div> : null}
                    </div>
                    <div className="row">
                        <div className="form-group col-sm-6">
                            {this.labelFor(x => x.date, "GL_DATE_L")}
                            {this.dateFor(x => x.date)}
                        </div>
                    </div>
                </>);
        }

        return result;
    }

    renderDisplay(): JSX.Element {
        return <>
            <div>{this.renderSecuredClaimReasonUI()}</div>
            <div>{this.model.date && <>{this.getResource('GL_DATE_L') + ": " + this.dateDisplayFor(this.model.date, null, this.getResource('GL_YEAR_ABBREVIATION_L'))}</>}</div>
        </>
    }

    private renderSecuredClaimReasonUI() {
        if (this.model.contract)
            return this.getResource('CR_APP_CONTRACT_L')
        else if (this.model.courtOrder)
            return this.getResource('CR_APP_JUDGMENT_DECISION_L')
        else if (this.model.administrativeAct)
            return this.getResource('CR_APP_ADMINISTRATIVE_ACT_L')
        else if (this.model.otherSource)
            return <>{this.getResource('CR_APP_ANOTHER_SOURCE_L')}: {this.model.description}</>
        else
            return null;
    }

    @action private handleChange(e: any) {
        if (e.target.value == 'contract') {
            this.model.contract = true;
            this.model.courtOrder = false;
            this.model.administrativeAct = false;
            this.model.otherSource = false;
        } else if (e.target.value == 'courtOrder') {
            this.model.contract = false;
            this.model.courtOrder = true;
            this.model.administrativeAct = false;
            this.model.otherSource = false;
        } else if (e.target.value == 'administrativeAct') {
            this.model.contract = false;
            this.model.courtOrder = false;
            this.model.administrativeAct = true;
            this.model.otherSource = false;
        } else if (e.target.value == 'otherSource') {
            this.model.contract = false;
            this.model.courtOrder = false;
            this.model.administrativeAct = false;
            this.model.otherSource = true;
        }

        this.model.description = "";
    }
}

export const F207_SecuredClaimReasonFieldUI = withFieldRecordContainer(F207_SecuredClaimReasonUI, {
    fieldLabelTextKey: "CR_F_207_L",
    isMandatoryField: true
});