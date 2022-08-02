﻿import { RecordValidator } from 'EPZEU.CR.Domain';
import { F031_Funds } from '../ModelsAutoGenerated';

export class F031_FundsValidator extends RecordValidator<F031_Funds> {
    constructor() {
        super();

        this.ruleFor(m => m.text).matches('^\\s*\\d+(\\.\\d)*\\s*$|^\\s*\\d+(\\.\\d\\d)*\\s*$').withMessage(this.getMessage('GL_INPUT_VALUE_E'));
    }

    public validateInternal(obj: F031_Funds): boolean {
        let isValid = super.validateInternal(obj);

        return isValid;
    }
}