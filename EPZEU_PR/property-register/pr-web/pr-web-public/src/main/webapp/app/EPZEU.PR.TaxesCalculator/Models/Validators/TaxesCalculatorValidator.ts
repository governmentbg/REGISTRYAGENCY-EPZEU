import { EPZEUBaseValidator } from 'EPZEU.Core';
import { TaxesCalculator } from '../TaxesCalculator';
import { BookValidator } from "./BookValidator";
import { ActValidator } from "./ActValidator";

export class TaxesCalculatorValidator extends EPZEUBaseValidator<TaxesCalculator, any> {

  constructor() {
    super();
    this.ruleFor(m => m.book).setValidator(new BookValidator());
    this.ruleFor(m => m.act).setValidator(new ActValidator());
    this.ruleFor(m => m.materialInterestInBGN).notNull().withMessage(this.getMessage('PR_MATERIAL_INTEREST_IN_BGN_E'));
    this.ruleFor(m => m.materialInterestInBGN).matches('^[0-9]+(\\.[0-9]{1,2})?$').withMessage(this.getMessage('PR_MATERIAL_INTEREST_IN_BGN_E'));
  }
}
