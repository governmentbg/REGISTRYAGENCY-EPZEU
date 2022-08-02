﻿import * as React from "react";
import { EPZEUBaseComponent } from 'EPZEU.Core'
import { F217_PledgeExecutionClaim } from '../../Models/Fields/ModelsAutoGenerated'
import { withFieldRecordContainer, FieldContainerProps } from 'EPZEU.CR.Domain';
import { ObjectHelper } from "Cnsys.Core";

class F217_PledgeExecutionClaimUI extends EPZEUBaseComponent<FieldContainerProps, F217_PledgeExecutionClaim> {

    renderEdit(): JSX.Element {
        return <div className="row">
            <div className="form-group col-sm-12">
                {this.textAreaFor(m => m.text, null, 3)}
            </div>
        </div>
    }

    renderDisplay(): JSX.Element {
        return (<div>
            {!ObjectHelper.isArrayNullOrEmpty(this.model.text) ? this.model.text : null}
        </div>);
    }
}

export const F217_PledgeExecutionClaimFieldUI = withFieldRecordContainer(F217_PledgeExecutionClaimUI, {
    fieldLabelTextKey: "CR_F_217_L"
});
