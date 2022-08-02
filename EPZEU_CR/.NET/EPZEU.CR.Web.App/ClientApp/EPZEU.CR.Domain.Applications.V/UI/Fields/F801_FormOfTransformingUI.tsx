﻿import { ObjectHelper } from 'Cnsys.Core';
import { EPZEUBaseComponent, ValidationSummaryStrategy } from 'EPZEU.Core';
import { FieldContainerProps, withFieldRecordContainer } from 'EPZEU.CR.Domain';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from "react";
import { F801_FormOfTransforming801 } from '../../Models/Fields/ModelsAutoGenerated';

interface F801_FormOfTransformingProps extends FieldContainerProps {
    formsOfTransforming: FormsOfTransforming[];
    onChangeFormOfTransforming?: () => void;
}

export enum FormsOfTransforming {
    /**разделяне*/
    Separation,
    /**отделяне*/
    Division,
    /**сливане*/
    Fusion,
    /**вливане*/
    Influx
}

@observer class F801_FormOfTransformingUI extends EPZEUBaseComponent<F801_FormOfTransformingProps, F801_FormOfTransforming801> {
    private groupName: string;

    constructor(props: F801_FormOfTransformingProps) {
        super(props);
        this.groupName = ObjectHelper.newGuid();
        this.onChangeFormOfTransforming = this.onChangeFormOfTransforming.bind(this);
        this.getFormOfTransformingUI = this.getFormOfTransformingUI.bind(this);
    }

    renderEdit(): JSX.Element {
        return (
            <>
                <div className="row">
                    <div className="form-group col-12">
                        {
                            this.props.formsOfTransforming.map((form: FormsOfTransforming, index: number) => {
                                return <React.Fragment key={index}>{this.getFormOfTransformingUI(form)}</React.Fragment>
                            })
                        }
                    </div>
                </div>
            </>
        )
    }

    renderDisplay(): JSX.Element {
        return (
            <>
                {this.model.division && this.getResource('CR_APP_SEPARATION_L')}
                {this.model.separation && this.getResource('CR_APP_DETACHMENT_L')}
                {this.model.fusion && this.getResource('CR_APP_INTERFLOW_L')}
                {this.model.influx && this.getResource('CR_APP_INFUSION_L')}
            </>
        );
    }

    @action private onChangeFormOfTransforming(e: any) {
        this.model.separation = this.model.division = this.model.fusion = this.model.influx = false;

        switch (e.target.value) {
            case 'separation':
                this.model.separation = true; break;
            case 'division':
                this.model.division = true; break;
            case 'fusion':
                this.model.fusion = true; break;
            case 'influx':
                this.model.influx = true; break;
            default:
        }

        this.props.onChangeFormOfTransforming && this.props.onChangeFormOfTransforming();
    }

    private getFormOfTransformingUI(formOfTransforming: FormsOfTransforming): JSX.Element {
        switch (formOfTransforming) {
            case FormsOfTransforming.Division:
                return this.getFormOfTransformingElement('division', 'CR_APP_SEPARATION_L', this.model.division);
            case FormsOfTransforming.Separation:
                return this.getFormOfTransformingElement('separation', 'CR_APP_DETACHMENT_L', this.model.separation);
            case FormsOfTransforming.Fusion:
                return this.getFormOfTransformingElement('fusion', 'CR_APP_INTERFLOW_L', this.model.fusion);
            case FormsOfTransforming.Influx:
                return this.getFormOfTransformingElement('influx', 'CR_APP_INFUSION_L', this.model.influx);
            default:
                return null;
        }
    }

    private getFormOfTransformingElement(formOfTransforming: string, resourceKeyCode: string, isChecked: boolean): JSX.Element {
        return (
            <div className="custom-control custom-radio">
                <input className="custom-control-input" type="radio" onChange={this.onChangeFormOfTransforming} id={this.groupName + formOfTransforming} name={this.groupName} value={formOfTransforming} checked={isChecked} />
                <label className="custom-control-label" htmlFor={this.groupName + formOfTransforming}>{this.getResource(resourceKeyCode)}</label>
            </div>
        );
    }
}

export const F801_FormOfTransformingFieldUI = withFieldRecordContainer(F801_FormOfTransformingUI, {
    fieldLabelTextKey: "CR_F_801_L",
    isMandatoryField: true,
    valSummaryStrategy: ValidationSummaryStrategy.excludeAllExcept,
    valSummaryRecursive: true,
    valSummaryPropNames: ["", "separation"]
});