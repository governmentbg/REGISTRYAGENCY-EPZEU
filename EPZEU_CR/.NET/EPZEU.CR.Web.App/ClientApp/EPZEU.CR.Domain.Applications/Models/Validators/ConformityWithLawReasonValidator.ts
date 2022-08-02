﻿import { ObjectHelper } from 'Cnsys.Core';
import { EPZEUBaseValidator } from 'EPZEU.Core';
import { IApplicationFormValidationContext, ValidatorHelpers } from 'EPZEU.CR.Domain';
import { ConformityWithLawReason } from '../ModelsAutoGenerated';

export class ConformityWithLawReasonValidator extends EPZEUBaseValidator<ConformityWithLawReason, IApplicationFormValidationContext> {
    constructor() {
        super();
    }

    public validate(obj: ConformityWithLawReason): boolean {
        let isValid = super.validate(obj);

        if (!obj.euCompanySeatShifting
            && !obj.euContryCompanyFusion
            && !obj.euCoOperativeCompanySeatShifting
            && !obj.euCountryCompanyEstablishing
            && !obj.euCountryCoOperativeCompanyEstablishing) {
            isValid = false;
            obj.addError(this.getMessage('CR_APP_00074_I')); 
        }

        return isValid;
    }
}