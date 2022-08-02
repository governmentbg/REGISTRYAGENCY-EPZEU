﻿import { ObjectHelper } from 'Cnsys.Core';
import { RecordValidator, ValidatorHelpers } from 'EPZEU.CR.Domain';
import { F305_Reason } from '../ModelsAutoGenerated';

export class F305_ReasonValidator extends RecordValidator<F305_Reason> {

    constructor() {
        super();

        this.ruleFor(m => m.date).must(m => ValidatorHelpers.isValidDate(m.date)).withMessage(this.getMessage('CR_APP_00137_E'));
    }

    public validateInternal(obj: F305_Reason): boolean {
        let isValid = super.validateInternal(obj);


        if (!obj.contract && !obj.courtOrder && !obj.administrativAct && !obj.otherSource) {
            obj.addError(this.getMessage('CR_APP_00150_E'))
                isValid = false;
        }

        if (obj.otherSource && ObjectHelper.isStringNullOrEmpty(obj.text)) {
            obj.addError(this.getMessage('CR_APP_00138_E'))
            isValid = false;
        }

        return isValid;
    }
}