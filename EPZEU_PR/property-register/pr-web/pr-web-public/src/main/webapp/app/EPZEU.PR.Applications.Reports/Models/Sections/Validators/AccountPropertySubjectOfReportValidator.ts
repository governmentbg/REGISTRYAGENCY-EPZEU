import { IApplicationFormValidationContext } from "EPZEU.PR.ApplicationBase";
import { AccountPropertySubjectOfReportSection } from "../AccountPropertySubjectOfReportSection";
import { EPZEUBaseValidator } from "EPZEU.Core";

export class AccountPropertySubjectOfReportValidator extends EPZEUBaseValidator<AccountPropertySubjectOfReportSection,IApplicationFormValidationContext> {

  constructor() {
    super();
    this.ruleFor(model => model.requestsForReportOfAccountProperty).notEmpty().withMessage(this.getMessage('PR_APP_00033_INQ_E'));
  }

  public validate(obj: AccountPropertySubjectOfReportSection): boolean {
    let isValid = super.validate(obj);

    return isValid;
  }
}
