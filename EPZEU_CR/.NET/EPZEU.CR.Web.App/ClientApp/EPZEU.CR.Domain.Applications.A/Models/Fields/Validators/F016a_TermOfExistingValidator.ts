﻿import { RecordValidator } from 'EPZEU.CR.Domain';
import { F016a_TermOfExisting } from '../ModelsAutoGenerated';

export class F016a_TermOfExistingValidator extends RecordValidator<F016a_TermOfExisting> {
    constructor() {
        super();
    }

    public validateInternal(obj: F016a_TermOfExisting): boolean {
        let isValid = super.validateInternal(obj);

        return isValid;
    }
}