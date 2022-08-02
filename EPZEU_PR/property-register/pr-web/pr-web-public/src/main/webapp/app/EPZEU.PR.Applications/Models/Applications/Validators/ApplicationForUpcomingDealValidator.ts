import { ApplicationFormBaseValidator } from 'EPZEU.PR.ApplicationBase';
import { ApplicantDataInUpcomingDealValidator } from '../../Sections/Validators/ApplicantDataInUpcomingDealValidator';
import { UpcomingDealValidator } from '../../Sections/Validators/UpcomingDealValidator';
import { ApplicationForUpcomingDeal } from '../ApplicationForUpcomingDeal';
import {GDPRAgreementValidator} from "../../Sections/Validators/GdprAgreementValidator";

export class ApplicationForUpcomingDealValidator extends ApplicationFormBaseValidator<ApplicationForUpcomingDeal> {

  constructor() {
    super();

    this.ruleFor(model => model.applicantData).setValidator(new ApplicantDataInUpcomingDealValidator());
    this.ruleFor(model => model.upcomingDealForProperty).setValidator(new UpcomingDealValidator());
    this.ruleFor(model => model.gdprAgreement).setValidator(new GDPRAgreementValidator());
  }

  public validate(obj: ApplicationForUpcomingDeal): boolean {
    let isValid = super.validate(obj);

    if(!isValid){
      obj.addError(this.getMessage("PR_APP_00033_E"));
    }
    return isValid;
  }
}
