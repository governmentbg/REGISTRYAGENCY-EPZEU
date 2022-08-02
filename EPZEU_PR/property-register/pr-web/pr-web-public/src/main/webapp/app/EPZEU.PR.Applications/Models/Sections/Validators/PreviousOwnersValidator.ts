import {
  CoreValidators,
  EIKValidator,
  IApplicationFormValidationContext,
  IndentTypes,
  PersonType
} from 'EPZEU.PR.ApplicationBase';
import { EPZEUBaseValidator } from "EPZEU.Core";
import { Owners } from "../Owners";
import { PropertyDocumentValidator } from "./PropertyDocumentValidator";
import {PersonValidatorWithoutBirthPlaceAndIdentity} from "../../Validators/PersonValidatorWithoutBirthPlaceAndIdentity";

export class PreviousOwnersValidator extends EPZEUBaseValidator<Owners, IApplicationFormValidationContext> {

  constructor() {
    super();

    this.ruleFor(m => m.persons).setCollectionValidator(new PersonValidatorWithoutBirthPlaceAndIdentity());
    this.ruleFor(m => m.propertyDocuments).setCollectionValidator(new PropertyDocumentValidator());
  }

  public validate(obj: Owners): boolean {
    let isValid = super.validate(obj);


    if(obj.persons && obj.persons.length > 1) {
      for (let i = 0; i < obj.persons.length; i++) {
        if (!obj.persons[i].type) {
          obj.persons[i].clearErrors();
          obj.persons[i].addError(this.getMessage('PR_APP_00108_E'));
          isValid = false;
        }
      }
    }

    if(this.duplicatedIndividualIdentity(obj) || this.duplicatedIndividualBulstat(obj)) {
      obj.addError("duplicatedIdentifierIndividual", this.getMessage("PR_APP_00101_E"));
      isValid = false;
    }

    if(this.duplicatedLegalEntityBulstat(obj)) {
      obj.addError("duplicatedIdentifierLegalEntity", this.getMessage("PR_APP_00103_E"));
      isValid = false;
    }

    if(obj.propertyDocuments && obj.propertyDocuments.length > 1){
      for (let i  = 0;i < obj.propertyDocuments.length; i++){
        if(!obj.propertyDocuments[i].type){
          obj.propertyDocuments[i].clearErrors();
          obj.propertyDocuments[i].addError(this.getMessage('PR_APP_00108_E'));
          isValid = false;
        }
      }
    }

    return isValid;
  }

  private duplicatedIndividualIdentity(obj: Owners): boolean {
    if(obj.persons && obj.persons.length > 1){
      let duplicatedIdentifiers = obj.persons
        .filter(p => p.type == PersonType.INDIVIDUAL &&
          p.individual &&
          p.individual.identity &&
          (CoreValidators.getIdentType(p.individual.identity) == IndentTypes.EGN || CoreValidators.getIdentType(p.individual.identity) == IndentTypes.LNCH))
        .map(p => p.individual.identity);

      let isDuplicated = duplicatedIdentifiers.filter((item, index) => duplicatedIdentifiers.indexOf(item) != index).length > 0;

      if(isDuplicated) {
        return true;
      }
    }
    return false;
  }

  private duplicatedIndividualBulstat(obj: Owners): boolean {
    if(obj.persons && obj.persons.length > 1){
      let duplicatedIdentifiers = obj.persons
        .filter(p => p.type == PersonType.INDIVIDUAL &&
          p.individual &&
          p.individual.bulstat &&
          EIKValidator.validate(p.individual.bulstat.toString()))
        .map(p => p.individual.bulstat);

      let isDuplicated = duplicatedIdentifiers.filter((item, index) => duplicatedIdentifiers.indexOf(item) != index).length > 0;

      if(isDuplicated) {
        return true;
      }
    }
    return false;
  }

  private duplicatedLegalEntityBulstat(obj: Owners): boolean {
    if(obj.persons && obj.persons.length > 1){
      let duplicatedIdentifiers = obj.persons
        .filter(p => p.type == PersonType.LEGAL_ENTITY &&
          p.legalEntity &&
          p.legalEntity.legalEntityNumber &&
          EIKValidator.validate(p.legalEntity.legalEntityNumber))
        .map(p => p.legalEntity.legalEntityNumber);

      let isDuplicated = duplicatedIdentifiers.filter((item, index) => duplicatedIdentifiers.indexOf(item) != index).length > 0;

      if(isDuplicated) {
        return true;
      }
    }
    return false;
  }
}
