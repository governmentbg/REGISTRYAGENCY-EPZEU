import { EPZEUBaseValidator } from 'EPZEU.Core';
import {IApplicationFormValidationContext, CompanyCase} from 'EPZEU.PR.ApplicationBase';


export class CompanyCaseValidator extends EPZEUBaseValidator<CompanyCase,IApplicationFormValidationContext> {

  constructor() {
    super();
    this.ruleFor(m => m.year).matches('[1-9][0-9]{3}').withMessage(this.getMessage('GL_INPUT_YEAR_VALUE_E'));
  }

  public validate(obj: CompanyCase): boolean {
    let isValid = super.validate(obj);


    return isValid;
  }
}
