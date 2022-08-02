﻿import * as React from "react";
import { EPZEUBaseComponent, ValidationSummaryStrategy, Nomenclatures } from 'EPZEU.Core';
import { ListRecordsContainerProps, PersonTypes, PersonUI, withFieldSingleListRecordsContainer, Person } from 'EPZEU.CR.Domain';
import { F0103_Representative103 } from '../../Models/Fields/ModelsAutoGenerated';

class F0103_Representatives103UI extends EPZEUBaseComponent<ListRecordsContainerProps, F0103_Representative103> {

    renderEdit(): JSX.Element {
        return (
            <>
                <PersonUI {...this.bind(m => m.person)} PersonType={PersonTypes.Representative103} />
            </>);
    }

    renderDisplay(): JSX.Element {
        return (
            <>
                <PersonUI {...this.bind(m => m.person)} PersonType={PersonTypes.Representative103} />
            </>
        );
    }
}
export const F0103_Representatives103FieldUI = withFieldSingleListRecordsContainer(F0103_Representatives103UI, F0103_Representative103, {
    addButtonLabelKey: "CR_APP_ADD_REPRESENTATIVE_PERSON_L",
    listSelector: m => m.representativeList,
    fieldLabelTextKey: "CR_F_10a_L",
    isMandatoryField: true,
    hasAtLeastOneRecord: true,
    valSummaryStrategy: ValidationSummaryStrategy.excludeAllExcept,
    valSummaryRecursive: true,
    valSummaryPropNames: ["", "person."],
    newRecordCtor: () => {
        return Nomenclatures.getBGCountry().then(bgCountry => {
            var manager = new F0103_Representative103();

            manager.person = new Person();
            manager.person.countryCode = bgCountry.code;
            manager.person.countryID = bgCountry.id;
            manager.person.countryName = bgCountry.name;

            return manager;
        })
    }
})