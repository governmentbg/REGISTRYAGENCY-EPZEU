import { IApplicationFormValidationContext, PeriodForReportValidator } from "EPZEU.PR.ApplicationBase";
import { EPZEUBaseValidator } from "EPZEU.Core";
import { RequestForReportOfPerson } from "../RequestForReportOfPerson";

export class RequestForReportOfPersonValidator extends EPZEUBaseValidator<RequestForReportOfPerson, IApplicationFormValidationContext>  {
  constructor() {
    super();

    this.ruleFor(m => m.periodForReport).setValidator(new PeriodForReportValidator());
  }

  public validate(obj: RequestForReportOfPerson): boolean {
    let isValid = super.validate(obj);

    return isValid;
  }
}
