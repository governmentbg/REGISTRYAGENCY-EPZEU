import {observable} from "mobx";
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import {moduleContext} from "../ModuleContext";

@TypeSystem.typeDecorator('DocumentType', moduleContext.moduleName)
export class DocumentType extends BaseDataModel {

  @observable private _id: number = null;
  @observable private _name: string = null;

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  @TypeSystem.propertyDecorator('number')
  public set id(val: number) {
    this._id = val;
  }

  public get id(): number {
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
