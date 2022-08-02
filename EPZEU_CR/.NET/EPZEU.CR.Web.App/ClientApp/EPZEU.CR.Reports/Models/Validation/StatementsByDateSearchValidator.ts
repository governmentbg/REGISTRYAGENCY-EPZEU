import { ObjectHelper } from 'Cnsys.Core';
import { EPZEUBaseValidator } from 'EPZEU.Core';
import * as moment from 'moment';
import { StatementsByDateResultFilter } from '../Enums';
import { StatementsByDateSearch } from '../StatementsByDateSearch';

export class StatementsByDateSearchValidator extends EPZEUBaseValidator<StatementsByDateSearch, any> {

    constructor() {
        super();

        this.ruleFor(m => m.fromActionDate).isValidDate().when(m => m.mode == StatementsByDateResultFilter.ByDateAnnouncement).withMessage(this.getMessage('GL_INPUT_DATE_E'));
        this.ruleFor(m => m.toActionDate).isValidDate().when(m => m.mode == StatementsByDateResultFilter.ByDateAnnouncement).withMessage(this.getMessage('GL_INPUT_DATE_E'));
    }

    public validate(obj: StatementsByDateSearch): boolean {
        let isValid = super.validate(obj);

        if (ObjectHelper.isNullOrUndefined(obj.fieldIdentsCollection) || obj.fieldIdentsCollection.length == 0) {
            obj.addError("fieldIdents", this.getMessage('CR_APP_SELECT_ACT_E'));
            isValid = false;
        }

        if (obj.mode == StatementsByDateResultFilter.ByDateAnnouncement) {

            if (!moment.isMoment(obj.fromActionDate) || !moment.isMoment(obj.toActionDate)) {
                obj.addError("date", this.getMessage('CR_GL_INPUT_PERIOD_E'));
                return false;
            }

            if (obj.fromActionDate > obj.toActionDate) {
                obj.addError("date",this.getMessage('GL_PERIOD_START_DATE_MUST_LESS_E'));
                isValid = false;
            }

            if (obj.toActionDate > moment().endOf('day')) {
                obj.addError("date", this.getMessage('GL_NO_CAN_EXECUTE_DATE_E'));
                isValid = false;
            }

            if (moment.isMoment(obj.fromActionDate) && moment.isMoment(obj.toActionDate) && obj.toActionDate.diff(obj.fromActionDate, 'days') > 31) {
                obj.addError("date",this.getMessage('GL_NO_REPORT_INTERVAL_GREAT_MONTH_E'));
                isValid = false;
            }

            if (!ObjectHelper.isNullOrUndefined(obj.year) && isNaN(obj.year)) {
                obj.addError("year", this.getMessage('GL_INPUT_YEAR_VALUE_E'));
                isValid = false;
            }
        }
    
        return isValid;
    }
}