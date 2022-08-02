import { ObjectHelper } from 'Cnsys.Core';
import { EPZEUBaseValidator, EPZEUValidationHelper } from 'EPZEU.Core';
import { DocumentsWithoutDeedSearchCriteria } from 'EPZEU.CR.Core';
import * as moment from 'moment';

export class DocumentsWithoutDeedSearchCriteriaValidator extends EPZEUBaseValidator<DocumentsWithoutDeedSearchCriteria, any> {
    constructor() {
        super();

        this.ruleFor(m => m.dateFrom).isValidDate().withMessage(this.getMessage('GL_INPUT_DATE_E'));
        this.ruleFor(m => m.dateTo).isValidDate().withMessage(this.getMessage('GL_INPUT_DATE_E'));
        this.ruleFor(m => m.incomingNumber).matches('^[0-9]{14}$').withMessage(this.getMessage('CR_GL_INVALID_INCOMING_NUMBER_E'));
        this.ruleFor(m => m.companyName).must((obj) => {
            return EPZEUValidationHelper.hasAnyCharNotInSpecialCharCodes(obj.companyName);
        }).when(x => !ObjectHelper.isStringNullOrEmpty(x.companyName)).withMessage(this.getMessage('GL_NOSELECT_SEARCH_CRITERIA_E'));
    }

    public validate(obj: DocumentsWithoutDeedSearchCriteria): boolean {
        let isValid = super.validate(obj);

        if (isValid) {
            if ((!moment.isMoment(obj.dateFrom)
                || !moment.isMoment(obj.dateTo))
                && ObjectHelper.isStringNullOrEmpty(obj.incomingNumber)
                && ObjectHelper.isStringNullOrEmpty(obj.companyName)
                && ObjectHelper.isNullOrUndefined(obj.status)) {
                obj.addError(this.getMessage('GL_NOSELECT_SEARCH_CRITERIA_E'));
                return false;
            }

            if (moment.isMoment(obj.dateFrom) && moment.isMoment(obj.dateTo)) {
                if (obj.dateFrom > obj.dateTo) {
                    obj.addError(this.getMessage('GL_PERIOD_START_DATE_MUST_LESS_E'));
                    return false;
                }

                if (obj.dateTo > moment().endOf('day')) {
                    obj.addError(this.getMessage('GL_NO_CAN_EXECUTE_DATE_E'));
                    return false;
                }

                if (obj.dateTo.diff(obj.dateFrom, 'days') >= 31) {
                    obj.addError(this.getMessage('GL_NO_REPORT_INTERVAL_GREAT_MONTH_E'));
                    return false;
                }
            } else {
                if (!ObjectHelper.isStringNullOrEmpty(obj.incomingNumber) || !ObjectHelper.isStringNullOrEmpty(obj.companyName) || !ObjectHelper.isNullOrUndefined(obj.status)) {
                    obj.addError(this.getMessage('CR_GL_INPUT_PERIOD_E'));
                    return false;
                }
            }
        }

        return isValid;
    }
}