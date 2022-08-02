﻿import { EPZEUBaseValidator } from 'EPZEU.Core';
import { IApplicationFormValidationContext, RecordOperations, RecordValidator, SubjectFLEWithCountyValidator, ValidatorHelpers } from 'EPZEU.CR.Domain';
import { F01220_AdministrativeBoardMandate, F01221_AdministrativeBody, F012b_AdministrativeBoard } from '../ModelsAutoGenerated';

class F01221_AdministrativeBodyValidator extends RecordValidator<F01221_AdministrativeBody> {

    constructor() {
        super();

        this.ruleFor(m => m.subject).setValidator(new SubjectFLEWithCountyValidator());
    }

    public validateInternal(obj: F01221_AdministrativeBody): boolean {

        let isValid = super.validateInternal(obj);

        return isValid;
    }
}

class F01220_AdministrativeBoardMandateValidator extends RecordValidator<F01220_AdministrativeBoardMandate> {

    constructor() {
        super();
    }

    public validateInternal(obj: F01220_AdministrativeBoardMandate): boolean {

        let isValid = super.validateInternal(obj);

        return isValid;
    }
}

export class F012b_AdministrativeBoardValidator extends EPZEUBaseValidator<F012b_AdministrativeBoard, IApplicationFormValidationContext> {
    constructor() {
        super();

        this.ruleFor(m => m.administrativeBoardMandate).setValidator(new F01220_AdministrativeBoardMandateValidator());
        this.ruleFor(m => m.administrativeBodyList).setCollectionValidator(new F01221_AdministrativeBodyValidator());
    }

    public validate(obj: F012b_AdministrativeBoard): boolean {
        let isValid = super.validate(obj);

        if (obj.administrativeBodyList.length > 1) {
            for (var i = 0; i < obj.administrativeBodyList.length; i++) {

                if (ValidatorHelpers.isObjectWithPersonEmpty(obj.administrativeBodyList[i], "subject") && obj.administrativeBodyList[i].recordOperation != RecordOperations.Erase) {
                    obj.administrativeBodyList[i].clearErrors(true);
                    obj.administrativeBodyList[i].addError(this.getMessage('CR_APP_00063_E'));

                    isValid = false;
                }
            }

            //Грешката се визуалзира при добавяне на второ и следващо лице със същия идентификатор като на вече добавено лице
            if (ValidatorHelpers.isExistDublicateIndents(obj.administrativeBodyList, false, "CR_APP_00127_E")) // 
                isValid = false;
        }

        return isValid;
    }
}