import { EPZEUBaseValidator } from 'EPZEU.Core';
import { RegistryOffice } from 'EPZEU.PR.Core';
import { IApplicationFormValidationContext } from 'EPZEU.PR.ApplicationBase';

export class ReceivingOfficeValidator extends EPZEUBaseValidator<RegistryOffice, IApplicationFormValidationContext> {

  constructor() {
    super();

    this.ruleFor(model => model.name).notNull().withMessage(this.getMessage('PR_INPUT_RECEIVING_OFFICE_E'));
  }
}
