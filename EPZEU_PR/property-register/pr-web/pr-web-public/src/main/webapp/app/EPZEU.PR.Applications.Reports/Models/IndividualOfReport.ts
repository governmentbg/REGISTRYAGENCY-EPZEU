import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { observable } from "mobx";
import { Name, Country } from "EPZEU.PR.ApplicationBase";
import { resourceManager } from "EPZEU.Core";
import { moduleContext } from "../ModuleContext";

@TypeSystem.typeDecorator('IndividualOfReport', moduleContext.moduleName)
export class IndividualOfReport extends BaseDataModel {

  @observable private _identity: string = null;

  @observable private _applicantName: Name = null;
  @observable private _personNationality: Country = null;

  constructor(obj?: any) {
    super(obj);
    this.copyFrom(obj);
  }

  public get personNationality(): Country {
    return this._personNationality;
  }

  @TypeSystem.propertyDecorator(Country)
  public set personNationality(value: Country) {
    this._personNationality = value;
  }

  public get identity(): string {
    return this._identity;
  }

  @TypeSystem.propertyDecorator('string')
  public set identity(value: string) {
    this._identity = value;
  }

  public get applicantName(): Name {
    return this._applicantName;
  }

  @TypeSystem.propertyDecorator(Name)
  public set applicantName(value: Name) {
    this._applicantName = value;
  }

  public toString(): string {
      let toString = "<p class=\"field-text\"><span class =\"field-title field-title--preview\">" + resourceManager.getResourceByKey("GL_INDIVIDUAL_L") + "</span></p><p class=\"field-text\">";
      let firstNameIsNotEmpty = false;
      if (this.applicantName.firstName) {
        toString += this.applicantName.firstName;
        firstNameIsNotEmpty = true;
      }
      if (this.applicantName.surName) {
        if(firstNameIsNotEmpty) {
          toString += " ";
        }
        toString += this.applicantName.surName;
      }
      if (this.applicantName.familyName) {
        if(firstNameIsNotEmpty) {
          toString += " ";
        }
        toString += this.applicantName.familyName;
      }
      if (this.identity) {
        if(firstNameIsNotEmpty) {
          toString += ", ";
        }
        toString += "<span class =\"field-title field-title--preview\">" + resourceManager.getResourceByKey('PR_GL_00001_L') + ": </span>" + this.identity;
      }
      if (this.personNationality && this.personNationality.name) {
        if(firstNameIsNotEmpty) {
          toString += ", ";
        }
        toString += this.personNationality.name;
      }
      return toString;
  }
}
