import { Act, EPZEUBaseValidator } from 'EPZEU.Core';

export class ActValidator extends EPZEUBaseValidator<Act, any> {

  constructor() {
    super();

    this.ruleFor(model => model.id).notNull().withMessage(this.getMessage('PR_APP_00051_E'));
    this.ruleFor(model => model.name).notNull().withMessage(this.getMessage('PR_APP_00051_E'));
  }
}
