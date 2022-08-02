import { EPZEUBaseValidator } from 'EPZEU.Core';
import { RegistryOffice } from 'EPZEU.PR.Core';
import { IApplicationFormValidationContext } from 'EPZEU.PR.ApplicationBase';

export class RegistryOfficeValidator extends EPZEUBaseValidator<RegistryOffice, IApplicationFormValidationContext> {

  constructor() {
    super();
    this.ruleFor(m => m.name).notNull().withMessage(this.getMessage('PR_APP_00020_E'));
  }

  public validate(obj: RegistryOffice): boolean {
    let isValid = super.validate(obj);

    return isValid;
  }
}
