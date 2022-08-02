﻿import * as React from "react";
import { EPZEUBaseComponent, ValidationSummaryStrategy } from 'EPZEU.Core'
import { F0530_BranchManager } from '../../Models/Fields/ModelsAutoGenerated'
import { withFieldSingleListRecordsContainer, ListRecordsContainerProps, PersonUI, PersonTypes, AddressUI } from 'EPZEU.CR.Domain';

class F053_BranchManagersUI extends EPZEUBaseComponent<ListRecordsContainerProps, F0530_BranchManager> {
    constructor(props: any) {
        super(props);
    }

    renderEdit(): JSX.Element {
        return (
            <>
                <PersonUI {...this.bind(m => m.person)} PersonType={PersonTypes.BranchManager} />
                <AddressUI {...this.bind(m => m.address)} />
            </>);
    }

    renderDisplay(): JSX.Element {
        return (
            <>
                <PersonUI {...this.bind(m => m.person)} PersonType={PersonTypes.BranchManager} />
                <AddressUI {...this.bind(m => m.address)} />
            </>
        );
    }
}

export const F053_BranchManagersFieldUI = withFieldSingleListRecordsContainer(F053_BranchManagersUI, F0530_BranchManager, {
    addButtonLabelKey: "CR_APP_ADD_MANAGER_L",
    listSelector: m => m.managersList,
    fieldLabelTextKey: "CR_F_53_L",
    hasAtLeastOneRecord: true,
    isMandatoryField: true,
    valSummaryStrategy: ValidationSummaryStrategy.excludeAllExcept,
    valSummaryRecursive: true,
    valSummaryPropNames: ["", "person."]
})