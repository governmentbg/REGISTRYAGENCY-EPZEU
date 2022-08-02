import { ApplicantType, ApplicationFormBaseValidator } from 'EPZEU.PR.ApplicationBase';
import { ActRequestingACopyValidator } from "../../Sections/Validators/ActRequestingACopyValidator";
import { ApplicantDataWithQualityValidator } from '../../Sections/Validators/ApplicantDataWithQualityValidator';
import { ContactDataValidator } from "../../Sections/Validators/ContactDataValidator";
import { ApplicationForCertifiedCopy } from "../ApplicationForCertifiedCopy";
import { ServiceRecipientValidator } from "../../Sections/Validators/ServiceRecipientValidator";
import {GDPRAgreementValidator} from "../../Sections/Validators/GdprAgreementValidator";
import {CertifiedCopyDocumentsValidator} from "../../../../EPZEU.PR.ApplicationBase/Models/Validators/CertifiedCopyDocumentsValidator";
import {EmptyDocumentsValidator} from "EPZEU.PR.ApplicationBase/Models/Validators/EmptyDocumentsValidator";


export class ApplicationForCertifiedCopyValidator extends ApplicationFormBaseValidator<ApplicationForCertifiedCopy> {

  constructor() {
    super();

    this.ruleFor(model => model.applicantData).setValidator(new ApplicantDataWithQualityValidator());
    this.ruleFor(model => model.serviceRecipient).setValidator(new ServiceRecipientValidator());
    this.ruleFor(model => model.actRequestingACopy).setValidator(new ActRequestingACopyValidator());
    this.ruleFor(model => model.contactData).setValidator(new ContactDataValidator());
    this.ruleFor(model => model.documents).setValidator(new EmptyDocumentsValidator()).when(m => m.applicantData.applicantType != ApplicantType.Attorney);
    this.ruleFor(model => model.documents).setValidator(new CertifiedCopyDocumentsValidator).when(m => m.applicantData.applicantType == ApplicantType.Attorney);
    this.ruleFor(model => model.gdprAgreement).setValidator(new GDPRAgreementValidator());
  }

  public validate(obj: ApplicationForCertifiedCopy): boolean {
    let isValid = super.validate(obj);

    if(!isValid){
      obj.addError(this.getMessage("PR_APP_00033_E"));
    }

    return isValid;
  }
}
