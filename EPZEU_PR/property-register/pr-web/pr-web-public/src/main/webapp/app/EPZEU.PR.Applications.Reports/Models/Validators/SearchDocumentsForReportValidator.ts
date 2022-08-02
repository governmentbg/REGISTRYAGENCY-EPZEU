import { IApplicationFormValidationContext, SearchDocumentsForReport } from "EPZEU.PR.ApplicationBase";
import { EPZEUBaseValidator } from "EPZEU.Core";
import * as moment from "moment";
import {ObjectHelper} from "Cnsys.Core";

export class SearchDocumentsForReportValidator extends EPZEUBaseValidator<SearchDocumentsForReport, IApplicationFormValidationContext> {
  constructor() {
    super();

    this.ruleFor(m => m.volume).matches('^[0-9]*$').withMessage(this.getMessage('GL_INPUT_DIGIT_VALUE_E')).when(m => m.bookForm);
    this.ruleFor(m => m.actNumber).matches('^[0-9]*$').withMessage(this.getMessage('GL_INPUT_DIGIT_VALUE_E')).when(m => m.bookForm);
    this.ruleFor(m => m.year).notNull().withMessage(this.getMessage('GL_INPUT_YEAR_VALUE_E')).when(m => m.bookForm);
    this.ruleFor(m => m.year).matches('^[0-9]{4}$').withMessage(this.getMessage('GL_INPUT_YEAR_VALUE_E')).when(m => m.bookForm && !ObjectHelper.isStringNullOrEmpty(m.year));
    this.ruleFor(m => m.numberDoubleIncomingRegistry).matches('^(-)?[0-9]*$').withMessage(this.getMessage('GL_INPUT_DIGIT_VALUE_E')).when(m => m.doubleIncomingRegistry);
    this.ruleFor(m => m.yearDoubleIncomingRegistry).matches('^[0-9]{4}$').withMessage(this.getMessage('GL_INPUT_YEAR_VALUE_E')).when(m => m.doubleIncomingRegistry);
    this.ruleFor(m => m.numberIncomingRegistry).matches('^(-)?[0-9]*$').withMessage(this.getMessage('GL_INPUT_DIGIT_VALUE_E')).when(m => m.incomingRegistry);
    this.ruleFor(m => m.registryOfficeName).notNull().withMessage(this.getMessage('PR_APP_00020_E'));
  }

  public validate(obj: SearchDocumentsForReport): boolean {
    let isValid = super.validate(obj);
    if (!(
        (obj.actNumber && obj.year && obj.volume) ||
        (obj.numberIncomingRegistry && obj.dateIncomingRegistry) ||
        (obj.numberDoubleIncomingRegistry && obj.yearDoubleIncomingRegistry)) || !obj.registryOfficeId
    ) {
      obj.addError(this.getMessage("PR_APP_00016_E"));
      isValid = false;
    }

    if(obj.dateIncomingRegistry) {
      if (!obj.dateIncomingRegistry.isBefore(moment())) {
        obj.addError('dateIncomingRegistry',this.getMessage("PR_APP_INVALID_DATE_E"));
        isValid = false;
      }
    }

    return isValid;
  }
}
