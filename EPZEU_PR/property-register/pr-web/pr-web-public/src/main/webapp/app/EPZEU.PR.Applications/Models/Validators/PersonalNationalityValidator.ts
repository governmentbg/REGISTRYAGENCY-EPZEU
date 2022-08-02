import { EPZEUBaseValidator } from 'EPZEU.Core';
import { Country, IApplicationFormValidationContext } from 'EPZEU.PR.ApplicationBase';
import {Individual} from "../Individual";

export class PersonalNationalityValidator extends EPZEUBaseValidator<Country, IApplicationFormValidationContext> {

  constructor() {
    super();

    this.ruleFor(model => model.name).notNull().withMessage(this.getMessage('PR_INPUT_PERSON_NATIONALITY_E'));
  }

  public validate(obj: Country): boolean {
    let isValid = super.validate(obj);

    return isValid;
  }
}
