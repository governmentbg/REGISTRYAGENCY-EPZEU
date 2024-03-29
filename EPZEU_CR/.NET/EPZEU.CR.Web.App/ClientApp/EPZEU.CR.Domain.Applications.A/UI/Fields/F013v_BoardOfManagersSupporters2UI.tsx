﻿import { EPZEUBaseComponent, Nomenclatures, ValidationSummary, ValidationSummaryErrorsPreviewUI, ValidationSummaryStrategy } from 'EPZEU.Core';
import { FieldContainerProps, ListRecordsContainerProps, MandateUI, withFieldContainer, Person } from 'EPZEU.CR.Domain';
import * as React from "react";
import { F013v_BoardOfManagersSupporters2, F01340_BoardManagersSupporter2 } from '../../Models/Fields/ModelsAutoGenerated';
import { F01340_BoardManagersSupporter2UI } from './F01340_BoardManagersSupporter2UI';

interface F01340_BoardManagersSupporter2UIProps extends FieldContainerProps {

}

const valSummaryPropNames = ["", "subject."];

class F013v_BoardOfManagersSupporters2UI extends EPZEUBaseComponent<F01340_BoardManagersSupporter2UIProps, F013v_BoardOfManagersSupporters2> {

    constructor(props?: ListRecordsContainerProps) {
        super(props);
    }

    renderEdit(): JSX.Element {
        return (
            <>
                <ValidationSummary {...this.props} propNames={valSummaryPropNames} strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true} />
                {
                    <F01340_BoardManagersSupporter2UI {...this.bind(x => x.f01340_BoardManagersSupporter2List)} newRecordCtor={() => {
                        return Nomenclatures.getBGCountry().then(bgCountry => {
                            var boardManagersSupporter2 = new F01340_BoardManagersSupporter2();

                            boardManagersSupporter2.subject = new Person();
                            boardManagersSupporter2.subject.countryCode = bgCountry.code;
                            boardManagersSupporter2.subject.countryID = bgCountry.id;
                            boardManagersSupporter2.subject.countryName = bgCountry.name;

                            return boardManagersSupporter2;
                        })
                    }}/>
                       }
            </>);
    }

    renderDisplay(): JSX.Element {
        return (
            <>
                {
                    <F01340_BoardManagersSupporter2UI {...this.bind(x => x.f01340_BoardManagersSupporter2List)} />
                }
                <ValidationSummaryErrorsPreviewUI errors={this.props.modelReference.getErrors()} />
            </>
        );
    }
}

export const F013v_BoardOfManagersSupporters2FieldUI = withFieldContainer(F013v_BoardOfManagersSupporters2UI, {
    fieldLabelTextKey: "CR_F_13v_L",
});
