﻿import * as React from "react";
import { EPZEUBaseComponent } from 'EPZEU.Core'
import { F324_StopExecutionOverProperty } from '../../Models/Fields/ModelsAutoGenerated'
import { withFieldRecordContainer, FieldContainerProps } from 'EPZEU.CR.Domain';

class F324_StopExecutionOverPropertyUI extends EPZEUBaseComponent<FieldContainerProps, F324_StopExecutionOverProperty> {

    renderEdit(): JSX.Element {
        return (<>
            <>
                <div className="row">
                    <div className="form-group col">
                        {this.textAreaFor(m => m.text)}
                    </div>
                </div>
            </>
        </>)
    }

    renderDisplay(): JSX.Element {
        return (<>
            {this.model.text}</>
        );
    }
}

export const F324_StopExecutionOverPropertyFieldUI = withFieldRecordContainer(F324_StopExecutionOverPropertyUI, {
    fieldLabelTextKey: "CR_F_324_L",
    fieldLabelFor: (model: F324_StopExecutionOverProperty) => model.text
});