import { IApplicationFormValidationContext } from "EPZEU.PR.ApplicationBase";
import { EPZEUBaseValidator } from "EPZEU.Core";
import { PropertySubjectOfReportSection } from "../PropertySubjectOfReportSection";
import { RequestForReportOfPropertyValidator } from "../../Validators/RequestForReportOfPropertyValidator";

export class PropertySubjectOfReportValidator extends EPZEUBaseValidator<PropertySubjectOfReportSection, IApplicationFormValidationContext>  {
  constructor() {
    super();
    this.ruleFor(m => m.requestsForReportOfProperty).notEmpty().withMessage(this.getMessage('PR_APP_00033_INQ_E'));
    this.ruleFor(m => m.requestsForReportOfProperty).setCollectionValidator( new RequestForReportOfPropertyValidator());
  }

  public validate(obj: PropertySubjectOfReportSection): boolean {
    let isValid = super.validate(obj);

    return isValid;
  }
}
