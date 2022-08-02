import { EPZEUBaseValidator } from 'EPZEU.Core';
import { Constants } from 'EPZEU.PR.Core';
import { IApplicationFormValidationContext } from 'EPZEU.PR.ApplicationBase';
import { LegalEntity } from '../LegalEntity';
import { CountryValidator } from "./CountryValidator";
import {CompanyCaseValidator} from "./CompanyCaseValidator";
import {ObjectHelper} from "../../../Cnsys.Core/Common";

export class LegalEntityWithRequiredBulstatOrCompanyCaseValidator extends EPZEUBaseValidator<LegalEntity,IApplicationFormValidationContext> {

  constructor() {
    super();
    this.ruleFor(m => m.country).setValidator(new CountryValidator());
    this.ruleFor(m => m.companyName).notEmpty().withMessage(this.getMessage('PR_APP_INPUT_COMPANY_NAME_AND LEGAL_FORM_E'));
    this.ruleFor(m => m.legalEntityNumber).isValidBULSTAT().withMessage(this.getMessage('GL_INVALID_IDENTIFIER_E'));
    this.ruleFor(m => m.companyCase).setValidator(new CompanyCaseValidator());

  }

  public validate(obj: LegalEntity): boolean {
    let isValid = super.validate(obj);

    if(obj.country && obj.country.code_ISO3166 == Constants.BG_COUNTRY_CODE){

      if(!obj.legalEntityNumber &&(!obj.companyCase || !obj.companyCase.number || !obj.companyCase.year || !obj.companyCase.registrationCourt || !obj.companyCase.registrationCourt.name)){
        obj.addError(this.getMessage('PR_APP_INPUT_00001_E'));
        isValid = false;
      }

      if(obj.companyCase && obj.companyCase.year && !obj.companyCase.year.toString().match('^\\d{4}')){
        if(ObjectHelper.isArrayNullOrEmpty(obj.companyCase.getErrors())){
          obj.companyCase.addError('year',this.getMessage('GL_INPUT_YEAR_VALUE_E'));
        }
        isValid = false;
      }
      else{
        if(obj.companyCase) {
          obj.companyCase.clearErrors();
        }
      }

    }
    return isValid;
  }
}
