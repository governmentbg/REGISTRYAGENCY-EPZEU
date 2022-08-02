import { EPZEUBaseValidator } from 'EPZEU.Core';
import { Person, IApplicationFormValidationContext } from 'EPZEU.CR.Domain';

export class TransformingForeignCompanyValidator extends EPZEUBaseValidator<Person, IApplicationFormValidationContext> {
    constructor() {
        super();

        this.ruleFor(m => m.countryName).must(m => m.countryName ? true : false).withMessage(this.getMessage('CR_APP_00031_E'));
        this.ruleFor(m => m.foreignRegisterCode).must(m => m.foreignRegisterCode ? true : false).withMessage(this.getMessage('CR_APP_INPUT_REGISTER_E')).when(m => m.isForeignTrader);
    }

    public validate(obj: Person): boolean {
        let isValid = super.validate(obj);

        return isValid;
    }
}