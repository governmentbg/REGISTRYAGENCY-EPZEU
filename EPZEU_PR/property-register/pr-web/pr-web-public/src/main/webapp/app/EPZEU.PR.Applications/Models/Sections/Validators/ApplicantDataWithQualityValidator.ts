import { EPZEUBaseValidator } from 'EPZEU.Core';
import { IApplicationFormValidationContext } from 'EPZEU.PR.ApplicationBase';
import { ApplicantData } from '../ApplicantData';
import { ObjectHelper } from 'Cnsys.Core';
import { IndividualValidator } from "../../Validators/IndividualValidator";

export class ApplicantDataWithQualityValidator extends EPZEUBaseValidator<ApplicantData, IApplicationFormValidationContext> {

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
      obj.addError('applicantCategory', this.getMessage('PR_APP_GROUNDS_FOR_ISSUING_THE_COPY_E')); // Посочете качество на лицето, което иска заверен препис
    }

    return isValid;
  }
}
