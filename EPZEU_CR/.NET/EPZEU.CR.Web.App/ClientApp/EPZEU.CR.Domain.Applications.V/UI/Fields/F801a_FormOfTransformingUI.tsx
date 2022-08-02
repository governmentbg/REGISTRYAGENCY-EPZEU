﻿import { ObjectHelper } from 'Cnsys.Core';
import { EPZEUBaseComponent, ValidationSummaryStrategy } from 'EPZEU.Core';
import { FieldContainerProps, withFieldRecordContainer } from 'EPZEU.CR.Domain';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from "react";
import { F801a_FormOfTransforming801a } from '../../Models/Fields/ModelsAutoGenerated';

interface F801a_FormOfTransformingProps extends FieldContainerProps {
    onChangeFormOfTransforming?: () => void;
}

export enum FormsOfTransforming {
    /**учредяване на ЕКД чрез вливане с участие на кооперации със седалище в държава – членка на ЕС или други държави – страни по споразумението за ЕИП*/
    Influx801a,
    /**учредяване на ЕКД чрез сливане с участие на кооперации със седалище в държава – членка на ЕС или други държави – страни по споразумението за ЕИП*/
    Fusion801a,
    /**преобразуване на ЕКД със седалище в Р. България в кооперация със седалище в Р. България*/
    ConversionToCoop,
    /**преобразуване на кооперация със седалище в Р. България в ЕКД със седалище в Р. България*/
    ConversionToEUCoop
}

@observer class F801a_FormOfTransformingUI extends EPZEUBaseComponent<F801a_FormOfTransformingProps, F801a_FormOfTransforming801a> {
    private groupName: string;

    constructor(props: F801a_FormOfTransformingProps) {
        super(props);
        this.groupName = ObjectHelper.newGuid();
        this.onChangeFormOfTransforming = this.onChangeFormOfTransforming.bind(this);
    }

    renderEdit(): JSX.Element {
        return (
            <>
                <div className="row">
                    <div className="form-group col-12">
                        <div className="custom-control custom-radio">
                            <input
                                className="custom-control-input"
                                type="radio"
                                id={'influx801a'}
                                name={this.groupName}
                                value={'influx801a'}
                                onChange={this.onChangeFormOfTransforming}
                                checked={this.model.influx801a} />
                            <label className="custom-control-label" htmlFor={'influx801a'}>{this.getResource('CR_APP_00014_L')}</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input
                                className="custom-control-input"
                                type="radio"
                                id={'fusion801a'}
                                name={this.groupName}
                                value={'fusion801a'}
                                onChange={this.onChangeFormOfTransforming}
                                checked={this.model.fusion801a} />
                            <label className="custom-control-label" htmlFor={'fusion801a'}>{this.getResource('CR_APP_00016_L')}</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input
                                className="custom-control-input"
                                type="radio"
                                id={'conversionToCoop'}
                                name={this.groupName}
                                value={'conversionToCoop'}
                                onChange={this.onChangeFormOfTransforming}
                                checked={this.model.conversionToCoop} />
                            <label className="custom-control-label" htmlFor={'conversionToCoop'}>{this.getResource('CR_APP_TRANSFORMATION_EUROPEAN_COOPERATIVE_COMPANY_TO_COOPERATION_L')}</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input
                                className="custom-control-input"
                                type="radio"
                                id={'conversionToEUCoop'}
                                name={this.groupName}
                                value={'conversionToEUCoop'}
                                onChange={this.onChangeFormOfTransforming}
                                checked={this.model.conversionToEUCoop} />
                            <label className="custom-control-label" htmlFor={'conversionToEUCoop'}>{this.getResource('CR_APP_TRANSFORMATION_COOPERATION_TO_EUROPEAN_COOPERATIVE_COMPANY_L')}</label>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    renderDisplay(): JSX.Element {
        return (
            <>
                {this.model.influx801a && this.getResource('CR_APP_00014_L')}
                {this.model.fusion801a && this.getResource('CR_APP_00016_L')}
                {this.model.conversionToCoop && this.getResource('CR_APP_TRANSFORMATION_EUROPEAN_COOPERATIVE_COMPANY_TO_COOPERATION_L')}
                {this.model.conversionToEUCoop && this.getResource('CR_APP_TRANSFORMATION_COOPERATION_TO_EUROPEAN_COOPERATIVE_COMPANY_L')}
            </>
        );
    }

    @action private onChangeFormOfTransforming(e: any) {
        this.model.fusion801a = this.model.influx801a = this.model.conversionToCoop = this.model.conversionToEUCoop = false;

        switch (e.target.value) {
            case 'influx801a':
                this.model.influx801a = true; break;
            case 'fusion801a':
                this.model.fusion801a = true; break;
            case 'conversionToCoop':
                this.model.conversionToCoop = true; break;
            case 'conversionToEUCoop':
                this.model.conversionToEUCoop = true; break;
            default:
        }

        this.props.onChangeFormOfTransforming && this.props.onChangeFormOfTransforming();
    }
}

export const F801a_FormOfTransformingFieldUI = withFieldRecordContainer(F801a_FormOfTransformingUI, {
    fieldLabelTextKey: "CR_F_801а_L",
    isMandatoryField: true,
    valSummaryStrategy: ValidationSummaryStrategy.excludeAllExcept,
    valSummaryRecursive: true,
    valSummaryPropNames: ["", "conversionToEUCoop"]
});