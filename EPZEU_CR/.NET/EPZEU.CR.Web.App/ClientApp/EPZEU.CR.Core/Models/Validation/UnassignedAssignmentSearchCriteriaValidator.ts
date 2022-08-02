import { EPZEUBaseValidator } from 'EPZEU.Core';
import { UnassignedAssignmentSearchCriteria } from '../UnassignedAssignmentSearchCriteria';
import { UnassignedAssignmentSearchCriteriaFilter } from '../Enums';
import * as moment from 'moment';
import { ObjectHelper } from 'Cnsys.Core';


export class UnassignedAssignmentSearchCriteriaValidator extends EPZEUBaseValidator<UnassignedAssignmentSearchCriteria, any> {
    constructor() {
        super();

        //ByIncomingNumber
        //this.ruleFor(m => m.incomingNumber).notEmpty().when(m => m.searchFilter == UnassignedAssignmentSearchCriteriaFilter.ByIncomingNumber).withMessage(this.getMessage('GL_INPUT_FIELD_MUST_E'));
        this.ruleFor(m => m.incomingNumber).matches('^[0-9]{14}$').when(m => m.searchFilter == UnassignedAssignmentSearchCriteriaFilter.ByIncomingNumber).withMessage(this.getMessage('GL_INVALID_VALUE_L'));

        //ByIncomingType
        //this.ruleFor(m => m.applicationFormType).notEmpty().when(m => m.searchFilter == UnassignedAssignmentSearchCriteriaFilter.ByDocType).withMessage(this.getMessage('CR_GL_SELECT_DOC_TYPE_E'));

        //ByPeriod
        this.ruleFor(m => m.fromDate).isValidDate().when(m => m.searchFilter == UnassignedAssignmentSearchCriteriaFilter.ByPeriod).withMessage(this.getMessage('GL_INPUT_DATE_E'));
        this.ruleFor(m => m.toDate).isValidDate().when(m => m.searchFilter == UnassignedAssignmentSearchCriteriaFilter.ByPeriod).withMessage(this.getMessage('GL_INPUT_DATE_E'));
    }

    public validate(obj: UnassignedAssignmentSearchCriteria): boolean {
        let isValid = super.validate(obj);

        if (isValid) {
            if (obj.searchFilter == UnassignedAssignmentSearchCriteriaFilter.ByIncomingNumber) {
                if (ObjectHelper.isStringNullOrEmpty(obj.incomingNumber)) {
                    obj.addError(this.getMessage('GL_INPUT_INCOMING_NO_E'));
                    return false;
                }
            } else if (obj.searchFilter == UnassignedAssignmentSearchCriteriaFilter.ByPeriod) {
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
            } else {
                if (ObjectHelper.isNullOrUndefined(obj.applicationFormType)) {
                    obj.addError(this.getMessage('CR_GL_SELECT_DOC_TYPE_E'));
                    return false;
                }
            }
        }

        return isValid;
    }
}