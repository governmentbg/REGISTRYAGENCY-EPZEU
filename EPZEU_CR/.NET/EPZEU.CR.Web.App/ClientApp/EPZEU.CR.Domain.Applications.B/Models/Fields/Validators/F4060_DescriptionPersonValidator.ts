import { EPZEUBaseValidator } from 'EPZEU.Core';
import { IApplicationFormValidationContext, Person, IndentValidationMode, DomainModelHepler } from 'EPZEU.CR.Domain';
import { ObjectHelper } from 'Cnsys.Core';

export class F4060_DescriptionPersonValidator extends EPZEUBaseValidator<Person, IApplicationFormValidationContext> {
    constructor() {
        super();
        this.ruleFor(m => m.name).matches('^[А-Яа-яA-Za-z-\' ]+$').withMessage(this.getMessage('GL_INPUT_CORRECT_NAME_E')); // Въведете коректно име.
        this.ruleFor(m => m.indent).matches('^[0-9]{6,10}$').withMessage(this.getMessage('GL_INVALID_IDENTIFIER_E')).when(m => !ObjectHelper.isStringNullOrEmpty(m.indent)); //допускат се само цифри. 
        this.ruleFor(m => m.countryName).notNull().withMessage(this.getMessage('CR_APP_00031_E')); // Изберете държава
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