﻿import * as React from "react";
import { EPZEUBaseComponent, ValidationSummaryStrategy, Nomenclatures } from 'EPZEU.Core'
import { F01221_AdministrativeBody } from '../../Models/Fields/ModelsAutoGenerated'
import { PersonUI, PersonTypes, withListRecordsContainer, ListRecordsContainerProps, Person } from 'EPZEU.CR.Domain';

class F01221_AdministrativeBodyUIImpl extends EPZEUBaseComponent<ListRecordsContainerProps, F01221_AdministrativeBody> {

    renderEdit(): JSX.Element {
        return (
            <>
                <PersonUI {...this.bind(m => m.subject)} PersonType={PersonTypes.Director} />
            </>
        );
    }

    renderDisplay(): JSX.Element {
        return (
            <>
                <PersonUI {...this.bind(m => m.subject)} PersonType={PersonTypes.Director} />
            </>
        );
    }
}

export const F01221_AdministrativeBodyUI = withListRecordsContainer(F01221_AdministrativeBodyUIImpl, F01221_AdministrativeBody, {
    addButtonLabelKey: "CR_APP_ADD_ADMINISTRATIVE_BOARD_MEMBER_L",
    hasAtLeastOneRecord: true,
    valSummaryStrategy: ValidationSummaryStrategy.excludeAllExcept,
    valSummaryRecursive: true,
    valSummaryPropNames: ["", "subject."],
    newRecordCtor: () => {
        return Nomenclatures.getBGCountry().then(bgCountry => {
            var administrativeBody = new F01221_AdministrativeBody();

            administrativeBody.subject = new Person();
            administrativeBody.subject.countryCode = bgCountry.code;
            administrativeBody.subject.countryID = bgCountry.id;
            administrativeBody.subject.countryName = bgCountry.name;

            return administrativeBody;
        })
    }
})
