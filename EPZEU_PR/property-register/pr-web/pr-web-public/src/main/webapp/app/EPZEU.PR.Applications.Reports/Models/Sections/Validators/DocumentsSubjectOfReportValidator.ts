import { IApplicationFormValidationContext } from "EPZEU.PR.ApplicationBase";
import { EPZEUBaseValidator } from "EPZEU.Core";
import { DocumentSubjectOfReportSection } from "../DocumentSubjectOfReportSection";

export class DocumentsSubjectOfReportValidator extends EPZEUBaseValidator<DocumentSubjectOfReportSection, IApplicationFormValidationContext> {

  constructor() {
    super();
    this.ruleFor(model => model.requestsForReportOfDocument).notEmpty().withMessage(this.getMessage('PR_APP_00033_INQ_E'));
  }

  public validate(obj: DocumentSubjectOfReportSection): boolean {
    let isValid = super.validate(obj);

    return isValid;
  }
}
