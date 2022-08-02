import { observable } from "mobx";
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { Name, Country } from "EPZEU.PR.ApplicationBase";
import { moduleContext } from '../ModuleContext';
import { BirthPlace } from "./BirthPlace";

@TypeSystem.typeDecorator('Individual', moduleContext.moduleName)
export class Individual extends BaseDataModel {
  @observable private _personNationality: Country = null;
  @observable private _identity: string = null;
  @observable private _name: Name = null;
  @observable private _birthPlace: BirthPlace = null;
  @observable private _bulstat : String = null;

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

  public get name(): Name {
    return this._name;
  }

  @TypeSystem.propertyDecorator(Name)
  public set name(value: Name) {
    this._name = value;
  }

  @TypeSystem.propertyDecorator(BirthPlace)
  public set birthPlace(val: BirthPlace) {
    this._birthPlace = val;
  }

  public get birthPlace(): BirthPlace {
    return this._birthPlace;
  }

  public get bulstat(): String {
    return this._bulstat;
  }

  @TypeSystem.propertyDecorator('string')
  public set bulstat(value: String) {
    this._bulstat = value;
  }
}
