﻿import * as React from "react";
import { EPZEUBaseComponent } from 'EPZEU.Core'
import { F307_Size307 } from '../../Models/Fields/ModelsAutoGenerated'
import { withFieldRecordContainer, RecordContainerProps } from 'EPZEU.CR.Domain';

class F307_Size307UI extends EPZEUBaseComponent<RecordContainerProps, F307_Size307>{

    renderEdit(): JSX.Element {
        return (<>
            <div className="row">
                <div className="form-group col-sm-6 col-lg-4">
                    {this.labelFor(x => x.quantityDue, 'CR_APP_AMOUNT_DUE_L')}
                    {this.textBoxFor(x => x.quantityDue)}
                </div>
                <div className="form-group col-sm-6 col-lg-4">
                    {this.labelFor(m => m.units, 'CR_APP_UNITS_L')}
                    {this.textBoxFor(x => x.units)}
                </div>
            </div>
        </>)
    }

    renderDisplay(): JSX.Element {
        return (<>
            {this.model.quantityDue && <>{this.model.quantityDue + " "}</>}
            {this.model.units && <>{this.model.units}</>}
        </>);
    }
}


export const F307_Size307FieldUI = withFieldRecordContainer(F307_Size307UI,
    {
        fieldLabelTextKey: "CR_F_307_L",
    });
