import { ApplicationFormBaseValidator } from 'EPZEU.PR.ApplicationBase';
import { ApplicationForCertificateForPerson } from "../ApplicationForCertificateForPerson";
import { WayOfProvisionValidator } from "../../Sections/Validators/WayOfProvisionValidator";
import { ContactDataValidator } from "../../Sections/Validators/ContactDataValidator";
import { IndividualValidator } from "../../Validators/IndividualValidator";
import { PersonValidator } from "../../Validators/PersonValidator";
import {GDPRAgreementValidator} from "../../Sections/Validators/GdprAgreementValidator";
import {DocumentsValidator} from "../../../../EPZEU.PR.ApplicationBase/Models/Validators/DocumentsValidator";

export class ApplicationForCertificateForPersonValidator extends ApplicationFormBaseValidator<ApplicationForCertificateForPerson> {

  constructor() {
    super();

    this.ruleFor(model => model.applicantData).setValidator(new IndividualValidator());
    this.ruleFor(model => model.requestedPerson).setValidator(new PersonValidator());
    this.ruleFor(model => model.wayOfProvision).setValidator(new WayOfProvisionValidator());
    this.ruleFor(model => model.contactData).setValidator(new ContactDataValidator());
    this.ruleFor(model => model.documents).setValidator(new DocumentsValidator());
    this.ruleFor(model => model.gdprAgreement).setValidator(new GDPRAgreementValidator());
  }

  public validate(obj: ApplicationForCertificateForPerson): boolean {
    let isValid = super.validate(obj);

    if(!isValid){
      obj.addError(this.getMessage("PR_APP_00033_E"));
    }
    return isValid;
  }
}
