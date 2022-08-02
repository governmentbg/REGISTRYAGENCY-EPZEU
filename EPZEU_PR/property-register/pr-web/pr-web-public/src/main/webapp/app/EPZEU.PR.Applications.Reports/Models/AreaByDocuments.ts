import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { observable } from "mobx";
import { moduleContext } from "../ModuleContext";

@TypeSystem.typeDecorator('AreaByDocuments', moduleContext.moduleName)
export class AreaByDocuments extends BaseDataModel {
  @observable private _from: string = null;
  @observable private _to: string = null;

  constructor(obj?: any) {
    super(obj);
    this.copyFrom(obj);
  }

  public get from(): string {
    return this._from;
  }

  @TypeSystem.propertyDecorator('string')
  public set from(value: string) {
    this._from = value;
  }

  public get to(): string {
    return this._to;
  }

  @TypeSystem.propertyDecorator('string')
  public set to(value: string) {
    this._to = value;
  }
}
