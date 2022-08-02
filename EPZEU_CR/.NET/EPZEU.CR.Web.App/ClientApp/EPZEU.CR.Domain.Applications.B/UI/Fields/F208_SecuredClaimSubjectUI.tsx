﻿import { EPZEUBaseComponent } from 'EPZEU.Core';
import { FieldContainerProps, withFieldRecordContainer } from 'EPZEU.CR.Domain';
import { observer } from "mobx-react";
import * as React from "react";
import { F208_SecuredClaimSubject } from '../../Models/Fields/ModelsAutoGenerated';

@observer class F208_SecuredClaimSubjectUI extends EPZEUBaseComponent<FieldContainerProps, F208_SecuredClaimSubject> {

    renderEdit(): JSX.Element {
        return <div className="row">
                <div className="form-group col-12">
                    <div className="custom-control custom-checkbox">{this.checkBoxFor(x => x.givingMoney, "CR_APP_00035_L")}</div>
                    <div className="custom-control custom-checkbox">{this.checkBoxFor(x => x.notDoingActions, "CR_APP_00043_L")}</div>
                    <div className="custom-control custom-checkbox">{this.checkBoxFor(x => x.givingThing, "CR_APP_00042_L")}</div>
                    <div className="custom-control custom-checkbox">{this.checkBoxFor(x => x.doingActions, "CR_APP_00044_L")}</div>
                </div>
        </div>
    }

    renderDisplay(): JSX.Element {
        return (
            <>
                {this.model.givingMoney ? <div>{this.getResource("CR_APP_00035_L")}</div> : null}
                {this.model.notDoingActions ? <div>{this.getResource("CR_APP_00043_L")}</div> : null}
                {this.model.givingThing ? <div>{this.getResource("CR_APP_00042_L")}</div> : null}
                {this.model.doingActions ? <div>{this.getResource("CR_APP_00044_L")}</div> : null}
            </>);
    }
}

export const F208_SecuredClaimSubjectFieldUI = withFieldRecordContainer(F208_SecuredClaimSubjectUI, {
    fieldLabelTextKey: "CR_F_208_L",
    isMandatoryField: true,
});