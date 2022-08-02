﻿import * as React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { ObjectHelper } from 'Cnsys.Core';
import { EPZEUBaseComponent } from 'EPZEU.Core'
import { F070a_WayOfEstablishingEuropeanCooperativeSociety } from '../../Models/Fields/ModelsAutoGenerated'
import { withFieldRecordContainer, FieldContainerProps } from 'EPZEU.CR.Domain';

@observer class F070a_WayOfEstablishingEuropeanCooperativeSocietyUI extends EPZEUBaseComponent<FieldContainerProps, F070a_WayOfEstablishingEuropeanCooperativeSociety> {
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
                            <input className={"custom-control-input"} type="radio" onChange={this.handleChange} id={this.groupName + '_throughInitialFormation'} name={this.groupName} value={'throughInitialFormation'} checked={this.model.throughInitialFormation} />
                            <label className={"custom-control-label"} htmlFor={this.groupName + '_throughInitialFormation'}>{this.getResource('CR_APP_00039_L')}</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input className={"custom-control-input"} type="radio" onChange={this.handleChange} id={this.groupName + '_throughAcquisitionOrMerge'} name={this.groupName} value={'throughAcquisitionOrMerge'} checked={this.model.throughAcquisitionOrMerge} />
                            <label className={"custom-control-label"} htmlFor={this.groupName + '_throughAcquisitionOrMerge'}>{this.getResource('CR_APP_00040_L')}</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input className={"custom-control-input"} type="radio" onChange={this.handleChange} id={this.groupName + '_byConvertingCooperativeSocietyIntoEuropeanCooperativeSociety'} name={this.groupName} value={'byConvertingCooperativeSocietyIntoEuropeanCooperativeSociety'} checked={this.model.byConvertingCooperativeSocietyIntoEuropeanCooperativeSociety} />
                            <label className={"custom-control-label"} htmlFor={this.groupName + '_byConvertingCooperativeSocietyIntoEuropeanCooperativeSociety'}>{this.getResource('CR_APP_00041_L')}</label>
                        </div>
                    </div>
                    </div>
                </>);
        }

        return result;
    }

    renderDisplay(): JSX.Element {
        return <>{this.renderChosenWayOfRepresentation()}</>
    }

    private renderChosenWayOfRepresentation() {
        if (this.model.throughInitialFormation) {
            return this.getResource('CR_APP_00039_L')
        } else if (this.model.throughAcquisitionOrMerge) {
            return this.getResource('CR_APP_00040_L')
        } else if (this.model.byConvertingCooperativeSocietyIntoEuropeanCooperativeSociety) {
            return this.getResource('CR_APP_00041_L')
        } else {
            return null;
        }
    }

    @action private handleChange(e:any) {
        if (e.target.value == 'throughInitialFormation') {
            this.model.throughInitialFormation = true;
            this.model.throughAcquisitionOrMerge = false;
            this.model.byConvertingCooperativeSocietyIntoEuropeanCooperativeSociety = false;
        } else if (e.target.value == 'throughAcquisitionOrMerge') {
            this.model.throughInitialFormation = false;
            this.model.throughAcquisitionOrMerge = true;
            this.model.byConvertingCooperativeSocietyIntoEuropeanCooperativeSociety = false;
        } else if (e.target.value == 'byConvertingCooperativeSocietyIntoEuropeanCooperativeSociety') {
            this.model.throughInitialFormation = false;
            this.model.throughAcquisitionOrMerge = false;
            this.model.byConvertingCooperativeSocietyIntoEuropeanCooperativeSociety = true;
        }
    }
}

export const F070a_WayOfEstablishingEuropeanCooperativeSocietyFieldUI = withFieldRecordContainer(F070a_WayOfEstablishingEuropeanCooperativeSocietyUI, { fieldLabelTextKey: "CR_F_70a_L" });