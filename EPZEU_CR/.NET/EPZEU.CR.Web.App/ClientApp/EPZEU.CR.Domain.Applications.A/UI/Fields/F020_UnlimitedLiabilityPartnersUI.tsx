﻿import * as React from "react";
import { EPZEUBaseComponent, ValidationSummaryStrategy } from 'EPZEU.Core'
import { F0200_UnlimitedLiabilityPartner } from '../../Models/Fields/ModelsAutoGenerated'
import { withFieldSingleListRecordsContainer, ListRecordsContainerProps, PersonUI, PersonTypes, SectionInfoUI, AddressUI } from 'EPZEU.CR.Domain';

class F0200_UnlimitedLiabilityPartnerUI extends EPZEUBaseComponent<ListRecordsContainerProps, F0200_UnlimitedLiabilityPartner> {

    renderEdit(): JSX.Element {
        return (
            <>                
                <PersonUI {...this.bind(m => m.subject)} PersonType={PersonTypes.UnlimitedLiabilityPartner} />
                <AddressUI {...this.bind(m => m.address)} />
            </>);
    }

    renderDisplay(): JSX.Element {
        return (
            <>
                <PersonUI {...this.bind(m => m.subject)} PersonType={PersonTypes.UnlimitedLiabilityPartner} />               
                <AddressUI {...this.bind(m => m.address)} />
            </>
        );
    }
}
export const F020_UnlimitedLiabilityPartnersFieldUI = withFieldSingleListRecordsContainer(F0200_UnlimitedLiabilityPartnerUI, F0200_UnlimitedLiabilityPartner, {
    addButtonLabelKey: "CR_APP_ADD_PARTNER_L",
    listSelector: m => m.unlimitedLiabilityPartnerList,
    fieldLabelTextKey: "CR_F_20_L",
    hasAtLeastOneRecord: true,
    isMandatoryField: true,
    valSummaryStrategy: ValidationSummaryStrategy.excludeAllExcept,
    valSummaryRecursive: true,
    valSummaryPropNames: ["", "subject."]
})