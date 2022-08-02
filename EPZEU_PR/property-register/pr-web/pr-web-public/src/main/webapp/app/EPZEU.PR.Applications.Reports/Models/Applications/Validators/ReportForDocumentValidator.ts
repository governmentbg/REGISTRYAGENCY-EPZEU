import { ApplicationFormBaseValidator } from "EPZEU.PR.ApplicationBase";
import { GroupReportForDocument } from "../GroupReportForDocument";
import { DocumentsSubjectOfReportValidator } from "../../Sections/Validators/DocumentsSubjectOfReportValidator";
import {GDPRAgreementValidator} from "../../../../EPZEU.PR.Applications/Models/Sections/Validators/GdprAgreementValidator";

export class ReportForDocumentValidator extends ApplicationFormBaseValidator<GroupReportForDocument> {
  constructor() {
    super();

    this.ruleFor(m =>m.documentSubjectOfReportSection).notNull();
    this.ruleFor(m =>m.documentSubjectOfReportSection).setValidator(new DocumentsSubjectOfReportValidator());
    this.ruleFor(model => model.gdprAgreement).setValidator(new GDPRAgreementValidator());
  }

  public validate(obj: GroupReportForDocument): boolean {
    let isValid = super.validate(obj);

    if(!isValid){
      obj.addError(this.getMessage("PR_APP_00033_E"));
    }

    return isValid;
  }
}
