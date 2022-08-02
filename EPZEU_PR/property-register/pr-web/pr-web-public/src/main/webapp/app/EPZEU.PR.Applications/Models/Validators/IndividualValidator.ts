import { ObjectHelper } from "Cnsys.Core";
import { EPZEUBaseValidator } from 'EPZEU.Core';
import { Constants } from 'EPZEU.PR.Core';
import {
  CoreValidators,
  EIKValidator,
  IApplicationFormValidationContext,
  IndentTypes
} from 'EPZEU.PR.ApplicationBase';
import {ApplicantNameValidator} from './ApplicantNameValidator';
import {PersonalNationalityValidator} from "./PersonalNationalityValidator";
import { Individual } from '../Individual';
import {BirthPlaceValidator} from "./BirthPlaceValidator";

export class IndividualValidator extends EPZEUBaseValidator<Individual, IApplicationFormValidationContext> {

  constructor() {
    super();
    this.ruleFor(m => m.identity).notEmpty().withMessage(this.getMessage('GL_INPUT_PERSON_ID_BIRTHDATE_E'));
    this.ruleFor(m => m.personNationality).setValidator(new PersonalNationalityValidator());
    this.ruleFor(m => m.name).setValidator(new ApplicantNameValidator());
    this.ruleFor(m => m.identity).matches('^(([0-9]){8})$|^(([0-9]){10})$').withMessage(this.getMessage('GL_INVALID_IDENTIFIER_E')).when(m => !ObjectHelper.isStringNullOrEmpty(m.identity));
    this.ruleFor(m => m.birthPlace).setValidator(new BirthPlaceValidator()).when(m => CoreValidators.getIdentType(m.identity) == IndentTypes.BirthDate);
  }

  public validate(obj: Individual): boolean {
    let isValid = super.validate(obj);

    let type = CoreValidators.getIdentType(obj.identity);

    if (!ObjectHelper.isStringNullOrEmpty(obj.identity) && obj.getPropertyErrors('identity').length == 0) {

      if (type == IndentTypes.Undefined || obj.identity === "0000000000") {
        obj.addError('identity', this.getMessage('GL_INVALID_IDENTIFIER_E'));
        isValid = false;
      }
       if ((type == IndentTypes.BirthDate || type == IndentTypes.LNCH) &&
           (obj.personNationality && (obj.personNationality.code_ISO3166 == Constants.BG_COUNTRY_CODE))) {
           obj.addError('identity', this.getMessage('PR_GL_00001_E'));
           isValid = false;
       }
    }

    if(type != IndentTypes.BirthDate) {
      obj.birthPlace.clearErrors();
    }

    let applicantNameMsg = this.getMessage('GL_INPUT_CORRECT_NAME_E');
    if (obj.personNationality && (obj.personNationality.code_ISO3166 == Constants.BG_COUNTRY_CODE)) {

      if (obj.name.firstName && (obj.name.getPropertyErrors('firstName').length == 0) && !obj.name.firstName.match('^[А-Яа-я-\' ]+$')) {
        obj.name.addError('firstName', applicantNameMsg);
        isValid = false;
      }
      if (obj.name.familyName && (obj.name.getPropertyErrors('familyName').length == 0) && !obj.name.familyName.match('^[А-Яа-я-\' ]+$')) {
        obj.name.addError('familyName', applicantNameMsg);
        isValid = false;
      }
      if (obj.name.surName && (obj.name.getPropertyErrors('surName').length == 0) && !obj.name.surName.match('^[А-Яа-я-\' ]+$')) {
        obj.name.addError('surName', applicantNameMsg);
        isValid = false;
      }

    } else {
      if (this.anyValidName('^[А-Яа-я-\' ]+$', obj) && this.anyValidName('^[A-Za-z-\' ]+$', obj)) {
        if (obj.name.firstName && (obj.name.getPropertyErrors('firstName').length == 0)) {
          obj.name.addError("firstName", applicantNameMsg);
          isValid = false;
        }
        if (obj.name.familyName && (obj.name.getPropertyErrors('familyName').length == 0)) {
          obj.name.addError("familyName", applicantNameMsg);
          isValid = false;
        }
        if (obj.name.surName && (obj.name.getPropertyErrors('surName').length == 0)) {
          obj.name.addError("surName", applicantNameMsg);
          isValid = false;
        }
      }
    }


    if (obj.bulstat) {
      if (!EIKValidator.validate(obj.bulstat.toString())) {
        obj.addError('bulstat', this.getMessage('GL_INVALID_IDENTIFIER_E'));
        isValid = false;
      }
    }

    return isValid;
  }

  private anyValidName(regex: string, obj: Individual) {
    let isValidFirstName: boolean;
    let isValidFamilyName: boolean;
    let isValidSurName: boolean;

    isValidFirstName = obj.name.firstName && !!obj.name.firstName.match(regex);

    isValidFamilyName = obj.name.familyName && !!obj.name.familyName.match(regex);

    isValidSurName = obj.name.surName && !!obj.name.surName.match(regex);

    return isValidFirstName || isValidFamilyName || isValidSurName;
  }
}
