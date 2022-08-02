import { EPZEUBaseValidator, EPZEUValidationHelper } from 'EPZEU.Core';
import { MasterAssignmentSearchCriteria } from '../MasterAssignmentSearchCriteria';
import { MasterAssignmentSearchCriteriaFilter } from '../Enums';
import * as moment from 'moment';
import { ObjectHelper } from 'Cnsys.Core'

export class MasterAssignmentSearchCriteriaValidator extends EPZEUBaseValidator<MasterAssignmentSearchCriteria, any> {
    constructor() {
        super();

        //ByIncomingNumber
        //this.ruleFor(m => m.incomingNumber).notEmpty().when(m => m.searchFilter == MasterAssignmentSearchCriteriaFilter.ByIncomingNumber).withMessage(this.getMessage('GL_INPUT_INCOMING_NO_E '));
        this.ruleFor(m => m.incomingNumber).matches('^[0-9]{14}$').when(m => m.searchFilter == MasterAssignmentSearchCriteriaFilter.ByIncomingNumber).withMessage(this.getMessage('CR_GL_INVALID_INCOMING_NUMBER_E'));

        //ByOutgoingIncomingNumber
        //this.ruleFor(m => m.outgoingIncomingNumber).notEmpty().when(m => m.searchFilter == MasterAssignmentSearchCriteriaFilter.ByOutgoingIncomingNumber).withMessage(this.getMessage('CR_GL_INPUT_ACT_NUMBER_E '));
        this.ruleFor(m => m.outgoingIncomingNumber).matches('^[0-9]{14}$').when(m => m.searchFilter == MasterAssignmentSearchCriteriaFilter.ByOutgoingIncomingNumber).withMessage(this.getMessage('GL_INVALID_VALUE_L'));
        this.ruleFor(m => m.outgoingSeqNumber).matches('^[0-9]{0,2}$').when(m => m.searchFilter == MasterAssignmentSearchCriteriaFilter.ByOutgoingIncomingNumber).withMessage(this.getMessage('GL_INVALID_VALUE_L'));
        this.ruleFor(m => m.outgoingNumberDate).isValidDate().when(m => m.searchFilter == MasterAssignmentSearchCriteriaFilter.ByOutgoingIncomingNumber).withMessage(this.getMessage('GL_INPUT_DATE_E'));
       
        //ByPeriod
        this.ruleFor(m => m.fromDate).isValidDate().when(m => m.searchFilter == MasterAssignmentSearchCriteriaFilter.ByCompanyName).withMessage(this.getMessage('GL_INPUT_DATE_E'));
        this.ruleFor(m => m.toDate).isValidDate().when(m => m.searchFilter == MasterAssignmentSearchCriteriaFilter.ByCompanyName).withMessage(this.getMessage('GL_INPUT_DATE_E'));
        this.ruleFor(m => m.companyName).must((obj) => {
            return EPZEUValidationHelper.hasAnyCharNotInSpecialCharCodes(obj.companyName);
        }).when(x => !ObjectHelper.isStringNullOrEmpty(x.companyName) && x.searchFilter == MasterAssignmentSearchCriteriaFilter.ByCompanyName).withMessage(this.getMessage('GL_NOSELECT_SEARCH_CRITERIA_E'));
    }

    public validate(obj: MasterAssignmentSearchCriteria): boolean {
        let isValid = super.validate(obj);

        if (isValid) {
            if (obj.searchFilter == MasterAssignmentSearchCriteriaFilter.ByCompanyName) {
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

                    if (obj.toDate.diff(obj.fromDate, 'months') >= 12) {
                        obj.addError(this.getMessage('CR_GL_00001_E')); //Периодът за търсене не може да е по-голям от една година. TRIR-4083
                        return false;
                    }
                }

                if (!moment.isMoment(obj.fromDate) || !moment.isMoment(obj.toDate)) {
                    if (!moment.isMoment(obj.fromDate) && !moment.isMoment(obj.toDate)) {
                        if (ObjectHelper.isStringNullOrEmpty(obj.companyName)) {
                            //Моля, въведете име на фирма или период за търсене
                            obj.addError(this.getMessage('CR_GL_INPUT_NAME_PERIOD_E'));
                            return false;
                        }
                    } else {
                        //Моля, въведете период за търсене. -TRIR-2474
                        obj.addError(this.getMessage('CR_GL_INPUT_PERIOD_E'));
                        return false;
                    }
                }
            } else if (obj.searchFilter == MasterAssignmentSearchCriteriaFilter.ByOutgoingIncomingNumber) {
                if (ObjectHelper.isStringNullOrEmpty(obj.outgoingIncomingNumber) && ObjectHelper.isNullOrUndefined(obj.outgoingNumberDate)) {
                    //Моля, въведете номер на акт.
                    obj.addError(this.getMessage('CR_GL_INPUT_ACT_NUMBER_E'));
                    return false;
                }

                if (ObjectHelper.isStringNullOrEmpty(obj.outgoingIncomingNumber)) {
                    //Моля, въведете номер на акт.
                    obj.addError(this.getMessage('CR_GL_INPUT_ACT_NUMBER_E'));
                    return false;
                }

                if (moment.isMoment(obj.outgoingNumberDate) && obj.outgoingNumberDate > moment().endOf('day')) {
                    obj.addError(this.getMessage('GL_NO_CAN_EXECUTE_DATE_E'));
                    return false;
                }
            } else {
                if (ObjectHelper.isStringNullOrEmpty(obj.incomingNumber)) {
                    obj.addError(this.getMessage('GL_INPUT_INCOMING_NO_E'));
                    return false;
                }
            }
        }

        return isValid;
    }
}