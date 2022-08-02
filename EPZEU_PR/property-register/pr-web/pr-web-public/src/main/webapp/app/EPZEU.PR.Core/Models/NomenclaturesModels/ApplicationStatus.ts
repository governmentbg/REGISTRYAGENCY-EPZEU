import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { observable } from "mobx";
import { moduleContext } from "../../ModuleContext";

@TypeSystem.typeDecorator('ApplicationStatus', moduleContext.moduleName)
export class ApplicationStatus extends BaseDataModel {
  @observable private _id: string = null;
  @observable private _name: string = null;
  @observable private _infoTextCode: string = null;
  @observable private _nameCode: string = null;

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

  public get infoTextCode(): string {
    return this._infoTextCode;
  }

  @TypeSystem.propertyDecorator('string')
  public set infoTextCode(value: string) {
    this._infoTextCode = value;
  }

  public get nameCode(): string {
    return this._nameCode;
  }

  @TypeSystem.propertyDecorator('string')
  public set nameCode(value: string) {
    this._nameCode = value;
  }
}
