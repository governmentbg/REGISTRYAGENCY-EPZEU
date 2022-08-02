﻿import { RecordValidator } from 'EPZEU.CR.Domain';
import { F025a_ConcededEstateValue } from '../ModelsAutoGenerated';

export class F025a_ConcededEstateValueValidator extends RecordValidator<F025a_ConcededEstateValue> {
    constructor() {
        super();

        this.ruleFor(m => m.text).notEmpty().withMessage(this.getMessage("GL_INPUT_FIELD_MUST_E"));
        this.ruleFor(m => m.text).matches('^\\s*\\d+(\\.\\d)*\\s*$|^\\s*\\d+(\\.\\d\\d)*\\s*$').withMessage(this.getMessage('GL_INPUT_VALUE_E'));
    }

    public validateInternal(obj: F025a_ConcededEstateValue): boolean {
        let isValid = super.validateInternal(obj);

        return isValid;
    }
}