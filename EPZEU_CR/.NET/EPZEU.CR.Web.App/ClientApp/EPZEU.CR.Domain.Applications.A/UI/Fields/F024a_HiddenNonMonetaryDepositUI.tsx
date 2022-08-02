﻿import { EPZEUBaseComponent } from 'EPZEU.Core';
import { ApplicationFormContextProviderProps, ProcessStates, RecordContainerProps, withApplicationFormContext, withFieldRecordContainer } from 'EPZEU.CR.Domain';
import * as React from "react";
import { F024a_HiddenNonMonetaryDeposit } from '../../Models/Fields/ModelsAutoGenerated';

interface F024a_HiddenNonMonetaryDepositProps extends ApplicationFormContextProviderProps, RecordContainerProps {
}

class F024a_HiddenNonMonetaryDepositUI extends EPZEUBaseComponent<F024a_HiddenNonMonetaryDepositProps, F024a_HiddenNonMonetaryDeposit> {

    renderEdit(): JSX.Element {
        return <div className="row">
            <div className="form-group col-12">
                <div className="custom-control custom-checkbox">
                    {this.checkBoxFor(x => x.cheked, "CR_APP_00018_L",
                        { className: "custom-control-input", disabled: this.props.applicationManager.processState == ProcessStates.ForChange && this.model.initialState.cheked === true ? true : false })}
                </div>
            </div>
        </div>
    }

    renderDisplay(): JSX.Element {
        return (<>{
            this.model.cheked && this.getResource('GL_OK_L')}</>);
    }
}

export const F024a_HiddenNonMonetaryDepositFieldUI = withApplicationFormContext(withFieldRecordContainer(F024a_HiddenNonMonetaryDepositUI, {
    fieldLabelTextKey: "CR_F_24a_L"
}));