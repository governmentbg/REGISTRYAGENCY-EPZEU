﻿import { RecordValidator } from 'EPZEU.CR.Domain';
import { F325_EraseDistraint } from '../ModelsAutoGenerated';

export class F325_EraseDistraintValidator extends RecordValidator<F325_EraseDistraint> {

    constructor() {
        super();
    }

    public validateInternal(obj: F325_EraseDistraint): boolean {
        let isValid = super.validateInternal(obj);

        return isValid;
    }
}