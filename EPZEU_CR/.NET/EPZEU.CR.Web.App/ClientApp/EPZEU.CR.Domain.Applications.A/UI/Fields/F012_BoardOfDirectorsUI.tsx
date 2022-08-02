﻿import { EPZEUBaseComponent, Nomenclatures, ValidationSummaryErrors, ValidationSummaryErrorsPreviewUI } from 'EPZEU.Core';
import { FieldContainerProps, MandateUI, Person, withFieldContainer, SectionSubTitle } from 'EPZEU.CR.Domain';
import * as React from "react";
import { F01201_Director, F012_BoardOfDirectors } from '../../Models/Fields/ModelsAutoGenerated';
import { F01201_DirectorUI } from "./F01201_DirectorUI";

interface F012_BoardOfDirectorsUIProps extends FieldContainerProps {
    showDirectorsList?: boolean;
}

class F012_BoardOfDirectorsUI extends EPZEUBaseComponent<F012_BoardOfDirectorsUIProps, F012_BoardOfDirectors> {

    renderEdit(): JSX.Element {
        return (
            <>
                <ValidationSummaryErrors errors={this.props.modelReference.getErrors()} />
                <MandateUI {...this.bind(m => m.boardOfDirectorsMandate)} />
                {this.props.showDirectorsList ?
                    <>
                        <SectionSubTitle subTitleTextKey={"CR_APP_MEMBERS_BOARD_OF_DIRECTORS_L"} />
                        <F01201_DirectorUI {...this.bind(x => x.directorList)} newRecordCtor={() => {
                            return Nomenclatures.getBGCountry().then(bgCountry => {
                                var director = new F01201_Director();

                                director.subject = new Person();
                                director.subject.countryCode = bgCountry.code;
                                director.subject.countryID = bgCountry.id;
                                director.subject.countryName = bgCountry.name;

                                return director;
                            })
                        }} /></>
                    : null
                }
            </>);
    }

    renderDisplay(): JSX.Element {
        return (
            <>
                <ValidationSummaryErrorsPreviewUI errors={this.props.modelReference.getErrors()} />
                <MandateUI {...this.bind(m => m.boardOfDirectorsMandate)} />
                {this.props.showDirectorsList ?
                    <F01201_DirectorUI {...this.bind(x => x.directorList)} />
                    : null}
            </>
        );
    }
}

export const F012_BoardOfDirectorsFieldUI = withFieldContainer(F012_BoardOfDirectorsUI, {
    fieldLabelTextKey: "CR_F_12_L",
});