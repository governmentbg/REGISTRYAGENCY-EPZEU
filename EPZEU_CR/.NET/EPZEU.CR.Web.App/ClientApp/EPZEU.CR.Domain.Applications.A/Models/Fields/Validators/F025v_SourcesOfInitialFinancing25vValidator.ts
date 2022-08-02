﻿import { ObjectHelper } from 'Cnsys.Core';
import { EPZEUBaseValidator } from 'EPZEU.Core';
import { IApplicationFormValidationContext, RecordOperations } from 'EPZEU.CR.Domain';
import { F025v_SourcesOfInitialFinancing25v } from '../ModelsAutoGenerated';

export class F025v_SourcesOfInitialFinancing25vValidator extends EPZEUBaseValidator<F025v_SourcesOfInitialFinancing25v, IApplicationFormValidationContext> {

    public validate(obj: F025v_SourcesOfInitialFinancing25v): boolean {
        let isValid = super.validate(obj);

        if ((!obj.membershipFees25v.cheked || obj.membershipFees25v.recordOperation == RecordOperations.Erase)
            && (!obj.culturalEducationalAndInformationActivities25v.cheked || obj.culturalEducationalAndInformationActivities25v.recordOperation == RecordOperations.Erase)
            && (!obj.subsidyFromStateAndMunicipalBudgets25v.cheked || obj.subsidyFromStateAndMunicipalBudgets25v.recordOperation == RecordOperations.Erase)
            && (!obj.rentalOfMovableAndImmovableProperty25v.cheked || obj.rentalOfMovableAndImmovableProperty25v.recordOperation == RecordOperations.Erase)
            && (!obj.donationAndWills25v.cheked || obj.donationAndWills25v.recordOperation == RecordOperations.Erase)
            && (!obj.otherExpenses25v.cheked || obj.otherExpenses25v.recordOperation == RecordOperations.Erase)) {

            obj.addError(this.getMessage('GL_INPUT_FIELD_MUST_E')); // Полето е задължително
            isValid = false;

            return isValid;

        } else if (obj.otherExpenses25v.cheked && ObjectHelper.isStringNullOrEmpty(obj.otherExpenses25v.text) && obj.otherExpenses25v.recordOperation != RecordOperations.Erase) {
            obj.addError(this.getMessage('CR_APP_00169_E')); // Когато е избрано 'други приходи' трябва да се попълни описателното поле
            isValid = false;

            return isValid;
        }

        return isValid;
    }
}