import { ApplicationFormBaseValidator } from "EPZEU.PR.ApplicationBase";
import { GroupReportForPerson } from "../GroupReportForPerson";
import { PersonSubjectOfReportValidator } from "../../Sections/Validators/PersonSubjectOfReportValidator";
import {GDPRAgreementValidator} from "../../../../EPZEU.PR.Applications/Models/Sections/Validators/GdprAgreementValidator";

export class ReportForPersonValidator extends ApplicationFormBaseValidator<GroupReportForPerson> {
  constructor() {
    super();

    this.ruleFor(m => m.personSubjectOfReportSection).notNull();
    this.ruleFor(m => m.personSubjectOfReportSection).setValidator(new PersonSubjectOfReportValidator());
    this.ruleFor(model => model.gdprAgreement).setValidator(new GDPRAgreementValidator());
  }

  public validate(obj: GroupReportForPerson): boolean {
    let isValid = super.validate(obj);

    if(!isValid) {
      if (obj.personSubjectOfReportSection.requestsForReportOfPerson.length == 0) {
        //No subject for report
        obj.addError(this.getMessage("PR_APP_00033_INQ_E"));
      } else {
        obj.addError(this.getMessage("PR_APP_00033_E"));
      }
    }

    return isValid;
  }
}
