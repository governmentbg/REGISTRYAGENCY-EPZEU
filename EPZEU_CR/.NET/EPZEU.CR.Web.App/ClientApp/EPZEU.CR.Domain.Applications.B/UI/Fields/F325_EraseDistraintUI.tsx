﻿import { EPZEUBaseComponent } from 'EPZEU.Core';
import { ApplicationFormContextProps, FieldContainerProps, ProcessStates, withApplicationFormContext, withFieldRecordContainer } from 'EPZEU.CR.Domain';
import * as React from "react";
import { F325_EraseDistraint } from '../../Models/Fields/ModelsAutoGenerated';

interface F325_EraseDistraintProps extends FieldContainerProps, ApplicationFormContextProps {
}

class F325_EraseDistraintUI extends EPZEUBaseComponent<F325_EraseDistraintProps, F325_EraseDistraint> {

    renderEdit(): JSX.Element {
        return <>
            <div className="row">
                <div className="form-group col-12">
                    <div className="custom-control custom-checkbox">
                        {this.checkBoxFor(x => x.checked, "GL_DELETED_L",
                            { className: "custom-control-input", disabled: this.props.applicationManager.processState == ProcessStates.ForChange && this.model.initialState.checked === true ? true : false })}
                    </div>
                </div>
            </div>
        </>
    }

    renderDisplay(): JSX.Element {
        return (<>{
            this.model.checked && this.getResource('GL_OK_L')}</>);
    }
}

export const F325_EraseDistraintFieldUI = withFieldRecordContainer(withApplicationFormContext(F325_EraseDistraintUI), {
    fieldLabelTextKey: "CR_F_325_L",
    fieldLabelFor: (model: F325_EraseDistraint) => model.checked
});