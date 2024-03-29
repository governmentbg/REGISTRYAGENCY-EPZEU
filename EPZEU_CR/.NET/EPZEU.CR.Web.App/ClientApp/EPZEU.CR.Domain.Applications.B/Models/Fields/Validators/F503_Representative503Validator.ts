﻿import { PersonWithCountyValidator, RecordValidator } from 'EPZEU.CR.Domain';
import { F503_Representative503 } from '../ModelsAutoGenerated';


export class F503_Representative503Validator extends RecordValidator<F503_Representative503> {
    constructor() {
        super();

        this.ruleFor(m => m.person).setValidator(new PersonWithCountyValidator());
    }

    public validateInternal(obj: F503_Representative503): boolean {        

        let isValid = super.validateInternal(obj);        

        return isValid;
    }
}