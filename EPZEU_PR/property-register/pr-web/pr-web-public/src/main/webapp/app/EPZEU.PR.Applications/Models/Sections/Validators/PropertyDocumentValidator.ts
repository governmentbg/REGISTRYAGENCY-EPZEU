import { IApplicationFormValidationContext } from "EPZEU.PR.ApplicationBase";
import { EPZEUBaseValidator } from 'EPZEU.Core';
import { PropertyDocument, PropertyDocumentType } from "../../PropertyDocument";
import * as moment from "moment";

export class PropertyDocumentValidator extends EPZEUBaseValidator<PropertyDocument, IApplicationFormValidationContext> {

  constructor() {
    super();
    this.ruleFor(m => m.type).notEmpty().withMessage(this.getMessage('PR_APP_00107_E'));
    this.ruleFor(m => m.actNumber).matches('^[0-9]*$').when(m=>m.type == PropertyDocumentType.ACT_OF_OWNERSHIP).withMessage(this.getMessage('GL_INPUT_DIGIT_VALUE_E')); // Въведете число
    this.ruleFor(m => m.volume).matches('^[0-9]*$').when(m=>m.type == PropertyDocumentType.ACT_OF_OWNERSHIP).withMessage(this.getMessage('GL_INPUT_DIGIT_VALUE_E')); // Въведете число
    this.ruleFor(m => m.incomingRegisterNumber).matches('^(-)?[0-9]*$').when(m=>m.type == PropertyDocumentType.ACT_OF_OWNERSHIP).withMessage(this.getMessage('GL_INPUT_DIGIT_VALUE_E')); // Въведете число
  }

  public validate(obj: PropertyDocument): boolean {
    let isValid = super.validate(obj);

    if (obj.type == PropertyDocumentType.ACT_OF_OWNERSHIP) {
      if (!obj.actNumber || !obj.volume || !obj.incomingRegisterNumber || !obj.propertyDocumentDate) {
        isValid = false;
        obj.addError(this.getMessage('PR_APP_00095_E'));
      }
    }
    if (obj.propertyDocumentDate && obj.propertyDocumentDate.isAfter(moment())) {
      isValid = false;
      obj.addError(this.getMessage('PR_APP_INVALID_DATE_E'));
    } else if (obj.type == PropertyDocumentType.CERTIFICATE_FOR_INHERITANCE || obj.type == PropertyDocumentType.OTHER) {
      if (!obj.description) {
        isValid = false;
        obj.addError(this.getMessage('PR_APP_00045_E'));
      }
    }
    return isValid;
  }
}
