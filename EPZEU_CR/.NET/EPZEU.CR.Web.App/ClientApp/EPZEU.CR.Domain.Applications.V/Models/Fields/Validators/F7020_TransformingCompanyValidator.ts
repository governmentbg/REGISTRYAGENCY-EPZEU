﻿import { RecordValidator } from 'EPZEU.CR.Domain';
import { F7020_TransformingCompany } from '../ModelsAutoGenerated';
import { CompanyWithBGNameValidator } from './CompanyWithBGNameValidator';

export class F7020_TransformingCompanyValidator extends RecordValidator<F7020_TransformingCompany> {
    constructor() {
        super();

        this.ruleFor(m => m.subject).setValidator(new CompanyWithBGNameValidator());
    }

    public validateInternal(obj: F7020_TransformingCompany): boolean {
        let isValid = super.validateInternal(obj);

        // ako е попълнено само едно от двете (name или indent)
        if (isValid && ((!obj.subject.name && obj.subject.indent) || (obj.subject.name && !obj.subject.indent))) {
            obj.addError(this.getMessage('GL_INPUT_NAME_ID_E'));  //Попълнете име и идентификатор.
            isValid = false;
        }

        return isValid;
    } 
}