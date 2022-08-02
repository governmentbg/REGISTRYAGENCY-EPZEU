import { Country, EPZEUBaseValidator, Nomenclatures } from 'EPZEU.Core';
import { IApplicationFormValidationContext, Person } from 'EPZEU.CR.Domain';

export class F7020aF8020aCompanyValidator extends EPZEUBaseValidator<Person, IApplicationFormValidationContext> {
    constructor() {
        super();
        Nomenclatures.getBGCountry().then((bg: Country) => {
            this.ruleFor(m => m.indent)
                .isValidBULSTAT()
                .when(m => !m.isForeignTrader)
                .withMessage(this.getMessage('GL_INVALID_IDENTIFIER_E')); //Невалиден идентификатор.

            this.ruleFor(m => m.countryName)
                .must(m => m.countryName ? true : false)
                .when(m => m.isForeignTrader)
                .withMessage(this.getMessage('CR_APP_00031_E')); //Изберете държава.

            this.ruleFor(m => m.countryName)
                .must(m => m.countryName != bg.name ? true : false)
                .when(m => m.isForeignTrader)
                .withMessage(this.getMessage('CR_APP_00033_E')); //Изберете държава, различна от България.

            this.ruleFor(m => m.registrationNumber)
                .must(m => m.registrationNumber ? true : false)
                .when(m => m.isForeignTrader)
                .withMessage(this.getMessage('CR_APP_INPUT_ENTRY_NO_REGISTER_E'));  //Попълнете номер на вписване в регистъра.
        });
    }

    public validate(obj: Person): boolean {
        let isValid = super.validate(obj);

        return isValid;
    }
}