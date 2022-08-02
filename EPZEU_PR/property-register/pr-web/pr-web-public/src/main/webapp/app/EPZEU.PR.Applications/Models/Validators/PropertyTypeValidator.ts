import { EPZEUBaseValidator } from 'EPZEU.Core';
import { PropertyType } from 'EPZEU.PR.Core';
import { IApplicationFormValidationContext } from 'EPZEU.PR.ApplicationBase';

export class PropertyTypeValidator extends EPZEUBaseValidator<PropertyType, IApplicationFormValidationContext> {

  constructor() {
    super();

    this.ruleFor(model => model.id).notNull().withMessage(this.getMessage('PR_APP_00041_E'));
  }
}
