import { ObjectHelper } from 'Cnsys.Core';
import { EPZEUBaseValidator } from 'EPZEU.Core';
import { IApplicationFormValidationContext } from 'EPZEU.PR.ApplicationBase';
import { IndividualValidator } from "../../Validators/IndividualValidator";
import { ApplicantData } from '../ApplicantData';

export class ApplicantDataInUpcomingDealValidator extends EPZEUBaseValidator<ApplicantData, IApplicationFormValidationContext> {
     
  constructor() {
    super();
    this.ruleFor(model => model.individual).setValidator(new IndividualValidator());
  }

  public validate(obj: ApplicantData): boolean {
    let isValid = super.validate(obj);

    if (ObjectHelper.isStringNullOrEmpty(obj.applicantType)) {
      isValid = false;
      obj.addError('applicantType', this.getMessage('PR_APP_TYPE_APPLICANT_E')); // Изберете вид на заявителя
    }

    if ((ObjectHelper.isStringNullOrEmpty(obj.applicantType) == false) && ObjectHelper.isStringNullOrEmpty(obj.applicantCategory.id)) {
      isValid = false;
      obj.addError('applicantCategory', this.getMessage('PR_APP_QUALITY_OF_PERSON_UPCOMING_DEAL_E')); // Посочете качество на лицето, което декларира предстояща сделка.
    }

    return isValid;
  }
}
