import {EPZEUBaseValidator} from "EPZEU.Core";
import {IApplicationFormValidationContext} from "./ApplicationFormValidationContext";
import {Documents} from "../Documents";
import {DocumentsValidator} from "./DocumentsValidator";

export class CertifiedCopyDocumentsValidator extends EPZEUBaseValidator<Documents, IApplicationFormValidationContext> {

  constructor() {
    super();
    this.ruleFor(model => model).setValidator(new DocumentsValidator());
  }

  //вид документ "Пълномощно"
  POWER_OF_ATTORNEY_DOCUMENT_TYPE_ID = "20001100000000002021";

  public validate(obj: Documents): boolean {
    let isValid = super.validate(obj);

    if(obj.attachedDocuments && obj.attachedDocuments.filter(d => d.documentTypeId === this.POWER_OF_ATTORNEY_DOCUMENT_TYPE_ID).length === 0) {
      obj.addError('requiredDocument',this.getMessage("PR_APP_00011_E"));
      isValid = false;
    }
    return isValid;
  }
}
