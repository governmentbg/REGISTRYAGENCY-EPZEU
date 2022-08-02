﻿import { RecordValidator } from 'EPZEU.CR.Domain';
import { F320_RestoringManagementRight } from '../ModelsAutoGenerated';

export class F320_RestoringManagementRightValidator extends RecordValidator<F320_RestoringManagementRight> {

    constructor() {
        super();
    }

    public validateInternal(obj: F320_RestoringManagementRight): boolean {
        let isValid = super.validateInternal(obj);

        return isValid;
    }
}