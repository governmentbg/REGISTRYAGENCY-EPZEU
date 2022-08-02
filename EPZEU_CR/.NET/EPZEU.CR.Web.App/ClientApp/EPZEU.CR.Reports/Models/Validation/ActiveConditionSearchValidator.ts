import { ActiveConditionSearch } from '../ActiveConditionSearch';
import { EPZEUBaseValidator } from 'EPZEU.Core';
import * as moment from 'moment';


export class ActiveConditionSearchValidator extends EPZEUBaseValidator<ActiveConditionSearch, any> {
    constructor() {
        super();

        this.ruleFor(m => m.uic).notEmpty().withMessage(this.getMessage('GL_INPUT_FIELD_MUST_E'));
        this.ruleFor(m => m.uic).isValidBULSTAT().withMessage(this.getMessage('GL_INVALID_IDENTIFIER_E'));
        this.ruleFor(m => m.entryDate).isValidDate().withMessage(this.getMessage('GL_INPUT_DATE_E'));
        this.ruleFor(m => m.entryDate).must(function (model, v) { return moment.isMoment(model.entryDate) ? model.entryDate <= moment().endOf('day') : true; }).withMessage(this.getMessage('GL_NO_CAN_EXECUTE_DATE_E'));
    }

    public validate(obj: ActiveConditionSearch): boolean {
        let isValid = super.validate(obj);

        return isValid;
    }
}