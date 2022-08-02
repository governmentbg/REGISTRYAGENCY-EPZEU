﻿import { attributesClassFormControlMaxL10, EPZEUBaseComponent, ValidationSummaryStrategy } from 'EPZEU.Core';
import * as React from "react";
import { InputInfoUI } from ".";
import { AddressUI } from '../';
import { Applicant, IndentTypes } from '../Models/ModelsAutoGenerated';
import { ListItemsContainerProps } from "./ListItemsContainer";
import { withSingleItemListContainer } from "./SimpleListItemsContainer";
import { ObjectHelper } from 'Cnsys.Core';

var infoTextKeys1 = ["GL_00001_I"];

export class ApplicantUIImpl extends EPZEUBaseComponent<ListItemsContainerProps, Applicant> {

    renderEdit(): JSX.Element {
        return (
            <>
                <div className="field-container">
                    <div className="row">
                        <div className="form-group col">
                            {this.labelFor(m => m.person.name, 'GL_PERSON_NAME_L', { className: 'field-title field-title--form required-field' })}
                            {this.textBoxFor(m => m.person.name)}
                        </div>
                    </div>
                </div>
                <div className="field-container">
                    <div className="row">
                        <div className="form-group col">
                            {this.labelFor(m => m.person.indent, 'CR_GL_00003_L', { className: 'field-title field-title--form required-field' })}
                            {this.textBoxFor(m => m.person.indent, attributesClassFormControlMaxL10)}
                            <InputInfoUI infoTextKey={infoTextKeys1} />
                        </div>
                    </div>
                </div>
                <div className="field-container">
                    <div className="row">
                        <div className="col-12">
                            {this.labelFor(m => m.birthPlace, 'GL_BIRTHPLACE_L', { className: 'field-title field-title--form' })}
                        </div>
                        <div className="form-group col-sm-6">
                            {this.labelFor(m => m.birthPlace.country, 'GL_COUNTRY_L')}
                            {this.textBoxFor(m => m.birthPlace.country)}
                        </div>
                        <div className="form-group col-sm-6">
                            {this.labelFor(m => m.birthPlace.place, 'GL_PLACE_L')}
                            {this.textBoxFor(m => m.birthPlace.place)}
                        </div>
                    </div>
                </div>
                <div className="field-container">
                    <div className="row">
                        <div className="col-12">
                            <label className="field-title field-title--form">
                                {this.getResource('GL_PERMANENT_ADDRESS_L')}
                            </label>
                        </div>
                    </div>
                    <AddressUI {...this.bind(m => m.address)} />
                </div>

            </>);
    }

    renderDisplay(): JSX.Element {
        return (
            <>
                {
                    this.model.person
                        ? < div className="field-container">
                            <div className="record-container record-container--preview">
                                <div className="record-container record-container--preview">
                                    <p className='field-text'>
                                        {this.model.person.name && <>{this.model.person.name}</>}
                                        {(this.model.person.name && this.model.person.indent) && <>, </>}
                                        {this.model.person.indent && <>{this.getResource(getIdentResourceKeyForDisplay(this.model.person.indentType))}: {this.model.person.indent}</>}
                                    </p>
                                </div>
                            </div>
                        </div>
                        : null
                }
                {
                    (this.model.birthPlace && (this.model.birthPlace.place || this.model.birthPlace.country))
                        ? <div className="field-container">
                            <div className="record-container record-container--preview">
                                <h3 className="field-title field-title--preview">
                                    {this.getResource('GL_BIRTHPLACE_L')}
                                </h3>
                                <p>
                                    {!ObjectHelper.isStringNullOrEmpty(this.model.birthPlace.country) && <>{this.getResource('GL_COUNTRY_L')}: {this.model.birthPlace.country}</>}
                                    {!ObjectHelper.isStringNullOrEmpty(this.model.birthPlace.place) && !ObjectHelper.isStringNullOrEmpty(this.model.birthPlace.country) && <>, </>}
                                    {!ObjectHelper.isStringNullOrEmpty(this.model.birthPlace.place) && <>{this.getResource('GL_PLACE_L')}: {this.model.birthPlace.place}</>}
                                </p>
                            </div>
                        </div>
                        : (this.model.getPropertyErrors('birthPlace').length > 0 ?
                            <div className="field-container">
                                <div className="record-container record-container--preview">
                                    <h3 className="field-title field-title--preview">
                                        {this.getResource('GL_BIRTHPLACE_L')}
                                    </h3>
                                </div>
                            </div> : null
                            )
                }
                {
                    // показваме тази секция само ако имаме някаква информация
                    (this.model.address &&
                        (this.model.address.country || this.model.address.settlement || this.model.address.foreignPlace || this.model.address.district
                            || this.model.address.municipality || this.model.address.area || this.model.address.street || this.model.address.block
                            || this.model.address.entrance || this.model.address.floor || this.model.address.apartment))
                        ? <div className="field-container">
                            <div className="record-container record-container--preview">
                                <h3 className="field-title field-title--preview">
                                    {this.getResource('GL_PERMANENT_ADDRESS_L')}
                                </h3>
                                <AddressUI {...this.bind(m => m.address)} />
                            </div>
                        </div>
                        : (this.model.address && this.model.address.getModelErrors().length > 0 ?
                            <div className="field-container">
                                <div className="record-container record-container--preview">
                                    <h3 className="field-title field-title--preview">
                                        {this.getResource('GL_PERMANENT_ADDRESS_L')}
                                    </h3>
                                </div>
                            </div> : null
                        )
                }
            </>
        );
    }


}

export function getIdentResourceKeyForDisplay(indentType: IndentTypes) {
    if (indentType == IndentTypes.EGN)
        return 'GL_BULGARIAN_PERSON_ID_L';
    else if (indentType == IndentTypes.LNCH)
        return 'GL_FOREIGN_PERSON_ID_L';
    else if (indentType == IndentTypes.BirthDate)
        return 'GL_BIRTH_DATE_L';
    else
        return 'CR_GL_00003_L';//ЕГН/ЛНЧ/Дата на раждане
}

export const ApplicantsUI = withSingleItemListContainer(ApplicantUIImpl, Applicant, {
    addButtonLabelKey: "GL_ADD_APPLICANT_L",
    listSelector: m => m.applicantsList,
    hasAtLeastOneItem: true,
    isMandatoryItem: true,
    valSummaryRecursive: true,
    valSummaryStrategy: ValidationSummaryStrategy.excludeAllExcept,
    valSummaryPropNames: ["", 'birthPlace']
})