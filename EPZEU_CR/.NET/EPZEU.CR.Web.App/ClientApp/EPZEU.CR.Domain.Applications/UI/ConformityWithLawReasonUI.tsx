﻿import { ObjectHelper } from 'Cnsys.Core';
import { EPZEUBaseComponent } from 'EPZEU.Core';
import { FieldContainerProps, SectionInfoUI } from 'EPZEU.CR.Domain';
import { action } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { ConformityWithLawReason } from '../Models/ModelsAutoGenerated';

interface ConformityWithLawReasonUIProps extends FieldContainerProps {
}

var infoTextKeys1 = ['CR_APP_00074_I'];

@observer export class ConformityWithLawReasonUI extends EPZEUBaseComponent<ConformityWithLawReasonUIProps, ConformityWithLawReason> {
    private groupName: string;

    constructor(props?: ConformityWithLawReasonUIProps) {
        super(props);

        this.groupName = ObjectHelper.newGuid();
        this.handleChange = this.handleChange.bind(this);
    }

    renderEdit(): JSX.Element {
        let result: any = null;

        if (this.model) {
            result = (
                <>
                    <label className="field-title field-title--form">{this.getResource('CR_GL_REASON_L')} </label> <br />
                    <SectionInfoUI infoTextKey={infoTextKeys1} />
                    <div className="row">
                        <div className="form-group col-12">
                            <div className="custom-control custom-radio">
                                <input className={"custom-control-input"} type="radio" onChange={this.handleChange} id={this.groupName + '_EUContryCompanyFusion'} name={this.groupName} value={'EUContryCompanyFusion'} checked={this.model.euContryCompanyFusion} />
                                <label className={"custom-control-label"} htmlFor={this.groupName + '_EUContryCompanyFusion'}>{this.getResource('CR_APP_00009_L')}</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input className={"custom-control-input"} type="radio" onChange={this.handleChange} id={this.groupName + '_EUCountryCompanyEstablishing'} name={this.groupName} value={'EUCountryCompanyEstablishing'} checked={this.model.euCountryCompanyEstablishing} />
                                <label className={"custom-control-label"} htmlFor={this.groupName + '_EUCountryCompanyEstablishing'}>{this.getResource('CR_APP_00010_L')}</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input className={"custom-control-input"} type="radio" onChange={this.handleChange} id={this.groupName + '_EUCompanySeatShifting'} name={this.groupName} value={'EUCompanySeatShifting'} checked={this.model.euCompanySeatShifting} />
                                <label className={"custom-control-label"} htmlFor={this.groupName + '_EUCompanySeatShifting'}>{this.getResource('CR_APP_00011_L')}</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input className={"custom-control-input"} type="radio" onChange={this.handleChange} id={this.groupName + '_EUCountryCoOperativeCompanyEstablishing'} name={this.groupName} value={'EUCountryCoOperativeCompanyEstablishing'} checked={this.model.euCountryCoOperativeCompanyEstablishing} />
                                <label className={"custom-control-label"} htmlFor={this.groupName + '_EUCountryCoOperativeCompanyEstablishing'}>{this.getResource('CR_APP_00012_L')}</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input className={"custom-control-input"} type="radio" onChange={this.handleChange} id={this.groupName + '_EUCoOperativeCompanySeatShifting'} name={this.groupName} value={'EUCoOperativeCompanySeatShifting'} checked={this.model.euCoOperativeCompanySeatShifting} />
                                <label className={"custom-control-label"} htmlFor={this.groupName + '_EUCoOperativeCompanySeatShifting'}>{this.getResource('CR_APP_00013_L')}</label>
                            </div>
                        </div>
                    </div>
                </>);
        }

        return result;
    }

    renderDisplay(): JSX.Element {

        return <>
            {
                (this.model.euContryCompanyFusion ||
                    this.model.euCountryCompanyEstablishing ||
                    this.model.euCompanySeatShifting ||
                    this.model.euCountryCoOperativeCompanyEstablishing ||
                    this.model.euCoOperativeCompanySeatShifting) ?


                    <><label className="field-title field-title--form">{this.getResource('CR_GL_REASON_L')} </label> <br /></>
                    : null
            }

            {this.renderChosenWayOfRepresentation()}
        </>
    }

    private renderChosenWayOfRepresentation() {
        if (this.model.euContryCompanyFusion) {
            return this.getResource('CR_APP_00009_L')
        } else if (this.model.euCountryCompanyEstablishing) {
            return this.getResource('CR_APP_00010_L')
        } else if (this.model.euCompanySeatShifting) {
            return this.getResource('CR_APP_00011_L')
        } else if (this.model.euCountryCoOperativeCompanyEstablishing) {
            return this.getResource('CR_APP_00012_L')
        } else if (this.model.euCoOperativeCompanySeatShifting) {
            return this.getResource('CR_APP_00013_L')
        } else {
            return null;
        }
    }

    @action private handleChange(e: any) {
        if (e.target.value == 'EUContryCompanyFusion') {
            this.model.euContryCompanyFusion = true;
            this.model.euCountryCompanyEstablishing = false;
            this.model.euCompanySeatShifting = false;
            this.model.euCountryCoOperativeCompanyEstablishing = false;
            this.model.euCoOperativeCompanySeatShifting = false;
        } else if (e.target.value == 'EUCountryCompanyEstablishing') {
            this.model.euContryCompanyFusion = false;
            this.model.euCountryCompanyEstablishing = true;
            this.model.euCompanySeatShifting = false;
            this.model.euCountryCoOperativeCompanyEstablishing = false;
            this.model.euCoOperativeCompanySeatShifting = false;
        } else if (e.target.value == 'EUCompanySeatShifting') {
            this.model.euContryCompanyFusion = false;
            this.model.euCountryCompanyEstablishing = false;
            this.model.euCompanySeatShifting = true;
            this.model.euCountryCoOperativeCompanyEstablishing = false;
            this.model.euCoOperativeCompanySeatShifting = false;
        } else if (e.target.value == 'EUCountryCoOperativeCompanyEstablishing') {
            this.model.euContryCompanyFusion = false;
            this.model.euCountryCompanyEstablishing = false;
            this.model.euCompanySeatShifting = false;
            this.model.euCountryCoOperativeCompanyEstablishing = true;
            this.model.euCoOperativeCompanySeatShifting = false;
        } else if (e.target.value == 'EUCoOperativeCompanySeatShifting') {
            this.model.euContryCompanyFusion = false;
            this.model.euCountryCompanyEstablishing = false;
            this.model.euCompanySeatShifting = false;
            this.model.euCountryCoOperativeCompanyEstablishing = false;
            this.model.euCoOperativeCompanySeatShifting = true;
        }
    }
}