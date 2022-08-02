import { IApplicationFormValidationContext, PeriodForReportValidator } from "EPZEU.PR.ApplicationBase";
import { EPZEUBaseValidator } from "EPZEU.Core";
import {RequestForReportOfProperty} from "../RequestForReportOfProperty";

export class RequestForReportOfPropertyValidator extends EPZEUBaseValidator<RequestForReportOfProperty, IApplicationFormValidationContext>  {
  constructor() {
    super();

    this.ruleFor(m => m.periodForReport).setValidator( new PeriodForReportValidator());
  }

  public validate(obj: RequestForReportOfProperty): boolean {
    let isValid = super.validate(obj);

    return isValid;
  }
}
