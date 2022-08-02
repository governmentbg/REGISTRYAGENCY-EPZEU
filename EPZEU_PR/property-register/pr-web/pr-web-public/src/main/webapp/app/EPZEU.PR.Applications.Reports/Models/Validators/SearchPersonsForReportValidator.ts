import { EPZEUBaseValidator } from "EPZEU.Core";
import { IApplicationFormValidationContext, PersonType } from "EPZEU.PR.ApplicationBase";
import { SearchPersonsOfReport } from "../SearchPersonsOfReport";
import { IndividualSearchCriteriaValidator } from "./IndividualSearchCriteriaValidator";
import { LegalEntitySearchCriteriaValidator } from "./LegalEntitySearchCriteriaValidator";

export class SearchPersonsForReportValidator extends EPZEUBaseValidator<SearchPersonsOfReport, IApplicationFormValidationContext> {


  constructor() {
    super();

    this.ruleFor(m => m.individualSearchCriteria).setValidator(new IndividualSearchCriteriaValidator()).when(m => m.type == PersonType.INDIVIDUAL);
    this.ruleFor(m => m.legalEntitySearchCriteria).setValidator(new LegalEntitySearchCriteriaValidator()).when(m => m.type == PersonType.LEGAL_ENTITY);
  }

  public validate(obj: SearchPersonsOfReport): boolean {
    let isValid = super.validate(obj);

    if (!obj.type && obj.items.length == 0) {
      obj.addError(this.getMessage('PR_APP_00058_E'));
      isValid = false;
    }

    return isValid;
  }
}
