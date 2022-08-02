﻿import * as React from "react";
import { EPZEUBaseComponent } from 'EPZEU.Core'
import { F006v_MeansOfAchievingTheObjectives } from '../../Models/Fields/ModelsAutoGenerated'
import { withFieldRecordContainer, FieldContainerProps, SectionInfoUI } from 'EPZEU.CR.Domain';


class F006v_MeansOfAchievingTheObjectivesUI extends EPZEUBaseComponent<FieldContainerProps, F006v_MeansOfAchievingTheObjectives> {

    renderEdit(): JSX.Element {
        return (<>
            <div className="row">
                <div className="form-group col-12">
                    {this.textAreaFor(x => x.text)}
                </div>
            </div>
        </>)
    }

    renderDisplay(): JSX.Element {
        return (<>
            {this.model.text}
        </>);
    }
}

export const F006v_MeansOfAchievingTheObjectivesFieldUI = withFieldRecordContainer(F006v_MeansOfAchievingTheObjectivesUI, {
    fieldLabelTextKey: "CR_F_6v_L",
    isMandatoryField: true,
    fieldLabelFor: (model: F006v_MeansOfAchievingTheObjectives) => model.text
});