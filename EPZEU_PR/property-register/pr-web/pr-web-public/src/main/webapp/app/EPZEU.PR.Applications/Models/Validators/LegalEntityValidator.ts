import { EPZEUBaseValidator } from 'EPZEU.Core';
import { Constants } from 'EPZEU.PR.Core';
import { IApplicationFormValidationContext } from 'EPZEU.PR.ApplicationBase';
import { LegalEntity } from '../LegalEntity';
import { CountryValidator } from "./CountryValidator";
import {CompanyCaseValidator} from "./CompanyCaseValidator";

export class LegalEntityValidator extends EPZEUBaseValidator<LegalEntity,IApplicationFormValidationContext> {

  constructor() {
    super();
    this.ruleFor(m => m.country).setValidator(new CountryValidator());
    this.ruleFor(m => m.companyName).notEmpty().withMessage(this.getMessage('PR_APP_INPUT_COMPANY_NAME_AND LEGAL_FORM_E'));
    this.ruleFor(m => m.legalEntityNumber).isValidBULSTAT().withMessage(this.getMessage('GL_INVALID_IDENTIFIER_E'));
    this.ruleFor(m => m.companyCase).setValidator(new CompanyCaseValidator());

  }

  public validate(obj: LegalEntity): boolean {
    let isValid = super.validate(obj);

    return isValid;
  }
}
