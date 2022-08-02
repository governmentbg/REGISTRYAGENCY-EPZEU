﻿import { EPZEUBaseComponent } from 'EPZEU.Core';
import { ApplicationFormContextProps, FieldContainerProps, ProcessStates, withApplicationFormContext, withFieldRecordContainer } from 'EPZEU.CR.Domain';
import * as React from "react";
import { F225_PledgeAddemption } from '../../Models/Fields/ModelsAutoGenerated';

interface F225_PledgeAddemptionProps extends FieldContainerProps, ApplicationFormContextProps {
}

class F225_PledgeAddemptionUI extends EPZEUBaseComponent<F225_PledgeAddemptionProps, F225_PledgeAddemption> {

    renderEdit(): JSX.Element {
        return <>
            <div className="row">
                <div className="form-group col">
                    <div className="custom-control custom-checkbox">
                        {this.checkBoxFor(x => x.addempted, "GL_EFFACEMENT_L",
                            { className: "custom-control-input", disabled: this.props.applicationManager.processState == ProcessStates.ForChange && this.model.initialState.addempted === true ? true : false })}
                    </div>
                </div>
            </div>
        </>
    }

    renderDisplay(): JSX.Element {
        return <>{this.model.addempted ? <>{this.getResource('GL_EFFACEMENT_L')}</> : null}</>
    }
}

export const F225_PledgeAddemptionFieldUI = withFieldRecordContainer(withApplicationFormContext(F225_PledgeAddemptionUI), {
    fieldLabelTextKey: "CR_F_225_L",
    fieldLabelFor: (model: F225_PledgeAddemption) => model.addempted
});