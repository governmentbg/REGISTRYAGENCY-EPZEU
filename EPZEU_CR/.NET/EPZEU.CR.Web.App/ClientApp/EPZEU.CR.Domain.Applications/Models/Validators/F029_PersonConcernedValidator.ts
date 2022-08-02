﻿import { ObjectHelper } from 'Cnsys.Core';
import { IndentTypes, RecordValidator, SimpleAddressValidator, SubjectFLEBaseValidator } from 'EPZEU.CR.Domain';
import { F029_PersonConcerned } from '../ModelsAutoGenerated';

export class F029_PersonConcernedValidator extends RecordValidator<F029_PersonConcerned> {
    constructor() {
        super();

        this.ruleFor(m => m.subject).setValidator(new SubjectFLEBaseValidator());
    }

    public validateInternal(obj: F029_PersonConcerned): boolean {
        let isValid = super.validateInternal(obj);

        if (ObjectHelper.isStringNullOrEmpty(obj.subject.name)) {
            obj.subject.addError('name', this.getMessage('CR_FILL_NAME_E')); //Попълнете "Име".
            isValid = false;
        }

        obj.address.clearErrors();
        if (obj.subject.isForeignTrader == true || obj.subject.indentType == IndentTypes.BirthDate) {

            let isValidAddress = new SimpleAddressValidator();
            isValidAddress.setValidationContext(this.getValidationContext());

            if (!isValidAddress.validate(obj.address, true)) {
                obj.address.addError(this.getMessage('CR_APP_00005_E'));
                isValid = false;
            }
        }

        return isValid;
    }
}