﻿import { EPZEUBaseValidator } from 'EPZEU.Core';
import { IApplicationFormValidationContext, RecordOperations, RecordValidator, SubjectBaseValidator } from 'EPZEU.CR.Domain';
import { F21800_Partner218Part, F2180_Partner218, F218_Partners218 } from '../ModelsAutoGenerated';

export class F21800_Partner218PartValidator extends RecordValidator<F21800_Partner218Part> {

    public validateInternal(obj: F21800_Partner218Part): boolean {
        let isValid = super.validateInternal(obj);

        return isValid;
    }
}

export class F2180_Partner218Validator extends RecordValidator<F2180_Partner218> {

    constructor() {
        super();

        this.ruleFor(m => m.subject).setValidator(new SubjectBaseValidator());
    }

    public validateInternal(obj: F2180_Partner218): boolean {
        let isValid = super.validateInternal(obj);

        return isValid;
    }
}

export class F218_Partners218Validator extends EPZEUBaseValidator<F218_Partners218, IApplicationFormValidationContext> {
    constructor() {
        super();

        this.ruleFor(m => m.partner218List).setCollectionValidator(new F2180_Partner218Validator());
        this.ruleFor(m => m.partner218Part).setValidator(new F21800_Partner218PartValidator());
    }

    public validate(obj: F218_Partners218): boolean {
        let isValid = super.validate(obj);

        if (obj.partner218List.length > 1) {
            for (var i = 0; i < obj.partner218List.length; i++) {

                if (this.validationContext.isRecordEmpty(obj.partner218List[i]) && obj.partner218List[i].recordOperation != RecordOperations.Erase) {
                    obj.partner218List[i].addError(this.getMessage('CR_APP_00063_E'));// Попълнете данните за полето или го изтрийте.

                    isValid = false;
                }
            }
        }

        return isValid;
    }
}