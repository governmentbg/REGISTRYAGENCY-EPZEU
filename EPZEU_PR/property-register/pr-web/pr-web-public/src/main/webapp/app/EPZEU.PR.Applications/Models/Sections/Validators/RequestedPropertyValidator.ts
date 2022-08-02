import { IApplicationFormValidationContext } from 'EPZEU.PR.ApplicationBase';
import { RequestedProperty } from "../RequestedProperty";
import { EPZEUBaseValidator } from "EPZEU.Core";
import { PropertyTypeValidator } from "../../Validators/PropertyTypeValidator";
import { SettlementValidator } from "../../Validators/SettlementValidator";

export class RequestedPropertyValidator extends EPZEUBaseValidator<RequestedProperty, IApplicationFormValidationContext> {

  constructor() {
    super();
    this.ruleFor(m => m.type).setValidator(new PropertyTypeValidator());
    this.ruleFor(m => m.settlement).setValidator(new SettlementValidator());
    this.ruleFor(m => m.cadastralId).matches('^([0-9]{5})\\.(([1-9]{1})|([0-9]{2,5}))(\\.([0-9]{1,4}))(\\.([0-9]{1,4})?)?(\\.([0-9]{1,4})?)?$').withMessage(this.getMessage('PR_APP_00066_E'));
    this.ruleFor(m => m.accountNumber).matches('^[0-9]*$').withMessage(this.getMessage('GL_INPUT_DIGIT_VALUE_E'));
    this.ruleFor(m => m.areaByDocuments).notEmpty().withMessage(this.getMessage('PR_APP_00042_E'));
    this.ruleFor(m => m.areaByDocuments).matches('^\\d*\\.?\\d*$').withMessage(this.getMessage('PR_APP_00074_E'));
    this.ruleFor(m => m.propertyLimits).notEmpty().withMessage(this.getMessage('PR_APP_00043_E'));
  }

   public validate(obj: RequestedProperty): boolean {
    let isValid = super.validate(obj);
    if (obj.cadastralId && obj.settlement && obj.settlement.ekatte) {
      if (obj.cadastralId.substr(0, 5) != obj.settlement.ekatte) {
        isValid = false;
        obj.addError(this.getMessage('PR_APP_00085_E'));
      }
    }

    if(obj.isIssuingAuthorityChange){
      obj.addError("isIssuingAuthorityChange",this.getMessage('PR_APP_00086_E'));
      isValid = false;
    }

    return isValid;
  }
}
