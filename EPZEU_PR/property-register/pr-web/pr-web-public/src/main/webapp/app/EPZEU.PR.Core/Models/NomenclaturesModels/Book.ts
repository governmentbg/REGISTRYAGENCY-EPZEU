import { observable } from "mobx";
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { moduleContext } from "../../ModuleContext";

@TypeSystem.typeDecorator('Book', moduleContext.moduleName)
export class Book extends BaseDataModel {
  @observable private _id: string = null;
  @observable private _name: string = null;
  @observable private _typeId: string = null;

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

  public get typeId(): string {
    return this._typeId;
  }

  @TypeSystem.propertyDecorator('string')
  public set typeId(value: string) {
    this._typeId = value;
  }

  public clear(): void {
    this.id = null;
    this.name = null;
    this.typeId = null;
  }
}
