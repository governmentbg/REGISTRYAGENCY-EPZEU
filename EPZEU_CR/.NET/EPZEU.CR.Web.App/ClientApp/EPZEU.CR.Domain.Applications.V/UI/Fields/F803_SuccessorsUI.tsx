﻿import { ObjectHelper } from "Cnsys.Core";
import { AsyncUIProps, withAsyncFrame } from "Cnsys.UI.React";
import { EPZEUBaseComponent, LegalForm, Nomenclatures, ValidationSummaryStrategy } from 'EPZEU.Core';
import { DeedSummary } from "EPZEU.CR.Core";
import { IApplicationWithFieldsFormManager, ListRecordsContainerProps, PersonTypes, PersonUI, withApplicationFormContext, withFieldSingleListRecordsContainer } from 'EPZEU.CR.Domain';
import { observable } from "mobx";
import { observer } from 'mobx-react';
import * as React from "react";
import { F8030_Successor803 } from '../../Models/Fields/ModelsAutoGenerated';

export interface IF803Manager extends IApplicationWithFieldsFormManager {
    personTypeForField803: PersonTypes;
}

interface F803_SuccessorProps extends ListRecordsContainerProps, AsyncUIProps {
    applicationManager?: IF803Manager;
    onUICChange?: (uic: string) => void;
}

@observer class F803_SuccessorUI extends EPZEUBaseComponent<F803_SuccessorProps, F8030_Successor803> {
    @observable private _legalForms: LegalForm[] = [];

    constructor(props: F803_SuccessorProps) {
        super(props);

        this.onSelectLegalForm = this.onSelectLegalForm.bind(this);
        this.onExtractCompany = this.onExtractCompany.bind(this);

        //инициализира се тук, а не в manager-a, защото като се добави нов запис не се минава през manager-a.
        //инициализира се само ако е в заявление V32, защото в V31 и V33 не се показва дропдауна с правните форми и трябва да си е null
        if (this.props.applicationManager.personTypeForField803 == PersonTypes.Successor803V32 && ObjectHelper.isStringNullOrEmpty(this.model.legalForm)) {
            this.model.legalForm = '-1';
        }

        Nomenclatures.getLegalForms().then((legalForms: LegalForm[]) => {
            this._legalForms = legalForms.sort((a: LegalForm, b: LegalForm) => a.name > b.name ? 1 : -1);
        });
    }

    renderEdit(): JSX.Element {
        return (<>
            <PersonUI {...this.bind(m => m.subject, 'successor')} PersonType={this.props.applicationManager.personTypeForField803} onUICChange={this.props.onUICChange}
                onExtractCompany={this.onExtractCompany} />
            {(this.props.applicationManager.personTypeForField803 == PersonTypes.Successor803V32) &&
                <div className="row">
                    <div className="form-group col">
                        <select value={this.model.legalForm ? this.model.legalForm : '-1'} onChange={this.onSelectLegalForm} className="form-control">
                            <option key={0} value="-1">{this.getResource('CR_APP_CHOOSE_LEGAL_FORM_FOR_FOUNDING_COMPANY_L')}</option>
                            {this._legalForms.map((legalForm, i) => <option value={legalForm.id} key={ObjectHelper.newGuid()}>{legalForm.name}</option>)}
                        </select>
                    </div>
                </div>
            }
        </>)
    }

    renderDisplay(): JSX.Element {
        return (<PersonUI {...this.bind(m => m.subject, 'successor')} PersonType={this.props.applicationManager.personTypeForField803} />);
    }

    private onSelectLegalForm(e: any): void {
        this.model.legalForm = e.target.value;
    }

    private onExtractCompany(deed?: DeedSummary): void {
        if (deed && deed.legalForm)
            this.model.legalForm = deed.legalForm.toString();
        else
            this.model.legalForm = '-1';
    }
}

export const F803_SuccessorFieldUI = withFieldSingleListRecordsContainer(withAsyncFrame(withApplicationFormContext(F803_SuccessorUI)), F8030_Successor803, {
    listSelector: m => m.successorList,
    fieldLabelTextKey: "CR_F_803_L",
    hasOnlyOneRecord: true,
    isMandatoryField: true,
    valSummaryStrategy: ValidationSummaryStrategy.excludeAllExcept,
    valSummaryRecursive: true,
    valSummaryPropNames: ["", "subject"]
});

export const F803_SuccessorFieldListUI = withFieldSingleListRecordsContainer(withAsyncFrame(withApplicationFormContext(F803_SuccessorUI)), F8030_Successor803, {
    listSelector: m => m.successorList,
    addButtonLabelKey: 'CR_APP_ADD_SUCCESSOR_L',
    fieldLabelTextKey: "CR_F_803_L",
    hasAtLeastOneRecord: true,
    isMandatoryField: true,
    valSummaryStrategy: ValidationSummaryStrategy.excludeAllExcept,
    valSummaryRecursive: true,
    valSummaryPropNames: ["", "subject"]
});