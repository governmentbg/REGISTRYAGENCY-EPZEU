﻿import { ObjectHelper } from 'Cnsys.Core';
import { EPZEUBaseComponent } from 'EPZEU.Core';
import { FieldContainerProps, withFieldRecordContainer } from 'EPZEU.CR.Domain';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from "react";
import { F600_TransferringTypeOfTradeEnterprise } from '../../Models/Fields/ModelsAutoGenerated';

interface F600_TransferringTypeOfTradeEnterpriseProps extends FieldContainerProps {
    onChangeForm: () => void;
}

@observer class F600_TransferringTypeOfTradeEnterpriseUI extends EPZEUBaseComponent<F600_TransferringTypeOfTradeEnterpriseProps, F600_TransferringTypeOfTradeEnterprise> {
    private _groupName: string;

    constructor(props: F600_TransferringTypeOfTradeEnterpriseProps) {
        super(props);
        this._groupName = ObjectHelper.newGuid();
        this.onChangeFormOfTransforming = this.onChangeFormOfTransforming.bind(this);

    }

    renderEdit(): JSX.Element {
        return (
            <div className="row">
                <div className="form-group col-12">
                    <div className="custom-control custom-radio">
                        <input
                            className="custom-control-input"
                            type="radio"
                            onChange={this.onChangeFormOfTransforming}
                            id={this._groupName + 'fulltransfer'}
                            name={this._groupName}
                            value={'fulltransfer'}
                            checked={this.model.fulltransfer}
                        />
                        <label className="custom-control-label" htmlFor={this._groupName + 'fulltransfer'}>{this.getResource('CR_APP_TRANSFER_OF_COMMERCIAL_ENTERPRISE_L')}</label>
                    </div>
                    <div className="custom-control custom-radio">
                        <input
                            className="custom-control-input"
                            type="radio"
                            onChange={this.onChangeFormOfTransforming}
                            id={this._groupName + 'partialtransfer'}
                            name={this._groupName}
                            value={'partialtransfer'}
                            checked={this.model.partialtransfer}
                        />
                        <label className="custom-control-label" htmlFor={this._groupName + 'partialtransfer'}>{this.getResource('CR_APP_PARTIAL_TRANSFER_OF_COMMERCIAL_ENTERPRISE_L')}</label>
                    </div>
                    <div className="custom-control custom-radio">
                        <input
                            className="custom-control-input"
                            type="radio"
                            onChange={this.onChangeFormOfTransforming}
                            id={this._groupName + 'taketransfer'}
                            name={this._groupName}
                            value={'taketransfer'}
                            checked={this.model.taketransfer} />
                        <label className="custom-control-label" htmlFor={this._groupName + 'taketransfer'}>{this.getResource('CR_APP_ASSUMPTION_SOLE_TRADERS_COMMERCIAL_ENTERPRISE_BY_HEIR_L')}</label>
                    </div>
                </div>
            </div>
        )
    }

    renderDisplay(): JSX.Element {
        return (
            <>
                {this.model.fulltransfer && this.getResource('CR_APP_TRANSFER_OF_COMMERCIAL_ENTERPRISE_L')}
                {this.model.partialtransfer && this.getResource('CR_APP_PARTIAL_TRANSFER_OF_COMMERCIAL_ENTERPRISE_L')}
                {this.model.taketransfer && this.getResource('CR_APP_ASSUMPTION_SOLE_TRADERS_COMMERCIAL_ENTERPRISE_BY_HEIR_L')}
            </>
        );
    }

    @action private onChangeFormOfTransforming(e: any) {
        this.model.fulltransfer = this.model.partialtransfer = this.model.taketransfer = false;
        this.props.onChangeForm();

        switch (e.target.value) {
            case 'fulltransfer':
                this.model.fulltransfer = true; break;
            case 'partialtransfer':
                this.model.partialtransfer = true; break;
            case 'taketransfer':
                this.model.taketransfer = true; break;
            default:
        }
    }
}

export const F600_TransferringTypeOfTradeEnterpriseFieldUI = withFieldRecordContainer(F600_TransferringTypeOfTradeEnterpriseUI, {
    fieldLabelTextKey: "CR_F_600_L",
    isMandatoryField: true
});