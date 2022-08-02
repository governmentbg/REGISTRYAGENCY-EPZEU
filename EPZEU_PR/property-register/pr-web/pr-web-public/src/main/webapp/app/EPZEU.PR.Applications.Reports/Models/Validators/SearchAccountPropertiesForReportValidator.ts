import { EPZEUBaseValidator } from "EPZEU.Core";
import { IApplicationFormValidationContext } from "EPZEU.PR.ApplicationBase";
import { SearchAccountPropertiesForReport } from "../SearchAccountPropertiesForReport";

export class SearchAccountPropertiesForReportValidator extends EPZEUBaseValidator<SearchAccountPropertiesForReport, IApplicationFormValidationContext> {

  constructor() {
    super();
    this.ruleFor(m => m.accountNumber).matches('^[0-9]*$').withMessage(this.getMessage('GL_INPUT_DIGIT_VALUE_E'));
    this.ruleFor(m => m.cadastralIdentifier).matches('^([0-9]{5})\\.(([1-9]{1})|([0-9]{2,5}))(\\.([0-9]{1,4}))(\\.([0-9]{1,4})?)?(\\.([0-9]{1,4})?)?$')
      .withMessage(this.getMessage('PR_APP_00066_E')).when(m => m.cadastralIdentifierForm);
    this.ruleFor(m => m.registryOfficeName).notNull().withMessage(this.getMessage('PR_APP_00020_E')).when(m => m.accountNumberForm);
  }

  public validate(obj: SearchAccountPropertiesForReport): boolean {
    let isValid = super.validate(obj);
    if ((!obj.cadastralIdentifier && !obj.accountNumber) || (!obj.cadastralIdentifier && !obj.registryOfficeId) ||(obj.registryOfficeId && !obj.accountNumber)) {
      obj.addError(this.getMessage('PR_APP_00019_E'));
      isValid = false;
    }
    return isValid;
  }
}
