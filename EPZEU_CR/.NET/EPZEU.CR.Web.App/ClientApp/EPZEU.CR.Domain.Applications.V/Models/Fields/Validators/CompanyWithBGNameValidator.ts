import { EPZEUBaseValidator } from 'EPZEU.Core';
import { IApplicationFormValidationContext, Person } from 'EPZEU.CR.Domain';

export class CompanyWithBGNameValidator extends EPZEUBaseValidator<Person, IApplicationFormValidationContext> {
    constructor() {
        super();

        this.ruleFor(m => m.indent).isValidBULSTAT().withMessage(this.getMessage('GL_INVALID_IDENTIFIER_E')); // Невалиден идентификатор.
        this.ruleFor(m => m.name).matches('^(?:(?![ЫЭыэ])[А-Яа-я0-9-~@#$%^&*()_+{}|":><.,/?\';=|!\\\\ ])+$').when(m => m.initialName != m.name)
            .withMessage(this.getMessage('GL_INPUT_CIRILIC_MUST_E'));  //Полето трябва да е изписано на кирилица.
    }

    public validate(obj: Person): boolean {
        let isValid = super.validate(obj);

        return isValid;
    }
}