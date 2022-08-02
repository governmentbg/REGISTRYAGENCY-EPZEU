﻿import { EPZEUBaseComponent, Nomenclatures, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { IndentTypes, ListRecordsContainerProps, Person, PersonTypes, PersonUI, ValidatorHelpers, withFieldSingleListRecordsContainer, SectionSubTitle } from 'EPZEU.CR.Domain';
import { observer } from "mobx-react";
import * as React from "react";
import { F0100_Representative } from '../../Models/Fields/ModelsAutoGenerated';

const valSummarySubject = ["", "subject."];

@observer class F010_RepresentativesUI extends EPZEUBaseComponent<ListRecordsContainerProps, F0100_Representative> {

    constructor(props: ListRecordsContainerProps) {
        super(props);

        this.handleForeignTraderChange = this.handleForeignTraderChange.bind(this);
    }

    renderEdit(): JSX.Element {
        let isPersonUIActive = this.model.subject.indentType == IndentTypes.Bulstat || this.model.subject.indentType == IndentTypes.UIC || this.model.subject.isForeignTrader;

        return (
            <>
                <PersonUI {...this.bind(m => m.subject)} PersonType={PersonTypes.Representative} onHasForeignTraderCheckChanged={this.handleForeignTraderChange} />
                <SectionSubTitle subTitleTextKey={"CR_APP_REPRESENTING_LEGAL_ENTITY_L"} />
                <ValidationSummary {...this.bind(x => x.person)} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
                <PersonUI {...this.bind(m => m.person)} PersonType={PersonTypes.RepresentativePerson} disablePersonUI={!isPersonUIActive} />
            </>);
    }

    renderDisplay(): JSX.Element {
        let isPersonUIActive = this.model.subject.indentType == IndentTypes.Bulstat || this.model.subject.indentType == IndentTypes.UIC || this.model.subject.isForeignTrader;

        return (
            <>
                <PersonUI {...this.bind(m => m.subject)} PersonType={PersonTypes.Representative} />
                {this.model.person && !ValidatorHelpers.isEmptyBasePerson(this.model.person.name, this.model.person.indent, this.model.person.countryID, this.model.person.isForeignTrader) ?
                    <>
                        {this.getResource('CR_APP_REPRESENTING_LEGAL_ENTITY_L')}: </> : null}
                <PersonUI {...this.bind(m => m.person)} PersonType={PersonTypes.RepresentativePerson} disablePersonUI={!isPersonUIActive} />
            </>
        );
    }

    handleForeignTraderChange() {
        if (!this.model.subject.isForeignTrader && this.model.subject.indentType != IndentTypes.Bulstat && this.model.subject.indentType != IndentTypes.UIC)
            this.model.person = new Person();
    }
}

export const F010_RepresentativesFieldUI = withFieldSingleListRecordsContainer(F010_RepresentativesUI, F0100_Representative, {
    addButtonLabelKey: "CR_APP_ADD_REPRESENTATIVE_L",
    listSelector: m => m.representativeList,
    fieldLabelTextKey: "CR_F_10_L",
    hasAtLeastOneRecord: true,
    isMandatoryField: true,
    valSummaryStrategy: ValidationSummaryStrategy.excludeAllExcept,
    valSummaryRecursive: true,
    valSummaryPropNames: valSummarySubject,
    newRecordCtor: () => {
        return Nomenclatures.getBGCountry().then(bgCountry => {
            var rep = new F0100_Representative();

            rep.subject = new Person();
            rep.subject.countryCode = bgCountry.code;
            rep.subject.countryID = bgCountry.id;
            rep.subject.countryName = bgCountry.name;

            return rep;
        })
    }
})