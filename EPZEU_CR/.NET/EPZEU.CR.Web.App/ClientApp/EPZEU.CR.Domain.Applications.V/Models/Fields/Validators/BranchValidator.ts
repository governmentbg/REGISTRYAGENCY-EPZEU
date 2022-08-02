import { EPZEUBaseValidator } from 'EPZEU.Core';
import { Branch, IApplicationFormValidationContext } from 'EPZEU.CR.Domain';

export class BranchValidator extends EPZEUBaseValidator<Branch, IApplicationFormValidationContext> {
    constructor() {
        super();

        this.ruleFor(m => m.branchCode).matches('^[0-9]').withMessage(this.getMessage('CR_APP_INVALID_BRANCH_ID_E'));
    }

    public validate(obj: Branch): boolean {
        let isValid = super.validate(obj);

        return isValid;
    }
}