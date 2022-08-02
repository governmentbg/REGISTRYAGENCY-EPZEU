﻿import { DomainModelHepler, ProcessStates, RecordOperations, RecordValidator, SimpleAddressValidator, ValidatorHelpers } from 'EPZEU.CR.Domain';
import { F005a_SeatForCorrespondence } from '../ModelsAutoGenerated';

export class F005a_SeatForCorrespondenceValidator extends RecordValidator<F005a_SeatForCorrespondence> {
    constructor() {
        super();
        
    }

    public validateInternal(obj: F005a_SeatForCorrespondence): boolean {

        //Ако заявлението е за промяна на обстоятелства и рекард операцията е Current - не се валидира.
        if (this.validationContext.processStates == ProcessStates.ForChange
            && (obj.recordOperation == RecordOperations.Current || obj.recordOperation == RecordOperations.Erase)) {
            obj.clearErrors(true);
            return true;
        }    

        obj.address.clearErrors();
        //ако полето не е ново и е празно не може да бъде записано
        if (!this.validationContext.isRecordNew(obj) && ValidatorHelpers.isObjectWithAddressEmpty(obj, "address")) {
            obj.address.clearErrors();
            obj.address.addError(this.getMessage('CR_APP_00021_E'));
            return false;
        }
                
        if (DomainModelHepler.isRecordDirty(obj)) {
            let isValidAddress = new SimpleAddressValidator();
            isValidAddress.setValidationContext(this.getValidationContext());

            if (!isValidAddress.validate(obj.address))
                return false;
        }

        let isValid = super.validateInternal(obj);

        return isValid;
    }
}