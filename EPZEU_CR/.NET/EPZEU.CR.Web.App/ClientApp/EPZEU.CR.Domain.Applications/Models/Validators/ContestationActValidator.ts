import { ObjectHelper } from 'Cnsys.Core';
import { EPZEUBaseValidator } from 'EPZEU.Core';
import { IApplicationFormValidationContext, ValidatorHelpers } from 'EPZEU.CR.Domain';
import { ContestationAct } from '../ContestationAct';

export class ContestationActValidator extends EPZEUBaseValidator<ContestationAct, IApplicationFormValidationContext> {
    constructor() {
        super();
        this.ruleFor(m => m.fromDate).must(m => ValidatorHelpers.isValidDate(m.fromDate)).withMessage(this.getMessage('CR_APP_00266_E'));
    }

    public validate(obj: ContestationAct): boolean {
        let isValid = super.validate(obj);

        if (ObjectHelper.isStringNullOrEmpty(obj.incomingNumber)) {
            obj.addError('incomingNumber', this.getMessage('CR_APP_00265_E'));
            isValid = false;
        }

        if (ObjectHelper.isStringNullOrEmpty(obj.courtCode)) {
            obj.addError('courtCode', this.getMessage('CR_APP_INPUT_COURT_CODE_NAME_E'));
            isValid = false;
        }

        if (ObjectHelper.isStringNullOrEmpty(obj.outgoingNumber)) {
            obj.addError('outgoingNumber', this.getMessage('CR_APP_00267_E'));
            isValid = false;
        }

        if (ObjectHelper.isStringNullOrEmpty(obj.actNumber)) {
            obj.addError('actNumber', this.getMessage('CR_APP_00268_E'));
            isValid = false;
        }

        return isValid;
    }
}
