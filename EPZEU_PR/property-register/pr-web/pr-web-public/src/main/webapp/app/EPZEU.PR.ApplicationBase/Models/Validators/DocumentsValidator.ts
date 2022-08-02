import {EPZEUBaseValidator} from "EPZEU.Core";
import {IApplicationFormValidationContext} from "./ApplicationFormValidationContext";
import {Documents} from "../Documents";
import {ObjectHelper} from "../../../Cnsys.Core/Common";

export class DocumentsValidator extends EPZEUBaseValidator<Documents, IApplicationFormValidationContext> {


  public validate(obj: Documents): boolean {
    let isValid = super.validate(obj);

    if(!ObjectHelper.isStringNullOrEmpty(obj.currentDocument.name) || !ObjectHelper.isStringNullOrEmpty(obj.currentDocument.documentTypeName)) {
      obj.addError(this.getMessage("GL_NOSELECT_FILE_E"));
      isValid = false;
    }

    return isValid;
  }
}
