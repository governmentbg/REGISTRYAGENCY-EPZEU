﻿import { EPZEUBaseComponent, ValidationSummaryStrategy } from 'EPZEU.Core';
import { AddressUI, DomainModelHepler, ListRecordsContainerProps, PersonTypes, PersonUI, withFieldSingleListRecordsContainer } from 'EPZEU.CR.Domain';
import * as React from "react";
import { F0201_UnlimitedLiabilityPartnerEUIE } from '../../Models/Fields/ModelsAutoGenerated';

class F020a_UnlimitedLiabilityPartnersEUIEUI extends EPZEUBaseComponent<ListRecordsContainerProps, F0201_UnlimitedLiabilityPartnerEUIE> {

    renderEdit(): JSX.Element {
        return (<>
            <PersonUI {...this.bind(m => m.subject)} PersonType={PersonTypes.UnlimitedLiabilityPartnersEUIE} />
            <div className="row">
                <div className="form-group col-md-6">
                    {this.labelFor(m => m.subject.competentAuthorityForRegistration, 'CR_GL_AUTHORITY_REGISTRATION_L')}
                    {this.textBoxFor(m => m.subject.competentAuthorityForRegistration)}
                </div>
                <div className="form-group col-md-6">
                    {this.labelFor(m => m.subject.registrationNumber, 'CR_GL_REGISTRATION_NUMBER_L')}
                    {this.textBoxFor(m => m.subject.registrationNumber)}
                </div>
            </div>
            <AddressUI {...this.bind(m => m.address)} />
            <div className="row">
                <div className="form-group col-sm-6">
                    {this.labelFor(x => x.date, "CR_APP_DATE_OF_ACCEPTANCE_EOII_L")}
                    {this.dateFor(x => x.date)}
                </div>
            </div>
            <div className="row">
                <div className="form-group col-12">
                    <div className="custom-control custom-checkbox">
                        {this.checkBoxFor(x => x.noObligationsEUIE, "CR_APP_00021_L")}
                    </div>
                </div>
            </div>
        </>);
    }

    renderDisplay(): JSX.Element {
        return (<>
            <PersonUI {...this.bind(m => m.subject)} PersonType={PersonTypes.UnlimitedLiabilityPartnersEUIE} />
            {!DomainModelHepler.isObjectEmpty(this.model.address) ? <AddressUI {...this.bind(m => m.address)} /> : null}
            {this.model.date && <>< br />{this.getResource("CR_APP_DATE_OF_ACCEPTANCE_EOII_L") + ": " + this.dateDisplayFor(this.model.date, null, this.getResource('GL_YEAR_ABBREVIATION_L'))}</>}
            {this.model.noObligationsEUIE && <>< br />{this.getResource('CR_APP_00021_L')} </>}
        </>);
    }
}

export const F020a_UnlimitedLiabilityPartnersEUIEFieldUI = withFieldSingleListRecordsContainer(F020a_UnlimitedLiabilityPartnersEUIEUI, F0201_UnlimitedLiabilityPartnerEUIE, {
    addButtonLabelKey: "CR_APP_ADD_UNLIMITED_RESPONSIBLE_MEMBER_L",
    listSelector: m => m.unlimitedLiabilityPartnerEUIEList,
    fieldLabelTextKey: "CR_F_20a_L",
    hasAtLeastOneRecord: true,
    valSummaryStrategy: ValidationSummaryStrategy.excludeAllExcept,
    valSummaryRecursive: true,
    valSummaryPropNames: ["", "subject."]
})