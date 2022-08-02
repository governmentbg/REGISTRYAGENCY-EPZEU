import { ObjectHelper } from 'Cnsys.Core';
import { EPZEUBaseValidator } from 'EPZEU.Core';
import { IApplicationFormValidationContext } from 'EPZEU.PR.ApplicationBase';
import { DataForRegistrationOfDocumentInDoubleIncomingRegister } from "../../DataForRegistrationOfDocumentInDoubleIncomingRegister";

export class DocumentInDoubleIncomingRegValidator extends EPZEUBaseValidator<DataForRegistrationOfDocumentInDoubleIncomingRegister, IApplicationFormValidationContext> {

  constructor() {
    super();
    this.ruleFor(m => m.doubleIncomingRegisterNumber).matches('^-?[0-9]*$').withMessage(this.getMessage('GL_INPUT_DIGIT_VALUE_E')); // Въведете число
    this.ruleFor(m => m.year).matches('[0-9]{4}').when(m => ObjectHelper.isStringNullOrEmpty(m.year) == false).withMessage(this.getMessage('GL_INPUT_YEAR_VALUE_E')); // Моля, въведете година във формат "гггг"
  }

  public validate(obj: DataForRegistrationOfDocumentInDoubleIncomingRegister): boolean {
    let isValid = super.validate(obj);

    return isValid;
  }
}
