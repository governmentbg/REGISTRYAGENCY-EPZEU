import { BaseProps } from 'Cnsys.UI.React';
import { EPZEUBaseComponent } from 'EPZEU.Core';
import { observer } from 'mobx-react';
import * as React from "react";
import { Mandate } from "../Models";
import { withRecordContainer } from './Fields'

@observer export class MandateUIImpl extends EPZEUBaseComponent<BaseProps, Mandate> {

    renderEdit(): JSX.Element {

        return (<>
            <div className="row">
                <div className="form-group col-sm-6">
                    {this.labelFor(m => m.date, 'CR_APP_EXPIRY_DATE_MANDATE_L')}
                    {this.dateFor(m => m.date)}
                </div>
            </div>
            <div className="row">
                <div className="form-group col-sm-12">
                    {this.labelFor(m => m.mandateTypeText, 'CR_APP_WAY_MANDATE_DETERMINED_L')}
                    {this.textAreaFor(m => m.mandateTypeText, null, 3)}

                </div>
            </div>
        </>)
    }

    renderDisplay(): JSX.Element {
        return (<>
            {(this.model.date) ?
                <>{this.getResource('CR_APP_EXPIRY_DATE_MANDATE_L')}: {this.dateDisplayFor(this.model.date, null, this.getResource('GL_YEAR_ABBREVIATION_L'))}</> : null}
            {this.model.date && this.model.mandateTypeText ? <>< br /></> : null}
            {(this.model.mandateTypeText) ?
                <span className="preserve-line-breaks">{this.getResource("CR_APP_WAY_DETERMINATE_MANDATE_L")}: {this.model.mandateTypeText}</span> : null}
        </>);
    }
}

export const MandateUI = withRecordContainer(MandateUIImpl);