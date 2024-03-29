﻿import { ObjectHelper } from "Cnsys.Core";
import { EPZEUBaseComponent, ValidationSummaryStrategy } from 'EPZEU.Core';
import { AddressUI, ListRecordsContainerProps, PersonTypes, PersonUI, withFieldSingleListRecordsContainer } from 'EPZEU.CR.Domain';
import { observer } from "mobx-react";
import * as React from "react";
import { F0410_Procurator } from '../../Models/Fields/ModelsAutoGenerated';

@observer class F041_ProcuratorsUI extends EPZEUBaseComponent<ListRecordsContainerProps, F0410_Procurator> {

    renderEdit(): JSX.Element {
        return (
            <>
                <PersonUI {...this.bind(m => m.person)} PersonType={PersonTypes.Procurator} />
                <AddressUI {...this.bind(m => m.address)} disabledCountry={false} />
                <div className="row">
                    <div className="form-group col-lg-6">
                        {this.labelFor(m => m.passport.number, 'CR_GL_ID_NUMBER_L')}
                        {this.textBoxFor(m => m.passport.number)}
                    </div>
                    <div className="form-group col-sm-auto">
                        {this.labelFor(m => m.passport.issuedDate, 'CR_GL_ISSUED_ON_L')}
                        {this.dateFor(m => m.passport.issuedDate)}
                    </div>
                    <div className="form-group col-sm col-lg">
                        {this.labelFor(m => m.passport.issuedFrom, 'CR_GL_ISSUED_BY_L')}
                        {this.textBoxFor(m => m.passport.issuedFrom)}
                    </div>
                </div>
            </>
        );
    }

    renderDisplay(): JSX.Element {
        return (
            <>
                <PersonUI {...this.bind(m => m.person)} PersonType={PersonTypes.Procurator} />
                <AddressUI {...this.bind(m => m.address)} disabledCountry={false} />
                {this.model.passport && (!ObjectHelper.isStringNullOrEmpty(this.model.passport.number) || !ObjectHelper.isNullOrUndefined(this.model.passport.issuedDate) || !ObjectHelper.isStringNullOrEmpty(this.model.passport.issuedFrom)) ?
                    <>
                        <div> {this.getResource('CR_GL_ID_L') + ":"} </div>
                        {!ObjectHelper.isStringNullOrEmpty(this.model.passport.number) ?
                            <>
                                {this.getResource('GL_NUMBER_ABBREVATION_L') + ": "}
                                {this.model.passport.number}
                            </>
                            : null}

                        {!ObjectHelper.isNullOrUndefined(this.model.passport.issuedDate) && !ObjectHelper.isStringNullOrEmpty(this.model.passport.number) ? ', ' : null}
                        {!ObjectHelper.isNullOrUndefined(this.model.passport.issuedDate) ?
                            <>
                                {this.getResource('CR_GL_ISSUED_ON_L') + ": "}
                                {this.dateDisplayFor(this.model.passport.issuedDate, null, this.getResource('GL_YEAR_ABBREVIATION_L'))}
                            </>
                            : null}
                        {(!ObjectHelper.isNullOrUndefined(this.model.passport.issuedDate) || !ObjectHelper.isStringNullOrEmpty(this.model.passport.number)) && !ObjectHelper.isStringNullOrEmpty(this.model.passport.issuedFrom) ? ', ' : null}
                        {!ObjectHelper.isStringNullOrEmpty(this.model.passport.issuedFrom) ?
                            <>
                                {this.getResource('CR_GL_ISSUED_BY_L') + ": "}
                                {this.model.passport.issuedFrom}
                            </>
                            : null}
                    </>
                    : null}
            </>
        );
    }
}

export const F041_ProcuratorsFieldUI = withFieldSingleListRecordsContainer(F041_ProcuratorsUI, F0410_Procurator, {
    addButtonLabelKey: "CR_APP_ADD_PROCURATOR_L",
    listSelector: m => m.procuratorsList,
    fieldLabelTextKey: "CR_F_41_L",
    hasAtLeastOneRecord: true,
    isMandatoryField: true,
    valSummaryStrategy: ValidationSummaryStrategy.excludeAllExcept,
    valSummaryRecursive: true,
    valSummaryPropNames: ["", "person."]
});