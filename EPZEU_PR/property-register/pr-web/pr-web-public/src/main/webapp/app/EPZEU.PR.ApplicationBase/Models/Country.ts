import {observable} from "mobx";
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import {moduleContext} from "../ModuleContext";

@TypeSystem.typeDecorator('Country', moduleContext.moduleName)
export class Country extends BaseDataModel {

  //ISO3166 three-digits code
  @observable private _code_ISO3166: number = null;
  @observable private _name: string = null;

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  @TypeSystem.propertyDecorator('number')
  public set code_ISO3166(val: number) {
    this._code_ISO3166 = val;
  }

  public get code_ISO3166(): number {
    return this._code_ISO3166;
  }

  @TypeSystem.propertyDecorator('string')
  public set name(val: string) {
    this._name = val;
  }

  public get name(): string {
    return this._name;
  }
}
