import { ObjectHelper } from 'Cnsys.Core';
import { Mandate, RecordValidator, ValidatorHelpers } from 'EPZEU.CR.Domain';

export class MandateValidator extends RecordValidator<Mandate> {
    constructor() {
        super();

        let errMsg = this.getMessage('GL_INPUT_DATE_E');
        this.ruleFor(m => m.date).notEmpty().withMessage(this.getMessage('GL_INPUT_FIELD_MUST_E')).when(m => ObjectHelper.isStringNullOrEmpty(m.mandateTypeText.trim()));
        this.ruleFor(m => m.date).must(m => ValidatorHelpers.isValidDate(m.date)).withMessage(errMsg).when(m => !ObjectHelper.isStringNullOrEmpty(m.date));
    }

    public validateInternal(obj: Mandate): boolean {
        let isValid = super.validateInternal(obj);

        return isValid;
    }
}