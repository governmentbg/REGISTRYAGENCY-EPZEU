import { EPZEUBaseValidator } from 'EPZEU.Core';
import { VerificationActsSearchCriteria } from '../../Models/VerificationActsSearchCriteria';

export class VerificationActsSearchCriteriaValidator extends EPZEUBaseValidator<VerificationActsSearchCriteria, any> {
    constructor() {
        super();

        this.ruleFor(m => m.uic).notEmpty().withMessage(this.getMessage('GL_INPUT_FIELD_MUST_E'));
        this.ruleFor(m => m.uic).isValidBULSTAT().withMessage(this.getMessage('GL_INVALID_IDENTIFIER_E'));        
    }

    public validate(obj: VerificationActsSearchCriteria): boolean {
        let isValid = super.validate(obj);

        return isValid;
    }
}