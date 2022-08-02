import { ObjectHelper } from 'Cnsys.Core';
import { EPZEUBaseValidator, EPZEUValidationHelper } from 'EPZEU.Core';
import * as moment from 'moment';
import { LiquidationSearchCriteria } from '../EntriesSearchCriteria';
import { isMoment } from 'moment';

export class LiquidationSearchCriteriaValidator extends EPZEUBaseValidator<LiquidationSearchCriteria, any> {
    constructor() {
        super();

        this.ruleFor(m => m.dateFrom).isValidDate().withMessage(this.getMessage('GL_INPUT_DATE_E'));
        this.ruleFor(m => m.dateTo).isValidDate().withMessage(this.getMessage('GL_INPUT_DATE_E'));
        this.ruleFor(m => m.uic).isValidBULSTAT().withMessage(this.getMessage('GL_INVALID_IDENTIFIER_E'));
        this.ruleFor(m => m.companyName).must((obj) => {
            return EPZEUValidationHelper.hasAnyCharNotInSpecialCharCodes(obj.companyName);
        }).when(x => !ObjectHelper.isStringNullOrEmpty(x.companyName)).withMessage(this.getMessage('GL_NOSELECT_SEARCH_CRITERIA_E'));
    }

    public validate(obj: LiquidationSearchCriteria): boolean {
        let isValid = super.validate(obj);

        if (obj.dateFrom > obj.dateTo) {
            obj.addError(this.getMessage('GL_PERIOD_START_DATE_MUST_LESS_E'));
            return false;
        }

        if (obj.dateTo > moment().endOf('day')) {
            obj.addError(this.getMessage('GL_NO_CAN_EXECUTE_DATE_E'));
            return false;
        }

        if (obj && (obj.dateTo == null || obj.dateTo == undefined || obj.dateFrom == null || obj.dateFrom == undefined)) {
            obj.addError(this.getMessage('CR_GL_INPUT_PERIOD_E'));
            return false;
        }

        if (isMoment(obj.dateFrom) && isMoment(obj.dateTo) && obj.dateTo.diff(obj.dateFrom, 'days') > 31) {
            obj.addError(this.getMessage('GL_NO_REPORT_INTERVAL_GREAT_MONTH_E'));
            return false;
        }

        return isValid;
    }
}