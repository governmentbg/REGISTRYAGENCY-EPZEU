﻿import * as React from "react";
import { EPZEUBaseComponent, ValidationSummaryStrategy, Nomenclatures } from 'EPZEU.Core'
import { F01301_BoardManager } from '../../Models/Fields/ModelsAutoGenerated'
import { PersonUI, PersonTypes, withListRecordsContainer, ListRecordsContainerProps, Person } from 'EPZEU.CR.Domain';

class F01301_BoardManagerUIImpl extends EPZEUBaseComponent<ListRecordsContainerProps, F01301_BoardManager> {

    renderEdit(): JSX.Element {
        return <PersonUI {...this.bind(m => m.person)} PersonType={PersonTypes.BoardManager} />
    }

    renderDisplay(): JSX.Element {
        return <PersonUI {...this.bind(m => m.person)} PersonType={PersonTypes.BoardManager} />
    }
}

export const F01321_BoardManagerUI = withListRecordsContainer(F01301_BoardManagerUIImpl, F01301_BoardManager, {
    addButtonLabelKey: "CR_APP_ADD_MEMBER_TO_GOVERNING_BOARD_L",
    hasAtLeastOneRecord: true,
    valSummaryStrategy: ValidationSummaryStrategy.excludeAllExcept,
    valSummaryRecursive: true,
    valSummaryPropNames: ["", "person."],
        newRecordCtor: () => {
        return Nomenclatures.getBGCountry().then(bgCountry => {
            var boardManager = new F01301_BoardManager();

            boardManager.person = new Person();
            boardManager.person.countryCode = bgCountry.code;
            boardManager.person.countryID = bgCountry.id;
            boardManager.person.countryName = bgCountry.name;

            return boardManager;
        })
    }
})