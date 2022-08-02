﻿import { EPZEUBaseComponent, ValidationSummaryErrors, ValidationSummaryErrorsPreviewUI } from 'EPZEU.Core';
import { ApplicationFormContextProviderProps, FieldContainerProps, ProcessStates, withFieldContainer } from 'EPZEU.CR.Domain';
import { observer } from "mobx-react";
import * as React from "react";
import { F027b_EraseReservation } from "../../Models/ModelsAutoGenerated";

interface F027b_EraseReservationProps extends ApplicationFormContextProviderProps, FieldContainerProps {
    processState: ProcessStates;
}

@observer class F027b_EraseReservationImplUI extends EPZEUBaseComponent<F027b_EraseReservationProps, F027b_EraseReservation> {
    renderEdit() {
        return <>
            <ValidationSummaryErrors errors={this.props.modelReference.getErrors()} />
            <div className="row">
                <div className="form-group col-12">
                    <div className="custom-control custom-checkbox">
                        {this.checkBoxFor(x => x.cheked, "CR_GL_EFFACEMENT_OF_COMPANY_NAME_RETENTION_L", { className: "custom-control-input", disabled: this.props.processState == ProcessStates.New })}
                    </div>
                </div>
            </div>
        </>
    }

    renderDisplay(): JSX.Element {
        return (<>{this.model.cheked && this.getResource('CR_GL_EFFACEMENT_OF_COMPANY_NAME_RETENTION_L')}
            <ValidationSummaryErrorsPreviewUI errors={this.props.modelReference.getErrors()} />
        </>);
    }
}

export const F027b_EraseReservationFieldUI = withFieldContainer(F027b_EraseReservationImplUI, {
    fieldLabelTextKey: "CR_F_27b_L",
    fieldLabelFor: (model: F027b_EraseReservation) => model.cheked
});