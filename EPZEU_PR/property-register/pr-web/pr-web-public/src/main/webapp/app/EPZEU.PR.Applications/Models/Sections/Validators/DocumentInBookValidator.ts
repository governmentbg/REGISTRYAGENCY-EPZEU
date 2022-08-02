import { EPZEUBaseValidator } from 'EPZEU.Core';
import { IApplicationFormValidationContext } from 'EPZEU.PR.ApplicationBase';
import { DataForRegistrationOfDocumentInBook } from "../../DataForRegistrationOfDocumentInBook";
import { ObjectHelper } from 'Cnsys.Core';

export class DocumentInBookValidator extends EPZEUBaseValidator<DataForRegistrationOfDocumentInBook, IApplicationFormValidationContext> {

  constructor() {
    super();
    this.ruleFor(m => m.actNumber).matches('^[0-9]*$').withMessage(this.getMessage('GL_INPUT_DIGIT_VALUE_E')); // Въведете число
    this.ruleFor(m => m.volume).matches('^[0-9]*$').withMessage(this.getMessage('GL_INPUT_DIGIT_VALUE_E')); // Въведете число
    this.ruleFor(m => m.year).matches('[0-9]{4}').when(m => ObjectHelper.isStringNullOrEmpty(m.year) == false).withMessage(this.getMessage('GL_INPUT_YEAR_VALUE_E')); // Моля, въведете година във формат "гггг"
  }

  public validate(obj: DataForRegistrationOfDocumentInBook): boolean {
    let isValid = super.validate(obj);

    return isValid;
  }
}
