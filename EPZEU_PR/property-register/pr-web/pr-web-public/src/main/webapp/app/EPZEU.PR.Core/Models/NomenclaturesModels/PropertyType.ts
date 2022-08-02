import { observable } from "mobx";
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { moduleContext } from "../../ModuleContext";

@TypeSystem.typeDecorator('PropertyType', moduleContext.moduleName)
export class PropertyType extends BaseDataModel {
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
