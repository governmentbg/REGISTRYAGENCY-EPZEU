import * as moment from 'moment';
import { EPZEUBaseValidator } from 'EPZEU.Core';
import { InstructionSearchCriteria } from '../InstructionSearchCriteria';

export class InstructionSearchCriteriaValidator extends EPZEUBaseValidator<InstructionSearchCriteria, any> {
    constructor() {
        super();

        this.ruleFor(m => m.incomingNumber).matches('^[0-9]{14}$').withMessage(this.getMessage('CR_GL_INVALID_INCOMING_NUMBER_E'));
        this.ruleFor(m => m.applicationDateFrom).isValidDate().withMessage(this.getMessage('GL_INPUT_DATE_E'));
        this.ruleFor(m => m.applicationDateTo).isValidDate().withMessage(this.getMessage('GL_INPUT_DATE_E'));
    }

    public validate(obj: InstructionSearchCriteria): boolean {
        let isValid = super.validate(obj);

        if (isValid) {
            if (moment.isMoment(obj.applicationDateFrom) && moment.isMoment(obj.applicationDateTo)) {
                if (obj.applicationDateFrom > obj.applicationDateTo) {
                    obj.addError(this.getMessage('GL_PERIOD_START_DATE_MUST_LESS_E'));
                    return false;
                }

                if (obj.applicationDateTo > moment().endOf('day')) {
                    obj.addError(this.getMessage('GL_NO_CAN_EXECUTE_DATE_E'));
                    return false;
                }

                if (obj.applicationDateTo.diff(obj.applicationDateFrom, 'months') >= 12) {
                    obj.addError(this.getMessage('CR_GL_00001_E')); //Периодът за търсене не може да е по-голям от една година.
                    return false;
                }
            } else {
                if (obj.isActiveWithoutDeed === false) {
                    obj.addError(this.getMessage('CR_GL_INPUT_PERIOD_E'));
                    return false;
                }
            }
        }

        return isValid;
    }
}