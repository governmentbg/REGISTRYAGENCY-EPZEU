import { ObjectHelper } from 'Cnsys.Core';
import { EPZEUBaseValidator, BG_COUNTRY_ID, Nomenclatures } from 'EPZEU.Core';
import { Address } from '../Address';
import { IApplicationFormValidationContext } from './ApplicationFormValidationContext';

export class FullAddressValidator extends EPZEUBaseValidator<Address, IApplicationFormValidationContext> {

    constructor() {
        super();
    }

    public validate(obj: Address, skipErrMsg?: boolean, errKey?: string): boolean {
        let isValid = super.validate(obj);
        let addressErrMsg = this.getMessage('CR_APP_00006_E');

        if (errKey)
            addressErrMsg = this.getMessage(errKey);

        let hasAreas = false; 
        if (obj.settlement && obj.settlement != "" && !obj.isForeign) {
            hasAreas = this.getValidationContext().ekatteAreas.filter(a => a.settlementID == obj.settlementID).length > 0;
        }

        if (obj.countryID == null)
            isValid = false;
        else if (obj.countryID != BG_COUNTRY_ID)
            isValid = !ObjectHelper.isStringNullOrEmpty(obj.foreignPlace);
        else {
            if ((obj.settlementID == null) || (hasAreas && obj.areaID == null) || ObjectHelper.isStringNullOrEmpty(obj.postCode))
                isValid = false;

            if (ObjectHelper.isStringNullOrEmpty(obj.housingEstate) && ObjectHelper.isStringNullOrEmpty(obj.street))
                isValid = false;

            if (!ObjectHelper.isStringNullOrEmpty(obj.housingEstate))
                if (ObjectHelper.isStringNullOrEmpty(obj.block) || ObjectHelper.isStringNullOrEmpty(obj.entrance) || ObjectHelper.isStringNullOrEmpty(obj.floor) || ObjectHelper.isStringNullOrEmpty(obj.apartment)) {
                    isValid = false;
                }

            if (!ObjectHelper.isStringNullOrEmpty(obj.street) && ObjectHelper.isStringNullOrEmpty(obj.streetNumber))
                isValid = false;

        }

        if (!isValid && !skipErrMsg)
            obj.addError(addressErrMsg);

        return isValid;
    }
}

export class SimpleAddressValidator extends EPZEUBaseValidator<Address, IApplicationFormValidationContext> {

    constructor() {
        super();
    }

    public validate(obj: Address, skipErrMsg?: boolean, errKey?: string): boolean {
        let isValid = super.validate(obj);
        let addressErrMsg = this.getMessage('CR_APP_00005_E');

        if (errKey)
            addressErrMsg = this.getMessage(errKey);

        let hasAreas = false;

        if (obj.settlement && obj.settlement != "" && !obj.isForeign) {
            hasAreas = this.getValidationContext().ekatteAreas.filter(a => a.settlementID == obj.settlementID).length > 0;           
        }

        //попълнени минимум - Населено място, Област, Община, Район(само за градове с териториално деление), пощенски код.
        if (obj.countryID == null)
            isValid = false;
        else if (obj.countryID != BG_COUNTRY_ID)
            isValid = !ObjectHelper.isStringNullOrEmpty(obj.foreignPlace);
        else {
            if ((obj.settlementID == null) || (hasAreas && obj.areaID == null) || ObjectHelper.isStringNullOrEmpty(obj.postCode))
                isValid = false;
        }

        if (!isValid && !skipErrMsg)
            obj.addError(addressErrMsg);

        return isValid;
    }
}