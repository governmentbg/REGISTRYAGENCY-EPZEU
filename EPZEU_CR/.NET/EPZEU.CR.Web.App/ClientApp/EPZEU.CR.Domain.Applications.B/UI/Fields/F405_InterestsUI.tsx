﻿import { EPZEUBaseComponent } from 'EPZEU.Core';
import { FieldContainerProps, withFieldRecordContainer } from 'EPZEU.CR.Domain';
import { observer } from 'mobx-react';
import * as React from "react";
import { F405_Interests } from '../../Models/Fields/ModelsAutoGenerated';

@observer class F405_InterestsUI extends EPZEUBaseComponent<FieldContainerProps, F405_Interests> {

    renderEdit(): JSX.Element {
        return (
            <div className="row">
                <div className="form-group col-sm-6 col-lg-4">
                    <div className="form-row">
                        <div className="col">
                            {this.textBoxFor(x => x.text, { className: "form-control text-right" })}
                        </div>
                        <div className="col-auto">
                            <label className="col-form-label">{this.getResource('GL_PERCENT_ABBRAVETION_L')}</label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderDisplay(): JSX.Element {
        return (<>{this.model.text && <>{this.model.text} {this.getResource('GL_PERCENT_ABBRAVETION_L')}</>}</>);
    }
}

export const F405_InterestsFieldUI = withFieldRecordContainer(F405_InterestsUI, {
    fieldLabelTextKey: "CR_F_405_L",
    isMandatoryField: true
});