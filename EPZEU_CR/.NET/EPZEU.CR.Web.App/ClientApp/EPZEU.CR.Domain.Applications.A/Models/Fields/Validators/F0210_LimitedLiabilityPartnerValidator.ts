﻿import { SimpleAddressValidator, IPersonValidationContext, PersonTypes, RecordValidator, SubjectFLEBaseValidator } from 'EPZEU.CR.Domain';
import { F0210_LimitedLiabilityPartner } from '../ModelsAutoGenerated';

export class F0210_LimitedLiabilityPartnerValidator extends RecordValidator<F0210_LimitedLiabilityPartner> {
    constructor() {
        super();

        this.ruleFor(m => m.subject).setValidator(new SubjectFLEBaseValidator());
        this.ruleFor(m => m.address).setValidator(new SimpleAddressValidator());
    }

    public validateInternal(obj: F0210_LimitedLiabilityPartner): boolean {
        let isValid = super.validateInternal(obj);

        return isValid;
    }

    setValidationContext(validationContext: IPersonValidationContext): void {
        validationContext.personType = PersonTypes.LimitedLialibilityPartner;

        super.setValidationContext(validationContext);
    }
}