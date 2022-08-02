import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { observable } from "mobx";
import { moduleContext } from "../ModuleContext";
import * as moment from "moment";
import { AttachmentInfo } from "./AttachmentInfo";

@TypeSystem.typeDecorator('ApplicationStatusResultInfo', moduleContext.moduleName)
export class ApplicationStatusResultInfo extends BaseDataModel {

  @observable private _status: string = null;
  @observable private _statusTime: moment.Moment = null;
  @observable private _textContent: string = null;
  @observable private _statusResultDocuments: AttachmentInfo[] = null;

  constructor(obj?: any) {
    super(obj);
    this.copyFrom(obj);
  }

  public get status(): string {
    return this._status;
  }

  @TypeSystem.propertyDecorator('string')
  public set status(value: string) {
    this._status = value;
  }

  public  get statusTime(): moment.Moment {
    return this._statusTime;
  }

  @TypeSystem.propertyDecorator('moment')
  public set statusTime(value: moment.Moment) {
    this._statusTime = value;
  }

  public get textContent(): string {
    return this._textContent;
  }

  @TypeSystem.propertyDecorator('string')
  public set textContent(value: string) {
    this._textContent = value;
  }


  public get statusResultDocuments(): AttachmentInfo[] {
    return this._statusResultDocuments;
  }

  @TypeSystem.propertyArrayDecorator(AttachmentInfo)
  public set statusResultDocuments(value: AttachmentInfo[]) {
    this._statusResultDocuments = value;
  }
}
