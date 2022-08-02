import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { moduleContext } from '../ModuleContext';
import { observable } from 'mobx';
import { CompanyCase, Country } from 'EPZEU.PR.ApplicationBase';

@TypeSystem.typeDecorator('LegalEntity', moduleContext.moduleName)
export class LegalEntity extends BaseDataModel {
  @observable private _id: string = null;
  @observable private _country: Country = null;
  @observable private _legalEntityNumber: string = null;
  @observable private _companyName: string = null;
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

  public get legalEntityNumber(): string {
    return this._legalEntityNumber;
  }

  @TypeSystem.propertyDecorator('string')
  public set legalEntityNumber(value: string) {
    this._legalEntityNumber = value;
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

  public get id(): string {
    return this._id;
  }

  @TypeSystem.propertyDecorator('string')
  public set id(value: string) {
    this._id = value;
  }
}
