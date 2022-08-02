﻿import { EPZEUBaseComponent, attributesClassFormControlMaxL13TextRight } from 'EPZEU.Core';
import { FieldContainerProps, withFieldRecordContainer } from 'EPZEU.CR.Domain';
import * as React from "react";
import { F025_SharePaymentResponsibility } from '../../Models/Fields/ModelsAutoGenerated';

class F025_SharePaymentResponsibilityUI extends EPZEUBaseComponent<FieldContainerProps, F025_SharePaymentResponsibility> {

    renderEdit(): JSX.Element {
        return <>
            <div className="row">
                <div className="form-group col-sm-6 col-lg-4">
                    <div className="form-row">
                        <div className="col">
                            {this.textBoxFor(x => x.text, attributesClassFormControlMaxL13TextRight, null)}
                        </div>
                        <div className="col-auto">
                            <div className="col-form-label">{this.getResource("GL_BGN_ABBRAVETION_L")}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }

    renderDisplay(): JSX.Element {
        return (<>{this.model.text && <>{this.model.text} {this.getResource('GL_BGN_ABBRAVETION_L')}</>}</>);
    }
}

export const F025_SharePaymentResponsibilityFieldUI = withFieldRecordContainer(F025_SharePaymentResponsibilityUI, {
    fieldLabelTextKey: "CR_F_25_L",
});