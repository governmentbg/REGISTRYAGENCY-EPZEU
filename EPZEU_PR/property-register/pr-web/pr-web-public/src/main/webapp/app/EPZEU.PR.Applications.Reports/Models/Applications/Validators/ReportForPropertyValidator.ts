import { ApplicationFormBaseValidator } from "EPZEU.PR.ApplicationBase";
import { GroupReportForProperty } from "../GroupReportForProperty";
import { PropertySubjectOfReportValidator } from "../../Sections/Validators/PropertySubjectOfReportValidator";
import {GDPRAgreementValidator} from "../../../../EPZEU.PR.Applications/Models/Sections/Validators/GdprAgreementValidator";

export  class ReportForPropertyValidator extends ApplicationFormBaseValidator<GroupReportForProperty> {

  constructor() {
    super();

    this.ruleFor(m => m.propertySubjectOfReportSection).notNull();
    this.ruleFor(m => m.propertySubjectOfReportSection).setValidator(new PropertySubjectOfReportValidator());
    this.ruleFor(model => model.gdprAgreement).setValidator(new GDPRAgreementValidator());
  }

  public validate(obj: GroupReportForProperty): boolean {
    let isValid = super.validate(obj);

    if(!isValid){
      if(obj.propertySubjectOfReportSection.requestsForReportOfProperty.length == 0){
        //No subject for report
        obj.addError(this.getMessage("PR_APP_00033_INQ_E"));
      }else{
        obj.addError(this.getMessage("PR_APP_00033_E"));
      }
    }

    return isValid;
  }
}
