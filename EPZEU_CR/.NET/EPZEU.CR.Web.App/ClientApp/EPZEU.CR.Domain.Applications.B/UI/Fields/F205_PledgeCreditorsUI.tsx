﻿import * as React from "react";
import { EPZEUBaseComponent, ValidationSummaryStrategy } from 'EPZEU.Core'
import { F2050_PledgeCreditor } from '../../Models/Fields/ModelsAutoGenerated'
import { withFieldSingleListRecordsContainer, ListRecordsContainerProps, PersonUI, AddressUI, PersonTypes } from 'EPZEU.CR.Domain';

class F205_PledgeCreditorsUI extends EPZEUBaseComponent<ListRecordsContainerProps, F2050_PledgeCreditor> {
    constructor(props: any) {
        super(props);
    }

    renderEdit(): JSX.Element {
        return (
            <>
                <PersonUI {...this.bind(m => m.subject)} PersonType={PersonTypes.Pledgor} />
                <AddressUI {...this.bind(m => m.address)} />
            </>);
    }

    renderDisplay(): JSX.Element {
        return (
            <>
                <PersonUI {...this.bind(m => m.subject)} PersonType={PersonTypes.Pledgor} />
                <AddressUI {...this.bind(m => m.address)} />
            </>
        );
    }
}

export const F205_PledgeCreditorsFieldUI = withFieldSingleListRecordsContainer(F205_PledgeCreditorsUI, F2050_PledgeCreditor, {
    listSelector: m => m.pledgeCreditorsList,
    addButtonLabelKey: "CR_APP_ADD_OBLIGEE_L",
    fieldLabelTextKey: "CR_F_205_L",
    hasAtLeastOneRecord: true,
    isMandatoryField: true,
    valSummaryRecursive: true,
    valSummaryStrategy: ValidationSummaryStrategy.excludeAllExcept,
    valSummaryPropNames: ["", "subject."]
})