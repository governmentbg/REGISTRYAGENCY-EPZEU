import { ObjectHelper } from 'Cnsys.Core';
import { EPZEUBaseValidator } from 'EPZEU.Core';
import { ValidatorHelpers } from 'EPZEU.CR.Domain';
import { IncomingRequestForCorrectionSearchCriteria } from '../IncomingRequestForCorrectionSearch';

export class IncomingRequestForCorrectionSearchCriteriaValidator extends EPZEUBaseValidator<IncomingRequestForCorrectionSearchCriteria, any> {

    constructor() {
        super();
    }

    public validate(obj: IncomingRequestForCorrectionSearchCriteria): boolean {
        let isValid = super.validate(obj);

        if (obj.enableIncomingNumber && ObjectHelper.isStringNullOrEmpty(obj.incomingNumber)) {
            obj.addError('incomingNumber', this.getMessage('GL_INPUT_INCOMING_NO_E'));
            isValid = false;
        }


        if (obj.enableEntryNumber && ObjectHelper.isStringNullOrEmpty(obj.entryNumber)) {
            obj.addError('entryNumber', this.getMessage('GL_INPUT_ENTRY_NO_E'));
            isValid = false;
        }

        return isValid;
    }
}
