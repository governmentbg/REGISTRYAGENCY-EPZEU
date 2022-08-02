import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { moduleContext } from "../ModuleContext";
import { observable } from "mobx";
import { CompanyCase, Country } from "EPZEU.PR.ApplicationBase";
import { resourceManager } from "EPZEU.Core";

@TypeSystem.typeDecorator('LegalEntityOfReport', moduleContext.moduleName)
export class LegalEntityOfReport extends BaseDataModel {

  @observable private _legalEntityNumber: string = null;
  @observable private _companyName: string = null;

  @observable private _country: Country = null;
  @observable private _companyCase: CompanyCase = null;

  constructor(obj?: any) {
    super(obj);
    this.copyFrom(obj);
  }

  public get country(): Country {
    return this._country;
  }

  @TypeSystem.propertyDecorator(Country)
  public set country(value: Country) {
    this._country = value;
  }

  public get companyName(): string {
    return this._companyName;
  }

  @TypeSystem.propertyDecorator('string')
  public set companyName(value: string) {
    this._companyName = value;
  }

  public get companyCase(): CompanyCase {
    return this._companyCase;
  }

  @TypeSystem.propertyDecorator(CompanyCase ? CompanyCase : moduleContext.moduleName + '.' + 'CompanyCase')
  public set companyCase(value: CompanyCase) {
    this._companyCase = value;
  }

  public get legalEntityNumber(): string {
    return this._legalEntityNumber;
  }

  @TypeSystem.propertyDecorator('string')
  public set legalEntityNumber(value: string) {
    this._legalEntityNumber = value;
  }

  public toString(): string {
    let toString = "<p class=\"field-text\"><span class =\"field-title field-title--preview\">" + resourceManager.getResourceByKey("GL_LEGAL_ENTITY_L") + "</span></p><p class=\"field-text\">";
    let putCommaSeparator = false;

    if (this.companyName) {
      toString += this.companyName;
      if(this.legalEntityNumber) {
        toString += ", ";
      }
      putCommaSeparator = true;
    }
    if (this.legalEntityNumber) {
      toString += this.legalEntityNumber;
      putCommaSeparator = true;
    }
    if(this.companyCase != undefined) {
      if (this.companyCase.number && this.companyCase.year) {
        if (putCommaSeparator) {
          toString += ", ";
        }
        toString += "<span class =\"field-title field-title--preview\">" + resourceManager.getResourceByKey('PR_COMPANY_CASE_L') + ": </span>" + this.companyCase.number + "/" + this.companyCase.year
      }
    }
    if (this.country && this.country.name) {
      if(putCommaSeparator) {
        toString += ", ";
      }
      toString += this.country.name;
    }
    return toString;
  }
}
