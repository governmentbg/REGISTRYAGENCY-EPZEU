import {EPZEUBaseValidator} from "EPZEU.Core";
import { IApplicationFormValidationContext } from "EPZEU.PR.ApplicationBase";
import { BaseDataModel } from "../../../Cnsys.Core/Models";
import { ReportConstants } from "../../Common/ReportConstants";


export class MaxSubjectsForReportValidator extends EPZEUBaseValidator<BaseDataModel, IApplicationFormValidationContext> {

  constructor() {
    super();
  }

  public validate(obj: any): boolean {
    let isValid = super.validate(obj);

    if((obj.itemsCount.itemsFromSearchCount + obj.itemsCount.alreadyAddedItemsCount) > ReportConstants.ALLOWED_NUMBER_OF_OBJECTS){
      obj.addError("maxAllowedNumberOfObjects", this.getMessage('PR_EXCEEDED_ALLOWED_NUMBER_OF_OBJECTS_E'));
      isValid = false;
    }
    return isValid;
  }
}
