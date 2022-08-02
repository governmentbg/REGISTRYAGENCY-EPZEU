import { EPZEUBaseValidator } from 'EPZEU.Core';
import { IApplicationFormValidationContext } from 'EPZEU.PR.ApplicationBase';
import { DataForRegistrationOfDocumentInIncomingRegister } from "../../DataForRegistrationOfDocumentInIncomingRegister";
import * as moment from 'moment';

export class DocumentInIncomingRegValidator extends EPZEUBaseValidator<DataForRegistrationOfDocumentInIncomingRegister, IApplicationFormValidationContext> {

  constructor() {
    super();
    this.ruleFor(m => m.incomingRegisterNumber).matches('^(-)?[0-9]*$').withMessage(this.getMessage('GL_INPUT_DIGIT_VALUE_E')); // Въведете число
    this.ruleFor(m => m.registrationDate).must(function (model, v) { return moment.isMoment(model.registrationDate) ? model.registrationDate <= moment().endOf('day') : true; }).withMessage(this.getMessage('PR_APP_INVALID_DATE_E'));
  }

  public validate(obj: DataForRegistrationOfDocumentInIncomingRegister): boolean {
    let isValid = super.validate(obj);

    return isValid;
  }
}
