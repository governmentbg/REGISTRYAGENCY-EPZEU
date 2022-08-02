import {observable} from "mobx";
import {TypeSystem, BaseDataModel} from 'Cnsys.Core'
import {moduleContext} from "../ModuleContext";
import {Court} from "./Court";

@TypeSystem.typeDecorator('CompanyCase', moduleContext.moduleName)
export class CompanyCase extends BaseDataModel {

  @observable private _number: string = null;
  @observable private _year: string = null;
  @observable private _registrationCourt : Court = null;

  constructor(obj?: any) {
    super(obj);
    this.copyFrom(obj);
  }

  public get number(): string {
    return this._number;
  }

  @TypeSystem.propertyDecorator('string')
  public set number(value: string) {
    this._number = value;
  }

  public get year(): string {
    return this._year;
  }

  @TypeSystem.propertyDecorator('string')
  public set year(value: string) {
    this._year = value;
  }

  public get registrationCourt(): Court {
    return this._registrationCourt;
  }

  @TypeSystem.propertyDecorator(Court)
  public set registrationCourt(value: Court) {
    this._registrationCourt = value;
  }
}
