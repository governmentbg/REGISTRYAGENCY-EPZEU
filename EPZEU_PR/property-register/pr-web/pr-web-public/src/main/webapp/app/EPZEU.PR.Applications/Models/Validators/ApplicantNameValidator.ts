import { IApplicationFormValidationContext, Name } from 'EPZEU.PR.ApplicationBase';
import { EPZEUBaseValidator } from 'EPZEU.Core';

export class ApplicantNameValidator extends EPZEUBaseValidator<Name, IApplicationFormValidationContext> {

  constructor() {
    super();
    this.ruleFor(m => m.firstName).notEmpty().withMessage(this.getMessage('GL_INPUT_PERSON_FIRSTNAME_E'));
    this.ruleFor(m => m.familyName).notEmpty().withMessage(this.getMessage('GL_INPUT_PERSON_FAMILYNAME_E'));
    // ONLY cyrilic or ONLY latin. Cyrilic + latin is not allowed!
    this.ruleFor(m => m.firstName).matches('(^[А-Яа-я-\' ]+$)|(^[A-Za-z-\' ]+$)').withMessage(this.getMessage('GL_INPUT_CORRECT_NAME_E'));
    this.ruleFor(m => m.surName).matches('(^[А-Яа-я-\' ]+$)|(^[A-Za-z-\' ]+$)').withMessage(this.getMessage('GL_INPUT_CORRECT_NAME_E'));
    this.ruleFor(m => m.familyName).matches('(^[А-Яа-я-\' ]+$)|(^[A-Za-z-\' ]+$)').withMessage(this.getMessage('GL_INPUT_CORRECT_NAME_E'));
  }

}
