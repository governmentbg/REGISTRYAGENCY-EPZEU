﻿import { RecordValidator } from 'EPZEU.CR.Domain';
import { F034_BuyBackDecision } from '../ModelsAutoGenerated';

export class F034_BuyBackDecisionValidator extends RecordValidator<F034_BuyBackDecision> {
    constructor() {
        super();
    }

    public validateInternal(obj: F034_BuyBackDecision): boolean {
        let isValid = super.validateInternal(obj);

        return isValid;
    }
}