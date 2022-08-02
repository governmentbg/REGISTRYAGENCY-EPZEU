import { IApplicationFormValidationContext, Name } from 'EPZEU.PR.ApplicationBase';
import { EPZEUBaseValidator } from 'EPZEU.Core';

export class ApplicantForeignNameValidator extends EPZEUBaseValidator<Name, IApplicationFormValidationContext> {

  constructor() {
    super();

    let applicantNameMsg = this.getMessage('PR_APP_00002_I');

    this.ruleFor(m => m.firstName).notEmpty().withMessage(this.getMessage('GL_INPUT_PERSON_FIRSTNAME_E'));
    this.ruleFor(m => m.familyName).notEmpty().withMessage(this.getMessage('GL_INPUT_PERSON_FAMILYNAME_E'));

    this.ruleFor(m => m.firstName).matches('^[A-Za-z-\' ]+$').withMessage(applicantNameMsg);
    this.ruleFor(m => m.familyName).matches('^[A-Za-z-\' ]+$').withMessage(applicantNameMsg);
  }

  public validate(obj: Name): boolean {
    return super.validate(obj);
  }
}
