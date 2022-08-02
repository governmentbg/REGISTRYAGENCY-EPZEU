import { ObjectHelper } from 'Cnsys.Core';
import { EPZEUBaseValidator } from 'EPZEU.Core';
import { ValidatorHelpers } from 'EPZEU.CR.Domain';
import { AppealRefusalSearchCriteria } from '../AppealRefusalSearch';

export class AppealRefusalSearchCriteriaValidator extends EPZEUBaseValidator<AppealRefusalSearchCriteria, any> {

    constructor() {
        super();
    }

    public validate(obj: AppealRefusalSearchCriteria): boolean {
        let isValid = super.validate(obj);

        if (ObjectHelper.isStringNullOrEmpty(obj.incomingNumber)) {
            obj.addError('incomingNumber', this.getMessage('GL_INPUT_INCOMING_NO_E'));
            isValid = false;
        }

        return isValid;
    }
}
