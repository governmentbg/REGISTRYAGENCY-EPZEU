import * as React from 'react';
import { observer } from 'mobx-react';
import { ObjectHelper } from "Cnsys.Core";
import { BaseFieldComponent, BaseFieldProps } from '../BaseFieldComponent';
import { observable, runInAction, action } from 'mobx';
import * as numeral from 'numeral';

@observer export class Amount extends BaseFieldComponent<BaseFieldProps> {
    @observable private currencyVal: any;

    constructor(props?: any, context?: any) {
        super(props, context);

        this.handleOnBlur = this.handleOnBlur.bind(this);
        var mrValue = this.props.modelReference.getValue();
        this.currencyVal = mrValue && mrValue != "" ? mrValue : null;
    }

    renderInternal() {
        return (
            <input type="text" maxLength={16} onBlur={this.handleOnBlur} style={{ textAlign:"right" }} onChange={this.handleChange} value={this.currencyVal} name={this.getName()} id={this.getId()} {...this.props.attributes} />
        );
    }

    @action handleOnBlur() {
        runInAction(() => {
            this.props.modelReference.setValue(numeral(this.currencyVal).value());
            this.currencyVal = !ObjectHelper.isStringNullOrEmpty(this.currencyVal) ? numeral(this.currencyVal).format("0,0.00") : this.currencyVal;
        });
    }

    protected getHandleChangeValue(event: any) {
       

        var value = event.target.value.replace(/\s/g, "");
        value = (numeral as any).localeData().delimiters.decimal == "," ? value.replace(/\./g, ',') : value.replace(/,/g, '.');

        this.currencyVal = /^\d+[,|.]?\d{0,2}0*$/.test(value) || value == "" ? value : this.currencyVal;

        return numeral(this.currencyVal).value();
    }
}