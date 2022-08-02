﻿import { EPZEUBaseValidator } from 'EPZEU.Core';
import { IApplicationFormValidationContext } from 'EPZEU.CR.Domain';
import { F802a_ReorganizeCoOperatives2 } from '../ModelsAutoGenerated';
import { F8020a_ReorganizeCoOperativeValidator } from './F8020a_ReorganizeCoOperativeValidator';

export class F802a_ReorganizeCoOperativesValidator extends EPZEUBaseValidator<F802a_ReorganizeCoOperatives2, IApplicationFormValidationContext> {
    constructor() {
        super();

        this.ruleFor(m => m.coOperative2List).setCollectionValidator(new F8020a_ReorganizeCoOperativeValidator());
    }

    public validate(obj: F802a_ReorganizeCoOperatives2): boolean {
        let isValid = super.validate(obj);

        return isValid;
    }
}