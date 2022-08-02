import { IApplicationFormValidationContext } from "EPZEU.PR.ApplicationBase";
import { PersonSubjectOfReportSection } from "../PersonSubjectOfReportSection";
import { EPZEUBaseValidator } from "EPZEU.Core";
import { RequestForReportOfPersonValidator } from "../../Validators/RequestForReportOfPersonValidator";

export class PersonSubjectOfReportValidator extends EPZEUBaseValidator<PersonSubjectOfReportSection, IApplicationFormValidationContext>  {
  constructor() {
    super();
    
    this.ruleFor(m => m.requestsForReportOfPerson).notEmpty().withMessage(this.getMessage('PR_APP_00033_INQ_E'));
    this.ruleFor(m => m.requestsForReportOfPerson).setCollectionValidator( new RequestForReportOfPersonValidator());
  }

  public validate(obj: PersonSubjectOfReportSection): boolean {
    let isValid = super.validate(obj);

    return isValid;
  }
}
