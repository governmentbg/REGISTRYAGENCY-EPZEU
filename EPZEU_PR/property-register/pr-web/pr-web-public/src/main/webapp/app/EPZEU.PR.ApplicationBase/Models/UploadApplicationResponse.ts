import {TypeSystem, BaseDataModel} from 'Cnsys.Core'
import {moduleContext} from "../ModuleContext";
import {observable} from "mobx";

@TypeSystem.typeDecorator('UploadApplicationResponse', moduleContext.moduleName)
export class UploadApplicationResponse extends BaseDataModel {

  constructor(obj?: any) {
    super(obj);
    this.copyFrom(obj);
  }

  @observable private _appNumber: string = null;

  public get appNumber(): string {
    return this._appNumber;
  }

  @TypeSystem.propertyDecorator('string')
  public set appNumber(value: string) {
    this._appNumber = value;
  }
}
