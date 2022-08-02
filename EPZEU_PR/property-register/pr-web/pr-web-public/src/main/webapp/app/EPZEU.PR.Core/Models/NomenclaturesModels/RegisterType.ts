import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { observable } from "mobx";
import { moduleContext } from "../../ModuleContext";

@TypeSystem.typeDecorator('RegisterType', moduleContext.moduleName)
export class RegisterType extends BaseDataModel {
  @observable private _id: string = null;
  @observable private _name: string = null;

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  public get id(): string {
    return this._id;
  }

  @TypeSystem.propertyDecorator('string')
  public set id(value: string) {
    this._id = value;
  }

  public get name(): string {
    return this._name;
  }

  @TypeSystem.propertyDecorator('string')
  public set name(value: string) {
    this._name = value;
  }
}
