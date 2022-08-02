import { IApplicationFormValidationContext } from "EPZEU.PR.ApplicationBase";
import {Constants, EPZEUBaseValidator} from "EPZEU.Core";
import { LegalEntitySearchCriteria } from "../LegalEntitySearchCriteria";

export class LegalEntitySearchCriteriaValidator extends EPZEUBaseValidator<LegalEntitySearchCriteria, IApplicationFormValidationContext> {
  constructor() {
    super();
    this.ruleFor(m => m.countryName).notNull().withMessage(this.getMessage('PR_INPUT_COUNTRY_E'));
    this.ruleFor(m => m.companyIdBulstat).isValidBULSTAT().withMessage(this.getMessage('GL_INVALID_IDENTIFIER_E'));
    this.ruleFor(m => m.companyCaseYear).matches('^([1-2]){1}([0-9]){3}$').withMessage(this.getMessage('GL_INPUT_YEAR_VALUE_E'));
  }

  public validate(obj: LegalEntitySearchCriteria): boolean {
    let isValid = super.validate(obj);
    if (obj.countryCode == Constants.BG_COUNTRY_CODE) {
      if (!obj.companyIdBulstat && !obj.companyName && (!obj.companyCaseYear || !obj.companyCaseNumber)) {
        obj.addError(this.getMessage('PR_APP_00014_E'));
        isValid = false;
      } else if (obj.companyCaseYear &&!obj.companyCaseYear.match('^([1-2]){1}([0-9]){3}$')) {
        obj.addError(this.getMessage('GL_INPUT_YEAR_VALUE_E'));
        isValid = false;
      }
      /*
      if(obj.companyIdBulstat){
          if(!EIKValidator.validate(obj.companyIdBulstat)){
            obj.addError(this.getMessage('GL_INVALID_IDENTIFIER_E'));
            isValid=false;
          }
      }
      */
    } else {
      if (!obj.foreignLegalEntityIdentifier && !obj.companyName) {
        obj.addError(this.getMessage('PR_APP_00018_E'));
        isValid = false;
      }
    }
    return isValid;
  }
}
