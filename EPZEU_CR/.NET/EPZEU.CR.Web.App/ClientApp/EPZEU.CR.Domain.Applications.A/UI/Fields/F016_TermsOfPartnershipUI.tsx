﻿import { EPZEUBaseComponent } from 'EPZEU.Core';
import { FieldContainerProps, withFieldRecordContainer } from 'EPZEU.CR.Domain';
import * as React from "react";
import { F016_TermsOfPartnership } from '../../Models/Fields/ModelsAutoGenerated';

interface F016_TermsOfPartnershipProps extends FieldContainerProps {
    showTermType?: boolean;
}

class F016_TermsOfPartnershipUI extends EPZEUBaseComponent<F016_TermsOfPartnershipProps, F016_TermsOfPartnership> {

    renderEdit(): JSX.Element {
        return (
            <>
                <div className="row">
                    <div className="form-group col-sm-6">
                        {this.labelFor(m => m.date, 'CR_APP_EXPIRY_DATE_L')}
                        {this.dateFor(x => x.date)}
                    </div>
                </div>
                {this.props.showTermType === true ? <div className="row">
                    <div className="form-group col-sm-12">
                        {this.labelFor(m => m.termType, 'CR_APP_WAY_TERM_OF_COMPANY_SET_L')}
                        {this.textAreaFor(m => m.termType, null, 3)}
                    </div>
                </div> : null}
            </>
        )
    }

    renderDisplay(): JSX.Element {
        return (<>
            {this.model.date &&
                <>{this.getResource('CR_APP_EXPIRY_DATE_L')}: {this.dateDisplayFor(this.model.date, null, this.getResource('GL_YEAR_ABBREVIATION_L'))}</>}
            {this.model.date && this.props.showTermType == true && this.model.termType && <>< br /></>}
            {this.props.showTermType == true && this.model.termType &&
                <span className="preserve-line-breaks">{this.getResource("CR_APP_WAY_DETERMINATE_TERM_L")}: {this.model.termType} </span>}
        </>);
    }
}

export const F016_TermsOfPartnershipFieldUI = withFieldRecordContainer(F016_TermsOfPartnershipUI, {
    fieldLabelTextKey: "CR_F_16_L",
    fieldLabelFor: (model: F016_TermsOfPartnership) => model.date
});