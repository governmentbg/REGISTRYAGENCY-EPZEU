import { ApplicationFormBaseValidator } from 'EPZEU.PR.ApplicationBase';
import { ApplicationForCertificateForProperty } from "../ApplicationForCertificateForProperty";
import { RequestedPropertyValidator } from "../../Sections/Validators/RequestedPropertyValidator";
import { CurrentOwnersValidator } from "../../Sections/Validators/CurrentOwnersValidator";
import { PreviousOwnersValidator } from "../../Sections/Validators/PreviousOwnersValidator";
import { WayOfProvisionValidator } from "../../Sections/Validators/WayOfProvisionValidator";
import { ContactDataValidator } from "../../Sections/Validators/ContactDataValidator";
import { IndividualValidator } from "../../Validators/IndividualValidator";
import {GDPRAgreementValidator} from "../../Sections/Validators/GdprAgreementValidator";
import {DocumentsValidator} from "../../../../EPZEU.PR.ApplicationBase/Models/Validators/DocumentsValidator";

export class ApplicationForCertificateForPropertyValidator extends ApplicationFormBaseValidator<ApplicationForCertificateForProperty> {

  constructor() {
    super();

    this.ruleFor(model => model.applicantData).setValidator(new IndividualValidator());
    this.ruleFor(model => model.requestedProperty).setValidator(new RequestedPropertyValidator());
    this.ruleFor(model => model.currentOwners).setValidator(new CurrentOwnersValidator());
    this.ruleFor(model => model.previousOwners).setValidator(new PreviousOwnersValidator());
    this.ruleFor(model => model.wayOfProvision).setValidator(new WayOfProvisionValidator());
    this.ruleFor(model => model.contactData).setValidator(new ContactDataValidator());
    this.ruleFor(model => model.documents).setValidator(new DocumentsValidator());
    this.ruleFor(model => model.gdprAgreement).setValidator(new GDPRAgreementValidator());
  }

  public validate(obj: ApplicationForCertificateForProperty): boolean {
    let isValid = super.validate(obj);

    if(!isValid){
      obj.addError(this.getMessage("PR_APP_00033_E"));
    }
    return isValid;
  }
}
