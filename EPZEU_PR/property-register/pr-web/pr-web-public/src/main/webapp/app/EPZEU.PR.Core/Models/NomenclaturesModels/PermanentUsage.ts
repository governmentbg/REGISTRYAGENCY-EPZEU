import { TypeSystem, BaseDataModel} from "Cnsys.Core";
import {moduleContext} from "../../ModuleContext";
import {observable} from "mobx";

@TypeSystem.typeDecorator('PermanentUsage', moduleContext.moduleName)
export class PermanentUsage extends BaseDataModel {

  @observable private _id: string = null;
  @observable private _name: string = null;
  @observable private _typeId: string = null;
  @observable private _code: number = null;

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  @TypeSystem.propertyDecorator('string')
  public set id(val: string) {
    this._id = val;
  }

  public get id(): string {
    return this._id;
  }

  @TypeSystem.propertyDecorator('string')
  public set name(val: string) {
    this._name = val;
  }

  public get name(): string {
    return this._name;
  }

  get typeId(): string {
    return this._typeId;
  }
  @TypeSystem.propertyDecorator('string')
  set typeId(value: string) {
    this._typeId = value;
  }

  get code(): number {
    return this._code;
  }
  @TypeSystem.propertyDecorator('number')
  set code(value: number) {
    this._code = value;
  }
}
