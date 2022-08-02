import { ObjectHelper } from "Cnsys.Core";
import { EPZEUBaseValidator } from "EPZEU.Core";
import { IApplicationFormValidationContext, PeriodForReportValidator, PersonType} from "EPZEU.PR.ApplicationBase";
import {PersonSubjectOfReportInAllRegistryOfficesSection} from "../PersonSubjectOfReportInAllRegistryOfficesSection";

export class PersonSubjectOfReportInAllRegistryOfficesValidator extends EPZEUBaseValidator<PersonSubjectOfReportInAllRegistryOfficesSection, IApplicationFormValidationContext>  {

  constructor() {
    super();
    this.ruleFor(m => m.periodForReport).setValidator(new PeriodForReportValidator());
    this.ruleFor(m => m.identity).notEmpty().withMessage(this.getMessage("GL_INPUT_PERSON_ID_E")).when(m => m.personType == PersonType.INDIVIDUAL);
    this.ruleFor(m => m.identity).isValidEGNLNCh().withMessage(this.getMessage("GL_INPUT_PERSON_ID_E")).when(m => m.personType == PersonType.INDIVIDUAL && !ObjectHelper.isStringNullOrEmpty(m.identity));
    this.ruleFor(m => m.legalEntityNumber).notEmpty().withMessage(this.getMessage("PR_APP_00050_E")).when(m => m.personType == PersonType.LEGAL_ENTITY);
    this.ruleFor(m => m.legalEntityNumber).isValidBULSTAT().withMessage(this.getMessage("PR_APP_00050_E")).when(m => m.personType == PersonType.LEGAL_ENTITY);
  }

  public validate(obj: PersonSubjectOfReportInAllRegistryOfficesSection): boolean {
    let isValid = super.validate(obj);

    return isValid;
  }

}
