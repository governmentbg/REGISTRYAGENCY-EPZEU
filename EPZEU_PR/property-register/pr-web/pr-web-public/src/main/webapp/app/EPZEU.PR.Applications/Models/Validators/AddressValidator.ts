import {IApplicationFormValidationContext} from 'EPZEU.PR.ApplicationBase';
import {EPZEUBaseValidator} from 'EPZEU.Core';
import {ObjectHelper} from 'Cnsys.Core';
import {Address} from "../Address";

export class AddressValidator extends EPZEUBaseValidator<Address, IApplicationFormValidationContext> {

  constructor() {
    super();

    this.ruleFor(m => m.postCode).greaterThanOrEqualTo(1000).withMessage(this.getMessage("GL_POST_CODE_E"));
  }

  public validate(address: Address): boolean {
    let isValid = super.validate(address);

    if (!this.isEmptyAddress(address)) {
      if (!(this.requiredParamsForFirstValidation(address) || this.requiredParamsForSecondValidation(address))) {
        address.addError(this.getMessage('PR_APP_00010_E'));
        isValid = false;
      }
    }
    return isValid;
  }

  isEmptyAddress(address: Address) {

    if (!ObjectHelper.isStringNullOrEmpty(address.settlementId) || !ObjectHelper.isStringNullOrEmpty(address.municipalityId) ||
      !ObjectHelper.isStringNullOrEmpty(address.regionId) || !ObjectHelper.isStringNullOrEmpty(address.areaId) ||
      !ObjectHelper.isStringNullOrEmpty(address.postCode) || !ObjectHelper.isStringNullOrEmpty(address.street) || address.housingEstate ||
      !ObjectHelper.isStringNullOrEmpty(address.streetNumber) || !ObjectHelper.isStringNullOrEmpty(address.block) ||
      !ObjectHelper.isStringNullOrEmpty(address.entrance) || !ObjectHelper.isStringNullOrEmpty(address.floor) ||
      !ObjectHelper.isStringNullOrEmpty(address.apartment)) {
      return false
    }
    return true;
  }

  requiredParamsForFirstValidation(address: Address) {
    if (this.commonParamsForBothValidations(address) && !ObjectHelper.isStringNullOrEmpty(address.housingEstate) &&
      !ObjectHelper.isStringNullOrEmpty(address.block) && !ObjectHelper.isStringNullOrEmpty(address.entrance) &&
      !ObjectHelper.isStringNullOrEmpty(address.floor) && !ObjectHelper.isStringNullOrEmpty(address.apartment) &&
      ObjectHelper.isStringNullOrEmpty(address.street) && ObjectHelper.isStringNullOrEmpty(address.streetNumber)) {

      return true;
    }
    return false;
  }

  requiredParamsForSecondValidation(address: Address) {
    if (this.commonParamsForBothValidations(address) && !ObjectHelper.isStringNullOrEmpty(address.street) &&
      !ObjectHelper.isStringNullOrEmpty(address.streetNumber) && ObjectHelper.isStringNullOrEmpty(address.housingEstate) &&
      ObjectHelper.isStringNullOrEmpty(address.block)) {

      return true;
    }
    return false;
  }

  commonParamsForBothValidations(address: Address) {
    if (!ObjectHelper.isStringNullOrEmpty(address.settlementName) && (address.hasAreas ? !ObjectHelper.isStringNullOrEmpty(address.areaName) : true) &&
      !ObjectHelper.isStringNullOrEmpty(address.municipalityName) && !ObjectHelper.isStringNullOrEmpty(address.regionName) &&
      !ObjectHelper.isStringNullOrEmpty(address.postCode)) {

      return true;
    }
    return false;
  }

}
