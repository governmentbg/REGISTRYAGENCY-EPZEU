import {EPZEUBaseValidator} from "EPZEU.Core";
import {IApplicationFormValidationContext} from "EPZEU.PR.ApplicationBase";
import {Documents} from "../Documents";
import {DocumentsValidator} from "./DocumentsValidator";

export class EmptyDocumentsValidator extends EPZEUBaseValidator<Documents, IApplicationFormValidationContext> {

  constructor() {
    super();
    this.ruleFor(model => model).setValidator(new DocumentsValidator());
  }

  public validate(obj: Documents): boolean {
    let isValid = super.validate(obj);

    if(obj.hasErrors()) {
      obj.removeError('requiredDocument');
    }
    return isValid;
  }
}
