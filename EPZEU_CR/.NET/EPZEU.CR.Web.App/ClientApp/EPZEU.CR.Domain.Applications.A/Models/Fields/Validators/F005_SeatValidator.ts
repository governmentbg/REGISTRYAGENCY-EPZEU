import { ContactsAddressValidator, F005_Seat, ProcessStates, RecordOperations, RecordValidator, SimpleAddressValidator, ValidatorHelpers } from 'EPZEU.CR.Domain';

export class F005_SeatValidator extends RecordValidator<F005_Seat> {
    constructor() {
        super();

        this.ruleFor(m => m.address).setValidator(new SimpleAddressValidator());
        this.ruleFor(m => m.contacts).setValidator(new ContactsAddressValidator);
    }

    public validateInternal(obj: F005_Seat): boolean {

        //Празно или променено поле маркирано за заличаване
        if (obj.recordOperation == RecordOperations.Erase && !(!this.validationContext.isRecordNew(obj) && !this.validationContext.isRecordEmpty(obj) && !this.validationContext.isRecordDirty(obj))) {
            obj.address.clearErrors();
            obj.address.addError(this.getMessage('CR_APP_00045_E'));
            return false;
        }

        //Ако заявлението е за промяна на обстоятелства и рекард операцията е Current - не се валидира.
        if (this.validationContext.processStates == ProcessStates.ForChange
            && (obj.recordOperation == RecordOperations.Current || obj.recordOperation == RecordOperations.Erase)) {
            obj.clearErrors(true);
            return true;
        }    

        //Празно променено поле не може да бъде записано
        if (!this.validationContext.isRecordNew(obj) && ValidatorHelpers.isObjectWithAddressEmpty(obj, "address")) {
            obj.address.clearErrors();
            obj.address.addError(this.getMessage('CR_APP_00021_E'));
            return false;
        }

        let isValid = super.validateInternal(obj);
        return isValid;
    }
}