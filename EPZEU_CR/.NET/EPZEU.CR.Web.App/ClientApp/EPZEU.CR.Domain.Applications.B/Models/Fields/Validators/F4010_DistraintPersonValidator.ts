import { ObjectHelper } from 'Cnsys.Core';
import { EPZEUBaseValidator } from 'EPZEU.Core';
import { DomainModelHepler, IApplicationFormValidationContext, IndentValidationMode, Person } from 'EPZEU.CR.Domain';

export class F4010_DistraintPersonValidator extends EPZEUBaseValidator<Person, IApplicationFormValidationContext> {
    constructor() {
        super();
        this.ruleFor(m => m.name).matches('^[А-Яа-яA-Za-z-\' ]+$').withMessage(this.getMessage('GL_INPUT_CORRECT_NAME_E')); // Въведете коректно име.
        this.ruleFor(m => m.indent).matches('^[0-9]{6,10}$').withMessage(this.getMessage('GL_INVALID_IDENTIFIER_E')).when(m => !ObjectHelper.isStringNullOrEmpty(m.indent)); //допускат се само цифри. 
    }

    public validate(obj: Person): boolean {
        let isValid = super.validate(obj);
        let idType = DomainModelHepler.getIdentType(obj.indent);

        if (!obj.name || !obj.indent) {
            obj.addError(this.getMessage('GL_INPUT_NAME_ID_E'));  // Попълнете име и идентификатор.
            isValid = false;
        }

        if (obj.indent) {
            if (!DomainModelHepler.isValidIdentType(IndentValidationMode.All, idType)) {
                obj.removeError('indent'); // първо я махаме, защото може ruleFor-a вече да я е сложил.
                obj.addError('indent', this.getMessage('GL_INVALID_IDENTIFIER_E')) // Невалиден идентификатор.
                isValid = false;
            }
        }

        return isValid;
    }
}