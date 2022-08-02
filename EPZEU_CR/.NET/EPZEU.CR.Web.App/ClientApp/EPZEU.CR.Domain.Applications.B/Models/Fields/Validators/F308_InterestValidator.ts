﻿import { RecordValidator } from 'EPZEU.CR.Domain';
import { F308_Interest } from '../ModelsAutoGenerated';

export class F308_InterestValidator extends RecordValidator<F308_Interest> {

    constructor() {
        super();
    }

    public validateInternal(obj: F308_Interest): boolean {
        let isValid = super.validateInternal(obj);

        return isValid;
    }
}