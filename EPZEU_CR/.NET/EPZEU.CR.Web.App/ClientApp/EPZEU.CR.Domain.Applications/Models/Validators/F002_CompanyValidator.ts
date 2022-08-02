import { F002_Company, RecordValidator } from 'EPZEU.CR.Domain';

export class F002_CompanyValidator extends RecordValidator<F002_Company> {
    constructor() {
        super();

        this.ruleFor(m => m.text).notEmpty().withMessage(this.getMessage('CR_APP_INPUT_COMPANY_NAME_E'));
        this.ruleFor(m => m.text).matches('^(?:(?![ЫЭыэ])[А-Яа-я0-9-~@#$%^&*()_+{}|":><.,/?\';=|!\\\\ ])+$').withMessage(this.getMessage('GL_INPUT_CIRILIC_MUST_E'));
    }

    public validateInternal(obj: F002_Company): boolean {
        let isValid = super.validateInternal(obj);

        return isValid;
    }
}