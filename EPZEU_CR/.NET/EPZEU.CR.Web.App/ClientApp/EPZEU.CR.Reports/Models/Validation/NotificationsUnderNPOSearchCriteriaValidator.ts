import { EPZEUBaseValidator, EPZEUValidationHelper } from 'EPZEU.Core';
import { ObjectHelper } from 'Cnsys.Core';
import * as moment from 'moment';
import { NotificationsUnderNPOSearchCriteria } from '../NotificationsUnderNPOSearchCriteria';

export class NotificationsUnderNPOSearchCriteriaValidator extends EPZEUBaseValidator<NotificationsUnderNPOSearchCriteria, any> {
    constructor() {
        super();

        this.ruleFor(m => m.entryDateFrom).isValidDate().withMessage(this.getMessage('GL_INPUT_DATE_E'));
        this.ruleFor(m => m.entryDateTo).isValidDate().withMessage(this.getMessage('GL_INPUT_DATE_E'));
        this.ruleFor(m => m.uic).isValidBULSTAT().withMessage(this.getMessage('GL_INVALID_IDENTIFIER_E'));
        this.ruleFor(m => m.companyName).must((obj) => {
            return EPZEUValidationHelper.hasAnyCharNotInSpecialCharCodes(obj.companyName);
        }).when(x => !ObjectHelper.isStringNullOrEmpty(x.companyName)).withMessage(this.getMessage('GL_NOSELECT_SEARCH_CRITERIA_E'));
    }

    public validate(obj: NotificationsUnderNPOSearchCriteria): boolean {
        let isValid = super.validate(obj);

        if (isValid) {
            if (ObjectHelper.isStringNullOrEmpty(obj.uic)
                && ObjectHelper.isStringNullOrEmpty(obj.companyName)
                && !moment.isMoment(obj.entryDateFrom)
                && !moment.isMoment(obj.entryDateTo)) {
                //Моля, изберете критерий за търсене.
                obj.addError(this.getMessage('GL_SELECT_SEARCH_CRITERION_E'));
                return false;
            } else {
                if (!ObjectHelper.isStringNullOrEmpty(obj.companyName)
                    && ObjectHelper.isStringNullOrEmpty(obj.uic)
                    && !moment.isMoment(obj.entryDateFrom)
                    && !moment.isMoment(obj.entryDateTo)) {
                    //Моля, въведете период от дата до дата или ЕИК. 
                    obj.addError(this.getMessage('CR_GL_REPORT_NOTIFICATION_44A_E'));
                    return false;
                }

                if (moment.isMoment(obj.entryDateFrom) && moment.isMoment(obj.entryDateTo)) {
                    if (obj.entryDateFrom > obj.entryDateTo) {
                        //Началната дата на периода трябва да бъде по-малка от крайната.
                        obj.addError(this.getMessage('GL_PERIOD_START_DATE_MUST_LESS_E'));
                        return false;
                    }

                    if (obj.entryDateTo > moment().endOf('day')) {
                        //Не може да бъде правена справка с бъдеща дата.
                        obj.addError(this.getMessage('GL_NO_CAN_EXECUTE_DATE_E'));
                        return false;
                    }

                    if (obj.entryDateTo.diff(obj.entryDateFrom, 'month') > 12) {
                        //Периодът за търсене не може да е по-голям от една година.
                        obj.addError(this.getMessage('CR_GL_00001_E'));
                        return false;
                    }
                } else {
                    if (moment.isMoment(obj.entryDateFrom) || moment.isMoment(obj.entryDateTo)) {
                        //Моля, въведете период за търсене.
                        obj.addError(this.getMessage('CR_GL_INPUT_PERIOD_E'));
                        return false;
                    }
                }
            }
        }

        return isValid;
    }
}