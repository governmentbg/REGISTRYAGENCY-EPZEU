import { EPZEUBaseValidator } from 'EPZEU.Core';
import { RegistrationsSearchCriteria } from '../RegistrationsSearchCriteria';

export class RegistrationsSearchCriteriaValidator extends EPZEUBaseValidator<RegistrationsSearchCriteria, any> {
    constructor() {
        super();

        this.ruleFor(m => m.incomingNumber).notEmpty().withMessage(this.getMessage('GL_INPUT_INCOMING_NO_E'));
        this.ruleFor(m => m.incomingNumber).matches('^[0-9]{14}$').withMessage(this.getMessage('CR_GL_INVALID_INCOMING_NUMBER_E'));
    }

    public validate(obj: RegistrationsSearchCriteria): boolean {
        let isValid = super.validate(obj);

        return isValid;
    }
}