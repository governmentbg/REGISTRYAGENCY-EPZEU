import { CoreValidators, IApplicationFormValidationContext, IndentTypes } from "EPZEU.PR.ApplicationBase";
import { EPZEUBaseValidator } from "EPZEU.Core";
import { IndividualSearchCriteria } from "../IndividualSearchCriteria";

export class IndividualSearchCriteriaValidator extends EPZEUBaseValidator<IndividualSearchCriteria, IApplicationFormValidationContext> {
  constructor() {
    super();
    this.ruleFor(m => m.identity).matches('^(([0-9]){8})$|^(([0-9]){10})$').withMessage(this.getMessage('GL_INVALID_IDENTIFIER_E'));
    this.ruleFor(m => m.firstName).matches('^[A-Za-zА-Яа-я-\' ]+$').withMessage(this.getMessage('GL_INPUT_CORRECT_NAME_E'));
    this.ruleFor(m => m.surName).matches('^[A-Za-zА-Яа-я-\' ]+$').withMessage(this.getMessage('GL_INPUT_CORRECT_NAME_E'));
    this.ruleFor(m => m.familyName).matches('^[A-Za-zА-Яа-я-\' ]+$').withMessage(this.getMessage('GL_INPUT_CORRECT_NAME_E'));
  }

  public validate(obj: IndividualSearchCriteria): boolean {
    let isValid = super.validate(obj);

    // if (!obj.identity && ((!obj.firstName && !obj.surName)
    //   || (!obj.firstName && !obj.familyName)
    //   || (!obj.surName && !obj.familyName))) {
    //   obj.addError(this.getMessage('PR_APP_00013_E'));
    //   isValid = false;
    // }
    if (!obj.identity && !obj.firstName) {
      obj.addError(this.getMessage('PR_APP_00013_E'));
      isValid = false;
    }
    if (obj.byPartOfName && obj.firstName.length < 3) {
      obj.addError(this.getMessage('PR_APP_00075_E'));
      isValid = false;
    }
    if (obj.identity) {
      let type = CoreValidators.getIdentType(obj.identity);
      if (type == IndentTypes.Undefined) {
        obj.removeError('identity'); //Clear the previous inline error so there is no duplication
        obj.addError('identity', this.getMessage('GL_INPUT_PERSON_ID_BIRTHDATE_E'));
        isValid = false;
      }
    }
    return isValid;
  }
}
