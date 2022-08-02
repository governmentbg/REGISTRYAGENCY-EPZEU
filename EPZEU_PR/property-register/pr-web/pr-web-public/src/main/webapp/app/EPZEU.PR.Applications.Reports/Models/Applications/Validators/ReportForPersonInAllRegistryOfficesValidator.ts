import { ApplicationFormBaseValidator } from "EPZEU.PR.ApplicationBase";
import { RequestForReportForPersonInAllRegistryOffices } from "../ReportForPersonInAllRegistryOffices";
import { PersonSubjectOfReportInAllRegistryOfficesValidator } from "../../Sections/Validators/PersonSubjectOfReportInAllRegistryOfficesValidator";
import {GDPRAgreementValidator} from "../../../../EPZEU.PR.Applications/Models/Sections/Validators/GdprAgreementValidator";

export class ReportForPersonInAllRegistryOfficesValidator extends ApplicationFormBaseValidator<RequestForReportForPersonInAllRegistryOffices> {
  constructor() {
    super();
    this.ruleFor(m => m.personSubjectOfReportInAllRegistryOfficesSection).setValidator(new PersonSubjectOfReportInAllRegistryOfficesValidator());
    this.ruleFor(model => model.gdprAgreement).setValidator(new GDPRAgreementValidator());
  }

  public validate(obj: RequestForReportForPersonInAllRegistryOffices): boolean {
    let isValid = super.validate(obj);

    if(!isValid){
        obj.addError(this.getMessage("PR_APP_00033_E")); // В заявлението има непопълнена или невалидна информация, отбелязана в червено.
    }

    return isValid;
  }

}
