import { EPZEUBaseValidator } from 'EPZEU.Core';
import { Person, IApplicationFormValidationContext } from 'EPZEU.CR.Domain';

export class CompanyValidator extends EPZEUBaseValidator<Person, IApplicationFormValidationContext> {
    constructor() {
        super();

        this.ruleFor(m => m.indent).isValidBULSTAT().withMessage(this.getMessage('GL_INVALID_IDENTIFIER_E')); // Невалиден идентификатор.
    }

    public validate(obj: Person): boolean {
        let isValid = super.validate(obj);

        return isValid;
    }
}