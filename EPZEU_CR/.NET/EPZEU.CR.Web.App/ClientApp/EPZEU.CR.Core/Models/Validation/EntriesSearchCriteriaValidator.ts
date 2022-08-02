import { EPZEUBaseValidator } from 'EPZEU.Core';
import * as moment from 'moment';
import { EntriesSearchCriteria } from '../EntriesSearchCriteria';

export class EntriesSearchCriteriaValidator extends EPZEUBaseValidator<EntriesSearchCriteria, any> {
    constructor() {
        super();

        this.ruleFor(m => m.dateFrom).isValidDate().withMessage(this.getMessage('GL_INPUT_DATE_E'));
        this.ruleFor(m => m.dateTo).isValidDate().withMessage(this.getMessage('GL_INPUT_DATE_E'));
    }

    public validate(obj: EntriesSearchCriteria): boolean {
        let isValid = super.validate(obj);

        if (isValid) {
            if (!obj.dateFrom || !obj.dateTo) {
                //Моля, въведете период за търсене
                obj.addError(this.getMessage('CR_GL_INPUT_PERIOD_E'));
                return false;
            }

            if (moment.isMoment(obj.dateFrom) && moment.isMoment(obj.dateTo)) {
                if (obj.dateFrom > obj.dateTo) {
                    //Началната дата на периода трябва да бъде по-малка от крайната.
                    obj.addError(this.getMessage('GL_PERIOD_START_DATE_MUST_LESS_E'));
                    return false;
                }

                if (obj.dateTo > moment().endOf('day')) {
                    //Не може да бъде правена справка с бъдеща дата.
                    obj.addError(this.getMessage('GL_NO_CAN_EXECUTE_DATE_E'));
                    return false;
                }

                if (obj.dateTo.diff(obj.dateFrom, 'days') > 31) {
                    //Не можете да правите справка за период по-голям от 31 дни. - TRIR-2474.
                    obj.addError(this.getMessage('GL_NO_REPORT_INTERVAL_GREAT_MONTH_E'));
                    return false;
                }
            }
        }
        
        return isValid;
    }
}