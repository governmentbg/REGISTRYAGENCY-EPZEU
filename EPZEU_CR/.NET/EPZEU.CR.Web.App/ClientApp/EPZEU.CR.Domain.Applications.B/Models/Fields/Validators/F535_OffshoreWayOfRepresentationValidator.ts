﻿import { RecordValidator } from 'EPZEU.CR.Domain';
import { F535_OffshoreWayOfRepresentation } from '../ModelsAutoGenerated';

export class F535_OffshoreWayOfRepresentationValidator extends RecordValidator<F535_OffshoreWayOfRepresentation> {
    constructor() {
        super();

        //Когато е избран друг начин на представляване трябва да се попълни описателното поле.
        this.ruleFor(m => m.text).notEmpty().when(m => m.otherWay).withMessage(this.getMessage('CR_APP_00046_E'));
    }

    public validateInternal(obj: F535_OffshoreWayOfRepresentation): boolean {
        let isValid = super.validateInternal(obj);

        return isValid;
    }
}