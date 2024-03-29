import { IApplicationFormValidationContext, PersonType } from 'EPZEU.PR.ApplicationBase';
import { EPZEUBaseValidator } from 'EPZEU.Core';
import { Person } from '../Person';
import { LegalEntityValidator } from './LegalEntityValidator';
import {IndividualValidatorWithoutBirthPlaceAndIdentity} from "./IndividualValidatorWithoutBirthPlaceAndIdentity";

export class PersonValidatorWithoutBirthPlaceAndIdentity extends EPZEUBaseValidator<Person, IApplicationFormValidationContext> {

  constructor() {
    super();

    this.ruleFor(m => m.type).notEmpty().withMessage(this.getMessage('PR_APP_00058_E'));
    this.ruleFor(m => m.individual).setValidator(new IndividualValidatorWithoutBirthPlaceAndIdentity()).when(m => m.type == PersonType.INDIVIDUAL);
    this.ruleFor(m => m.legalEntity).setValidator(new LegalEntityValidator()).when(m => m.type == PersonType.LEGAL_ENTITY);
  }

  public validate(obj: Person): boolean {
    let isValid = super.validate(obj);

    return isValid;
  }
}
