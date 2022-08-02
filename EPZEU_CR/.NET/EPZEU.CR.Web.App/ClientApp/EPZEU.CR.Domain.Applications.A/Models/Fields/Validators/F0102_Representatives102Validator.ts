﻿import { EPZEUBaseValidator } from 'EPZEU.Core';
import { IApplicationFormValidationContext, PersonWithCountyValidator, RecordOperations, RecordValidator, ValidatorHelpers } from 'EPZEU.CR.Domain';
import { F01020_Representative102, F0102_Representatives102 } from '../ModelsAutoGenerated';

class F01020_Representative102Validator extends RecordValidator<F01020_Representative102> {

    constructor() {
        super();

        this.ruleFor(m => m.person).setValidator(new PersonWithCountyValidator());
    }

    public validateInternal(obj: F01020_Representative102): boolean {

        let isValid = super.validateInternal(obj);

        return isValid;
    }
}

export class F0102_Representatives102Validator extends EPZEUBaseValidator<F0102_Representatives102, IApplicationFormValidationContext> {
    constructor() {
        super();

        this.ruleFor(m => m.representativeList).setCollectionValidator(new F01020_Representative102Validator());
    }

    public validate(obj: F0102_Representatives102): boolean {
        let isValid = super.validate(obj);
        let valCtx = this.getValidationContext();

        if (ValidatorHelpers.hasMandatoryRecordsForChange(valCtx.processStates, obj.representativeList, true)) {

            let emptyOrForEraseRepresentatives: number = 0;

            for (var i = 0; i < obj.representativeList.length; i++) {

                if (ValidatorHelpers.isObjectWithPersonEmpty(obj.representativeList[i], "person") || obj.representativeList[i].recordOperation == RecordOperations.Erase) {
                    obj.representativeList[i].clearErrors();
                    emptyOrForEraseRepresentatives++;
                }
            }

            if (emptyOrForEraseRepresentatives == obj.representativeList.length) {
                obj.representativeList[0].addError(this.getMessage('CR_APP_00053_E')); // Задължително е попълването поне на един "Представител"!
                isValid = false;
            }
        }

        if (obj.representativeList.length > 1) {

            for (var i = 0; i < obj.representativeList.length; i++) {

                if (ValidatorHelpers.isObjectWithPersonEmpty(obj.representativeList[i], "person") && obj.representativeList[i].recordOperation != RecordOperations.Erase) {
                    obj.representativeList[i].clearErrors(true);
                    obj.representativeList[i].addError(this.getMessage('CR_APP_00063_E'));// Попълнете данните за полето или го изтрийте.
                    isValid = false;
                }
            }

            //Грешката се визуалзира при добавяне на второ и следващо лице със същия идентификатор като на вече добавено лице            
            if (ValidatorHelpers.isExistDublicateIndents(obj.representativeList, true, "CR_APP_00112_E"))
                isValid = false;
        }

        return isValid;
    }
}