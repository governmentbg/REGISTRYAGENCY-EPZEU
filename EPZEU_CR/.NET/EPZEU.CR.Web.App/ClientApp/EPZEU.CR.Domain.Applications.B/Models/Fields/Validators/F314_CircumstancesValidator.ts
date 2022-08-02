﻿import { RecordValidator } from 'EPZEU.CR.Domain';
import { F314_Circumstances } from '../ModelsAutoGenerated';

export class F314_CircumstancesValidator extends RecordValidator<F314_Circumstances> {

    constructor() {
        super();
    }

    public validateInternal(obj: F314_Circumstances): boolean {
        let isValid = super.validateInternal(obj);

        return isValid;
    }
}