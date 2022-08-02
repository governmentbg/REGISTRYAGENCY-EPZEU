import { IApplicationFormValidationContext } from './ApplicationFormValidationContext';
import { EPZEUBaseValidator } from 'EPZEU.Core';
import { PeriodForReport } from "../PeriodForReport";
import * as moment from "moment";
import { ObjectHelper } from "Cnsys.Core";

export class PeriodForReportValidator extends EPZEUBaseValidator<PeriodForReport, IApplicationFormValidationContext> {

  constructor() {
    super();
    //this.ruleFor(m => m.startDate).isValidDate().withMessage(this.getMessage("GL_INPUT_DATE_E")).when(m => !ObjectHelper.isStringNullOrEmpty(m.startDate));
    //this.ruleFor(m => m.endDate).isValidDate().withMessage(this.getMessage("GL_INPUT_DATE_E")).when(m => !ObjectHelper.isStringNullOrEmpty(m.endDate));
  }

  public validate(obj: PeriodForReport): boolean {
    let isValid = super.validate(obj);

    if(ObjectHelper.isNullOrUndefined(obj.startDate)){
      obj.addError(this.getMessage('PR_APP_00067_E'));
      isValid = false;
    }

    if(!ObjectHelper.isNullOrUndefined(obj.endDate) && (obj.endDate.isBefore(obj.startDate,"days"))){
      obj.addError(this.getMessage('PR_APP_00073_E'));
      isValid = false;
    }

    // Less then 100 year period
    if(!ObjectHelper.isNullOrUndefined(obj.startDate) && !ObjectHelper.isNullOrUndefined(obj.endDate) && moment("2000-01-01").diff(moment("1900-01-01")) - obj.endDate.diff(obj.startDate) < 0){
      obj.addError(this.getMessage('PR_APP_00073_E'));
      isValid = false;
    }

    if(obj.endDate && obj.endDate.isAfter(moment(),'days') || obj.startDate && obj.startDate.isAfter(moment(),'days')) {
      obj.addError(this.getMessage('PR_APP_INVALID_DATE_E'));
      isValid = false;
    }

    if (obj.startDate && obj.minStartDate && obj.startDate.isBefore(obj.minStartDate, 'days')) {
      obj.addError(this.getMessage("PR_APP_00073_E"));
      isValid = false;
    }

    return isValid;
  }
}
