﻿import { AsyncUIProps, withAsyncFrame } from "Cnsys.UI.React";
import { EPZEUBaseComponent, ValidationSummaryStrategy } from 'EPZEU.Core';
import { ListRecordsContainerProps, PersonTypes, PersonUI, withFieldSingleListRecordsContainer } from 'EPZEU.CR.Domain';
import { observer } from 'mobx-react';
import * as React from "react";
import { F7020_TransformingCompany } from '../../Models/Fields/ModelsAutoGenerated';

interface F702_TransformingCompanyProps extends ListRecordsContainerProps, AsyncUIProps {
    onUICChange?: (uic: string) => void;
}

@observer class F702_TransformingCompanyUI extends EPZEUBaseComponent<F702_TransformingCompanyProps, F7020_TransformingCompany> {

    renderEdit(): JSX.Element {
        return (<>
            <PersonUI {...this.bind(m => m.subject, 'transformingCompany')} PersonType={PersonTypes.TransformingCompany} onUICChange={this.props.onUICChange} />
        </>)
    }

    renderDisplay(): JSX.Element {
        return (<>
            <PersonUI {...this.bind(m => m.subject, 'transformingCompany')} PersonType={PersonTypes.TransformingCompany} />
        </>);
    }
}

export const F702_TransformingCompanyFieldUI = withFieldSingleListRecordsContainer(withAsyncFrame(F702_TransformingCompanyUI), F7020_TransformingCompany, {
    listSelector: m => m.transformingCompanyList,
    addButtonLabelKey: 'CR_APP_ADD_COMPANY_L',
    fieldLabelTextKey: "CR_F_702_L",
    hasOnlyOneRecord: true,
    isMandatoryField: true,
    valSummaryStrategy: ValidationSummaryStrategy.excludeAllExcept,
    valSummaryRecursive: true,
    valSummaryPropNames: ["", "subject"]
});

export const F702_TransformingCompanyFieldListUI = withFieldSingleListRecordsContainer(withAsyncFrame(F702_TransformingCompanyUI), F7020_TransformingCompany, {
    listSelector: m => m.transformingCompanyList,
    addButtonLabelKey: 'CR_APP_ADD_COMPANY_L',
    fieldLabelTextKey: "CR_F_702_L",
    hasAtLeastOneRecord: true,
    isMandatoryField: true,
    valSummaryStrategy: ValidationSummaryStrategy.excludeAllExcept,
    valSummaryRecursive: true,
    valSummaryPropNames: ["", "subject"]
});