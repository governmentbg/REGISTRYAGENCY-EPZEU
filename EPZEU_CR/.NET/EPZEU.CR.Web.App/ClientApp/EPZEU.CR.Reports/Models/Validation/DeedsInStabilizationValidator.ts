import { ObjectHelper } from 'Cnsys.Core';
import { EPZEUBaseValidator, EPZEUValidationHelper } from 'EPZEU.Core';
import { DeedsInStabilizationSearchCriteria } from '../DeedsInStabilizationSearchCriteria';
import * as moment from 'moment';

export class DeedsInStabilizationValidator extends EPZEUBaseValidator<DeedsInStabilizationSearchCriteria, any> {
    constructor() {
        super();

        this.ruleFor(m => m.fromDate).isValidDate().withMessage(this.getMessage('GL_INPUT_DATE_E'));
        this.ruleFor(m => m.toDate).isValidDate().withMessage(this.getMessage('GL_INPUT_DATE_E'));
        this.ruleFor(m => m.uic).isValidBULSTAT().withMessage(this.getMessage('GL_INVALID_IDENTIFIER_E'));
        this.ruleFor(m => m.name).must((obj) => {
            return EPZEUValidationHelper.hasAnyCharNotInSpecialCharCodes(obj.name);
        }).when(x => !ObjectHelper.isStringNullOrEmpty(x.name)).withMessage(this.getMessage('GL_NOSELECT_SEARCH_CRITERIA_E'));
    }

    public validate(obj: DeedsInStabilizationSearchCriteria): boolean {
        let isValid = super.validate(obj);

        if (isValid) {
            if (moment.isMoment(obj.fromDate) && moment.isMoment(obj.toDate)) {
                if (obj.fromDate > obj.toDate) {
                    //Началната дата на периода трябва да бъде по-малка от крайната.
                    obj.addError(this.getMessage('GL_PERIOD_START_DATE_MUST_LESS_E'));
                    return false;
                }

                if (obj.toDate > moment().endOf('day')) {
                    //Не може да бъде правена справка с бъдеща дата.
                    obj.addError(this.getMessage('GL_NO_CAN_EXECUTE_DATE_E'));
                    return false;
                }

                if (obj.toDate.diff(obj.fromDate, 'days') > 31) {
                    //Не можете да правите справка за период по-голям от 31 дни. -TRIR-2474 
                    obj.addError(this.getMessage('GL_NO_REPORT_INTERVAL_GREAT_MONTH_E'));
                    return false;
                }
            } else {
                //Моля, въведете период за търсене. -TRIR-2474
                obj.addError(this.getMessage('CR_GL_INPUT_PERIOD_E'));
                return false;
            }
        }

        return isValid;
    }
}