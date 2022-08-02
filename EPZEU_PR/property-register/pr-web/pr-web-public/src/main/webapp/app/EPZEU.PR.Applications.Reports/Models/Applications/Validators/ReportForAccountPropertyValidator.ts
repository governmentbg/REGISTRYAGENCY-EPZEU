import { ApplicationFormBaseValidator } from "EPZEU.PR.ApplicationBase";
import { GroupReportForAccountProperty } from "../GroupReportForAccountProperty";
import { AccountPropertySubjectOfReportValidator } from "../../Sections/Validators/AccountPropertySubjectOfReportValidator";
import {GDPRAgreementValidator} from "../../../../EPZEU.PR.Applications/Models/Sections/Validators/GdprAgreementValidator";

export class ReportForAccountPropertyValidator extends ApplicationFormBaseValidator<GroupReportForAccountProperty> {

  constructor() {
    super();

    this.ruleFor(model => model.accountPropertySubjectOfReportSection).notNull();
    this.ruleFor(model => model.accountPropertySubjectOfReportSection).setValidator(new AccountPropertySubjectOfReportValidator());
    this.ruleFor(model => model.gdprAgreement).setValidator(new GDPRAgreementValidator());
  }

  public validate(obj: GroupReportForAccountProperty): boolean {
    let isValid = super.validate(obj);

    if(!isValid){
      obj.addError(this.getMessage("PR_APP_00033_E"));
    }

    return isValid;
  }
}
