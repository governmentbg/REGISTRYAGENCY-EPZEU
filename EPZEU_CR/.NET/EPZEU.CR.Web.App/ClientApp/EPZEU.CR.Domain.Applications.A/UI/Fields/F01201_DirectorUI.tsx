﻿import * as React from "react";
import { EPZEUBaseComponent, ValidationSummaryStrategy } from 'EPZEU.Core'
import { F01201_Director } from '../../Models/Fields/ModelsAutoGenerated'
import { PersonUI, PersonTypes, withListRecordsContainer, ListRecordsContainerProps } from 'EPZEU.CR.Domain';

class F01201_DirectorUIImpl extends EPZEUBaseComponent<ListRecordsContainerProps, F01201_Director> {

    renderEdit(): JSX.Element {
        return (
            <>
                <PersonUI {...this.bind(m => m.subject)} PersonType={PersonTypes.Supervisor} />
            </>
        );
    }

    renderDisplay(): JSX.Element {
        return (
            <>
                <PersonUI {...this.bind(m => m.subject)} PersonType={PersonTypes.Supervisor} />
            </>
        );
    }
}

export const F01201_DirectorUI = withListRecordsContainer(F01201_DirectorUIImpl, F01201_Director, {
    addButtonLabelKey: "CR_APP_ADD_BOARD_OF_DIRECTORS_MEMBER_L",
    hasAtLeastOneRecord: true,
    valSummaryStrategy: ValidationSummaryStrategy.excludeAllExcept,
    valSummaryRecursive: true,
    valSummaryPropNames: ["", "subject."],
})