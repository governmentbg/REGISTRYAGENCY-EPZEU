import { PreservedCompaniesSearch } from '../PreservedCompaniesSearch';
import { EPZEUBaseValidator } from 'EPZEU.Core';
import * as moment from 'moment';
import { ObjectHelper } from 'Cnsys.Core';
import { isMoment } from 'moment';

export class PreservedCompaniesSearchValidator extends EPZEUBaseValidator<PreservedCompaniesSearch, any> {
    constructor() {
        super();

        this.ruleFor(m => m.fromDate).isValidDate().withMessage(this.getMessage('GL_INPUT_DATE_E'));
        this.ruleFor(m => m.toDate).isValidDate().withMessage(this.getMessage('GL_INPUT_DATE_E'));
    }

    public validate(obj: PreservedCompaniesSearch): boolean {
        let isValid = super.validate(obj);

        if (!isMoment(obj.fromDate) && !isMoment(obj.toDate) && ObjectHelper.isStringNullOrEmpty(obj.companyFirstLatter)) {
            obj.addError(this.getMessage('GL_NOSELECT_SEARCH_CRITERIA_E'));
            return false;
        } else if (isMoment(obj.fromDate) && isMoment(obj.toDate)) {
            if (obj.fromDate > obj.toDate) {
                obj.addError(this.getMessage('GL_PERIOD_START_DATE_MUST_LESS_E'));
                return false;
            }

            if (obj.toDate > moment().endOf('day')) {
                obj.addError(this.getMessage('GL_NO_CAN_EXECUTE_DATE_E'));
                return false;
            }
        } else if (isMoment(obj.fromDate) || isMoment(obj.toDate)) {
            obj.addError(this.getMessage('GL_INVALID_DATE_PERIOD_E'));
            return false;
        }

        return isValid;
    }
}