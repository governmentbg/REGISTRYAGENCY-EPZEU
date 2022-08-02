﻿import { EPZEUBaseValidator } from 'EPZEU.Core';
import { IApplicationFormValidationContext, RecordOperations, RecordValidator, SubjectFLEWithCountyValidator, ValidatorHelpers } from 'EPZEU.CR.Domain';
import { F01420_SupervisingBoardMandate2, F01421_Supervisor2, F014b_SupervisingBoard2 } from '../ModelsAutoGenerated';

class F01421_Supervisor2Validator extends RecordValidator<F01421_Supervisor2> {

    constructor() {
        super();

        this.ruleFor(m => m.subject).setValidator(new SubjectFLEWithCountyValidator());
    }

    public validateInternal(obj: F01421_Supervisor2): boolean {
        let isValid = super.validateInternal(obj);

        return isValid;
    }
}

class F01420_SupervisingBoardMandate2Validator extends RecordValidator<F01420_SupervisingBoardMandate2> {

    constructor() {
        super();
    }

    public validateInternal(obj: F01420_SupervisingBoardMandate2): boolean {
        let isValid = super.validateInternal(obj);

        return isValid;
    }
}

export class F014b_SupervisingBoard2Validator extends EPZEUBaseValidator<F014b_SupervisingBoard2, IApplicationFormValidationContext> {
    constructor() {
        super();

        this.ruleFor(m => m.supervisingBoard2Mandate).setValidator(new F01420_SupervisingBoardMandate2Validator());
        this.ruleFor(m => m.supervisor2List).setCollectionValidator(new F01421_Supervisor2Validator());
    }

    public validate(obj: F014b_SupervisingBoard2): boolean {
        let isValid = super.validate(obj);

        if (obj.supervisor2List.length > 1) {
            for (var i = 0; i < obj.supervisor2List.length; i++) {

                if (ValidatorHelpers.isObjectWithPersonEmpty(obj.supervisor2List[i], "subject") && obj.supervisor2List[i].recordOperation != RecordOperations.Erase) {
                    obj.supervisor2List[i].clearErrors(true);
                    obj.supervisor2List[i].addError(this.getMessage('CR_APP_00063_E'));

                    isValid = false;
                }
            }

            //Грешката се визуалзира при добавяне на второ и следващо лице със същия идентификатор като на вече добавено лице
            if (ValidatorHelpers.isExistDublicateIndents(obj.supervisor2List, false, "CR_APP_00124_E")) // 
                isValid = false;
        }

        return isValid;
    }
}