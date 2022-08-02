import { EPZEUBaseValidator, EPZEUValidationHelper } from 'EPZEU.Core';
import { ApplicationTransformationsSearchCriteria } from 'EPZEU.CR.Core';
import * as moment from 'moment';
import { isMoment } from 'moment';
import { ObjectHelper } from 'Cnsys.Core';

export class TransformationsSearchCriteriaValidator extends EPZEUBaseValidator<ApplicationTransformationsSearchCriteria, any> {
    constructor() {
        super();

        this.ruleFor(m => m.dateFrom).isValidDate().withMessage(this.getMessage('GL_INPUT_DATE_E'));
        this.ruleFor(m => m.dateTo).isValidDate().withMessage(this.getMessage('GL_INPUT_DATE_E'));
        this.ruleFor(m => m.companyName).must((obj) => {
            return EPZEUValidationHelper.hasAnyCharNotInSpecialCharCodes(obj.companyName);
        }).when(x => !ObjectHelper.isStringNullOrEmpty(x.companyName)).withMessage(this.getMessage('GL_NOSELECT_SEARCH_CRITERIA_E'));
    }

    public validate(obj: ApplicationTransformationsSearchCriteria): boolean {
        let isValid = super.validate(obj);

        if (isValid) {
            if (!isMoment(obj.dateFrom) && !isMoment(obj.dateTo) && ObjectHelper.isStringNullOrEmpty(obj.companyName)) {
                obj.addError(this.getMessage('GL_NOSELECT_SEARCH_CRITERIA_E'));
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
            } else {
                //Моля, въведете период за търсене.  - TRIR-2474.
                obj.addError(this.getMessage('CR_GL_INPUT_PERIOD_E'));
                return false;
            }
        }

        return isValid;
    }
}