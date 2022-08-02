﻿import { BaseValidator } from 'Cnsys.Core';
import { IApplicationFormValidationContext } from 'EPZEU.CR.Domain';
import { F802_ReorganizeCoOperatives } from '../ModelsAutoGenerated';
import { F8020_ReorganizeCoOperativeValidator } from './F8020_ReorganizeCoOperativeValidator';

export class F802_ReorganizeCoOperativesValidator extends BaseValidator<F802_ReorganizeCoOperatives, IApplicationFormValidationContext> {
    constructor() {
        super();

        this.ruleFor(m => m.coOperativeList).setCollectionValidator(new F8020_ReorganizeCoOperativeValidator());
    }

    public validate(obj: F802_ReorganizeCoOperatives): boolean {
        let isValid = super.validate(obj);

        return isValid;
    }
}