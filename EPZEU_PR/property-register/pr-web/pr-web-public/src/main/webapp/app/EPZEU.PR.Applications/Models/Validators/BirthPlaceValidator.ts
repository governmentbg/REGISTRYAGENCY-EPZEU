import {EPZEUBaseValidator} from "EPZEU.Core";
import { IApplicationFormValidationContext } from "EPZEU.PR.ApplicationBase";
import {BirthPlace} from "../BirthPlace";
import {ObjectHelper} from "Cnsys.Core";

export class BirthPlaceValidator extends EPZEUBaseValidator<BirthPlace, IApplicationFormValidationContext> {

  constructor() {
    super();

  }

  public validate(obj: BirthPlace): boolean {
    let isValid = super.validate(obj);

    if(ObjectHelper.isStringNullOrEmpty(obj.country) || ObjectHelper.isStringNullOrEmpty(obj.place)){
      obj.addError(this.getMessage("PR_APP_INPUT_BIRTHPLACE_E"));
      isValid = false;
    } else {
      obj.clearErrors();
    }
    return isValid;
  }

}
