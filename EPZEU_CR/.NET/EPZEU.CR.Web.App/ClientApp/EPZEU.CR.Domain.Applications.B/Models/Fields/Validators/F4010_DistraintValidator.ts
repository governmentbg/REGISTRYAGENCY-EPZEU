﻿import { RecordValidator, SimpleAddressValidator, SubjectBaseValidator, ValidatorHelpers } from 'EPZEU.CR.Domain';
import { F4010_Distraint } from '../ModelsAutoGenerated';

export class F4010_DistraintValidator extends RecordValidator<F4010_Distraint> {
    constructor() {
        super();

        this.ruleFor(m => m.subject).setValidator(new SubjectBaseValidator());
        this.ruleFor(m => m.address).setValidator(new SimpleAddressValidator());
    }

    public validateInternal(obj: F4010_Distraint): boolean {
        let isValid = super.validateInternal(obj);

        if (ValidatorHelpers.areAllFieldsEmpty(obj.subject.name, obj.subject.indent)) {
            //Грешката се визуализира когато има непопълнено поле Име или идентификатор
            obj.subject.addError(this.getMessage('GL_INPUT_NAME_ID_E'));
            isValid = false;
        }

        return isValid;
    }
}