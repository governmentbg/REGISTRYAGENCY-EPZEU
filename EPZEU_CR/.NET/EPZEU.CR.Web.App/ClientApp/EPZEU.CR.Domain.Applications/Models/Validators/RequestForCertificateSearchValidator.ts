import { RequestForCertificateSearch } from '../RequestForCertificateSearch';
import { EPZEUBaseValidator } from 'EPZEU.Core';


export class RequestForCertificateSearchValidator extends EPZEUBaseValidator<RequestForCertificateSearch, any> {
    constructor() {
        super();

        this.ruleFor(m => m.uic).notEmpty().withMessage(this.getMessage('GL_INPUT_FIELD_MUST_E'));
        this.ruleFor(m => m.uic).isValidBULSTAT().withMessage(this.getMessage('GL_INVALID_IDENTIFIER_E'));
    }

    public validate(obj: RequestForCertificateSearch): boolean {
        let isValid = super.validate(obj);

        return isValid;
    }
}