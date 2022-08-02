﻿import { BaseValidator } from 'Cnsys.Core';
import { IApplicationFormValidationContext } from 'EPZEU.CR.Domain';
import { F703_Successors } from '../ModelsAutoGenerated';
import { F7030_SuccessorValidator } from './F7030_SuccessorValidator';

export class F703_SuccessorsValidator extends BaseValidator<F703_Successors, IApplicationFormValidationContext> {
    constructor() {
        super();

        this.ruleFor(m => m.successorList).setCollectionValidator(new F7030_SuccessorValidator());

    }

    public validate(obj: F703_Successors): boolean {
        let isValid = super.validate(obj);

        return isValid;
    }
}