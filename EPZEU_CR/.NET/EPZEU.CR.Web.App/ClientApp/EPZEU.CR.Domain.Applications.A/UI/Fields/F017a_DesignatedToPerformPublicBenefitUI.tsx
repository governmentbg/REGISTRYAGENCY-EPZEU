﻿import { EPZEUBaseComponent } from 'EPZEU.Core';
import { ApplicationFormContextProviderProps, ProcessStates, RecordContainerProps, withApplicationFormContext, withFieldRecordContainer } from 'EPZEU.CR.Domain';
import * as React from "react";
import { F017a_DesignatedToPerformPublicBenefit } from '../../Models/Fields/ModelsAutoGenerated';

interface F017a_DesignatedToPerformPublicBenefitUIProps extends ApplicationFormContextProviderProps, RecordContainerProps {
}

class F017a_DesignatedToPerformPublicBenefitUI extends EPZEUBaseComponent<F017a_DesignatedToPerformPublicBenefitUIProps, F017a_DesignatedToPerformPublicBenefit> {

    renderEdit(): JSX.Element {
        return <>
            <div className="row">
                <div className="form-group col-12">
                    <div className="custom-control custom-checkbox">
                        {this.checkBoxFor(x => x.cheked, "GL_OK_L",
                            { className: "custom-control-input", disabled: this.props.applicationManager.processState == ProcessStates.ForChange && this.model.initialState.cheked === true ? true : false })}
                    </div>
                </div>
            </div>
        </>
    }

    renderDisplay(): JSX.Element {
        return (<>{this.model.cheked && this.getResource('GL_OK_L')}</>);
    }
}

export const F017a_DesignatedToPerformPublicBenefitFieldUI = withApplicationFormContext(withFieldRecordContainer(F017a_DesignatedToPerformPublicBenefitUI, {
    fieldLabelTextKey: "CR_F_17a_L",
    fieldLabelFor: (model: F017a_DesignatedToPerformPublicBenefit) => model.cheked,
    cantBeMarkedForErase: true
}));