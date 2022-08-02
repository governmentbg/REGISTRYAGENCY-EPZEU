﻿import { RecordValidator } from 'EPZEU.CR.Domain';
import { F054_VolumeOfRepresentationPower } from '../ModelsAutoGenerated';

export class F054_VolumeOfRepresentationPowerValidator extends RecordValidator<F054_VolumeOfRepresentationPower> {
    constructor() {
        super();

        this.ruleFor(m => m.text).notEmpty().withMessage(this.getMessage('GL_INPUT_FIELD_MUST_E'));
    }

    public validateInternal(obj: F054_VolumeOfRepresentationPower): boolean {
        let isValid = super.validateInternal(obj);

        return isValid;
    }
}