import {EPZEUBaseValidator} from 'EPZEU.Core';
import {Country, IApplicationFormValidationContext} from 'EPZEU.PR.ApplicationBase';

export class CountryValidator extends EPZEUBaseValidator<Country, IApplicationFormValidationContext> {

  constructor() {
    super();

    this.ruleFor(model => model.name).notNull().withMessage(this.getMessage('PR_INPUT_COUNTRY_E'));
  }
}
