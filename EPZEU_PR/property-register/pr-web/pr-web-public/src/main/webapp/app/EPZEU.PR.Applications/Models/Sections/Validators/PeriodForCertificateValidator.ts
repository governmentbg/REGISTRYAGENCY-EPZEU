import { IApplicationFormValidationContext, PeriodForReportValidator } from 'EPZEU.PR.ApplicationBase';
import { EPZEUBaseValidator } from "EPZEU.Core";
import { PeriodForCertificate } from "../PeriodForCertificate";
import * as moment from "moment";
import {ObjectHelper} from "../../../../Cnsys.Core/Common";

export class PeriodForCertificateValidator extends EPZEUBaseValidator<PeriodForCertificate, IApplicationFormValidationContext> {

  constructor() {
    super();
    this.ruleFor(m => m.periodForReport).setValidator(new PeriodForReportValidator());
    this.ruleFor(m => m.expectedRegistrationDate).isValidDate().withMessage(this.getMessage("GL_INPUT_DATE_E")).when(m => !ObjectHelper.isStringNullOrEmpty(m.expectedRegistrationDate));
  }

  public validate(obj: PeriodForCertificate): boolean {
    let isValid = super.validate(obj);

    if(obj.expectedRegistrationDate && obj.expectedRegistrationDate.isAfter(moment(),"days")){
      obj.addError(this.getMessage('PR_APP_INVALID_DATE_E'));
      isValid = false;
    }

    return isValid;
  }
}
