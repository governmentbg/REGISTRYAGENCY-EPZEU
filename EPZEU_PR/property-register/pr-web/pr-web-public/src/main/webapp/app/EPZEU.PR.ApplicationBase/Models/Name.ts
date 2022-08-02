import {observable} from "mobx";
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import {moduleContext} from "../ModuleContext";

@TypeSystem.typeDecorator('Name', moduleContext.moduleName)
export class Name extends BaseDataModel {

  @observable private _firstName: string = null;
  @observable private _surName: string = null;
  @observable private _familyName: string = null;

  constructor(obj?: any) {
    super(obj);
    this.copyFrom(obj);
  }

  public get firstName(): string {
    return this._firstName;
  }

  @TypeSystem.propertyDecorator('string')
  public set firstName(value: string) {
    this._firstName = value;
  }

  public get surName(): string {
    return this._surName;
  }

  @TypeSystem.propertyDecorator('string')
  public set surName(value: string) {
    this._surName = value;
  }

  public get familyName(): string {
    return this._familyName;
  }

  @TypeSystem.propertyDecorator('string')
  public set familyName(value: string) {
    this._familyName = value;
  }
}
