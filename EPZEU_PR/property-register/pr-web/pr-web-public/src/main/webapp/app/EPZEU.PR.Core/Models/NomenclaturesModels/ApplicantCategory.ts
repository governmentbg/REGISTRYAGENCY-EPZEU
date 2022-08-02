import { observable } from "mobx";
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { moduleContext } from "../../ModuleContext";

@TypeSystem.typeDecorator('ApplicantCategory', moduleContext.moduleName)
export class ApplicantCategory extends BaseDataModel {

  @observable private _id: string = null;
  @observable private _name: string = null;

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
}
