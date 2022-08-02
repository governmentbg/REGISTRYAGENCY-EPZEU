import { EPZEUBaseValidator } from "EPZEU.Core";
import { IApplicationFormValidationContext } from "EPZEU.PR.ApplicationBase";
import { SearchPropertiesForReport } from "../SearchPropertiesForReport";
import { ObjectHelper } from "Cnsys.Core";

export class SearchPropertiesForReportValidator extends EPZEUBaseValidator<SearchPropertiesForReport, IApplicationFormValidationContext> {

  constructor() {
    super();

    this.ruleFor(m => m.registryOfficeName).notNull().withMessage(this.getMessage('PR_APP_00020_E')).when(m => !ObjectHelper.isStringNullOrEmpty(m.settlementId));
    this.ruleFor(m => m.cadastralIdentifier).matches('^([0-9]{5})\\.(([1-9]{1})|([0-9]{2,5}))(\\.([0-9]{1,4}))(\\.([0-9]{1,4})?)?(\\.([0-9]{1,4})?)?$').withMessage(this.getMessage('PR_APP_00066_E'));
    this.ruleFor(m => m.accountNumber).matches("^[0-9]+$").withMessage(this.getMessage("GL_INPUT_DIGIT_VALUE_E"));
    this.ruleFor(m => m.cadastreNumber).matches("^[0-9]+$").withMessage(this.getMessage("GL_INPUT_DIGIT_VALUE_E"));
  }

  public validate(obj: SearchPropertiesForReport): boolean {
    let isValid = super.validate(obj);
    if (!obj.registryOfficeId && !obj.cadastralIdentifier) {
      obj.addError("minimumRequiredInfo", this.getMessage('PR_APP_00023_E'));
      isValid = false;
    } else {
       if(!obj.cadastralIdentifier) {
         if (!obj.accountNumber && !obj.oldAccountNumber &&
           !obj.place && !obj.district && !obj.street && !obj.streetNumber && !obj.building &&
           !obj.entrance && !obj.floor && !obj.flat && !obj.cadastreNumber && !obj.plot &&
           !obj.remark && !obj.minArea &&
           !obj.maxArea) {
           obj.addError("minimumRequiredInfo", this.getMessage('PR_APP_00023_E'));
           isValid = false;
         }
       }
    }
    if (obj.minArea && obj.maxArea && (parseFloat(obj.minArea) > parseFloat(obj.maxArea))) {
      obj.addError('area',this.getMessage('PR_APP_00113_Е'));
      isValid = false;
    } else if ((obj.minArea && !obj.minArea.match('^[0-9]\\d*(\\.\\d+)?$')) || (obj.maxArea && !obj.maxArea.match('^[0-9]\\d*(\\.\\d+)?$'))) {
      obj.addError('area',this.getMessage('PR_APP_00113_Е'));
      isValid = false;
    }

    return isValid;
  }
}
