﻿import { RecordValidator } from 'EPZEU.CR.Domain';
import { F024a_HiddenNonMonetaryDeposit } from '../ModelsAutoGenerated';

export class F024a_HiddenNonMonetaryDepositValidator extends RecordValidator<F024a_HiddenNonMonetaryDeposit> {
    constructor() {
        super();
    }

    public validateInternal(obj: F024a_HiddenNonMonetaryDeposit): boolean {
        let isValid = super.validateInternal(obj);

        return isValid;
    }
}

