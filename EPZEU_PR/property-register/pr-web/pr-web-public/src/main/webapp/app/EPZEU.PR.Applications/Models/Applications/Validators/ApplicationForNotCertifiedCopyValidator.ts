import { ApplicationFormBaseValidator } from 'EPZEU.PR.ApplicationBase';
import { ActRequestingACopyValidator } from '../../Sections/Validators/ActRequestingACopyValidator';
import { ContactDataValidator } from "../../Sections/Validators/ContactDataValidator";
import { ApplicationForNotCertifiedCopy } from '../ApplicationForNotCertifiedCopy';
import { IndividualValidator } from "../../Validators/IndividualValidator";
import {GDPRAgreementValidator} from "../../Sections/Validators/GdprAgreementValidator";

export class ApplicationForNotCertifiedCopyValidator extends ApplicationFormBaseValidator<ApplicationForNotCertifiedCopy> {

  constructor() {
    super();

    this.ruleFor(model => model.applicantData).setValidator(new IndividualValidator());
    this.ruleFor(model => model.actRequestingACopy).setValidator(new ActRequestingACopyValidator());
    this.ruleFor(model => model.contactData).setValidator(new ContactDataValidator());
    this.ruleFor(model => model.gdprAgreement).setValidator(new GDPRAgreementValidator());
  }

  public validate(obj: ApplicationForNotCertifiedCopy): boolean {
    let isValid = super.validate(obj);

    if(!isValid){
      obj.addError(this.getMessage("PR_APP_00033_E"));
    }
    return isValid;
  }
}
