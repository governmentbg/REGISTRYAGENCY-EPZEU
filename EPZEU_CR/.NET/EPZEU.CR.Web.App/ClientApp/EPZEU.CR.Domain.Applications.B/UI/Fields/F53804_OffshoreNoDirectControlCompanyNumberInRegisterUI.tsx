﻿import { ObjectHelper } from 'Cnsys.Core';
import { EPZEUBaseComponent } from 'EPZEU.Core';
import { FieldContainerProps, withFieldRecordContainer } from 'EPZEU.CR.Domain';
import * as React from 'react';
import { F53804_OffshoreNoDirectControlCompanyNumberInRegister } from '../../Models/Fields/ModelsAutoGenerated';

class F53804_OffshoreNoDirectControlCompanyNumberInRegisterUIImpl extends EPZEUBaseComponent<FieldContainerProps, F53804_OffshoreNoDirectControlCompanyNumberInRegister> {

    renderEdit(): JSX.Element {
        return <>
            <div className="row">
                <div className="form-group col-12">
                    <label>{this.getResource("CR_APP_ENTRY_NO_REGISTER_L")}</label>
                    {this.textBoxFor(x => x.ndcNumberInRegister)}
                </div>
            </div>
        </>
    }

    renderDisplay(): JSX.Element {

        if (!ObjectHelper.isStringNullOrEmpty(this.model.ndcNumberInRegister))
            return <>{`${this.getResource("CR_APP_ENTRY_NO_REGISTER_L")}: ${this.model.ndcNumberInRegister}`}</>

        return null;
    }
}

export const F53804_OffshoreNoDirectControlCompanyNumberInRegisterFieldUI = withFieldRecordContainer(F53804_OffshoreNoDirectControlCompanyNumberInRegisterUIImpl, {
    fieldLabelFor: (model: F53804_OffshoreNoDirectControlCompanyNumberInRegister) => model.ndcNumberInRegister
});