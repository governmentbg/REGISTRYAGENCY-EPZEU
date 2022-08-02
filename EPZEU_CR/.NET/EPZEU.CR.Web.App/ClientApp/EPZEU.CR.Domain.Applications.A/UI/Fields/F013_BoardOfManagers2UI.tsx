﻿import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { FieldContainerProps, MandateUI, withFieldContainer, SectionSubTitle } from 'EPZEU.CR.Domain';
import * as React from "react";
import { F013_BoardOfManagers2 } from '../../Models/Fields/ModelsAutoGenerated';
import { F01321_BoardManager2UI } from "./F01321_BoardManager2UI";

class F013_BoardOfManagers2UI extends EPZEUBaseComponent<FieldContainerProps, F013_BoardOfManagers2> {

    renderEdit(): JSX.Element {
        return (<>
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
            <MandateUI {...this.bind(m => m.managerMandate2)} />
            <SectionSubTitle subTitleTextKey={"CR_APP_MEMBERS_MANAGEMENT_BOARD_L"} />
            <F01321_BoardManager2UI {...this.bind(x => x.boardManager2List)} />
        </>);
    }

    renderDisplay(): JSX.Element {
        return (<>
            <MandateUI {...this.bind(m => m.managerMandate2)} />
            <F01321_BoardManager2UI {...this.bind(x => x.boardManager2List)} />
            <ValidationSummary {...this.props} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
        </>);
    }
}

export const F013_BoardOfManagers2FieldUI = withFieldContainer(F013_BoardOfManagers2UI, {
    fieldLabelTextKey: "CR_F_13_L"
});