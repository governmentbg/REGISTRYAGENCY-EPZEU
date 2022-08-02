import { EPZEUBaseValidator } from 'EPZEU.Core';
import { Book } from 'EPZEU.PR.Core';

export class BookValidator extends EPZEUBaseValidator<Book, any> {

  constructor() {
    super();

    this.ruleFor(model => model.id).notNull().withMessage(this.getMessage('PR_APP_00106_I'));
    this.ruleFor(model => model.name).notNull().withMessage(this.getMessage('PR_APP_00106_I'));
  }
}
