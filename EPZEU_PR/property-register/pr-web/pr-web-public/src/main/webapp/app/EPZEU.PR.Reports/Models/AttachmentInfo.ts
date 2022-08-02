import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { observable } from "mobx";
import * as moment from "moment";
import { moduleContext } from "../ModuleContext";

@TypeSystem.typeDecorator('AttachmentInfo', moduleContext.moduleName)
export class AttachmentInfo extends BaseDataModel {

  @observable private _downloadIdentifier: string = null;
  @observable private _fileName: string = null;
  @observable private _fileTypeID: string = null;
  @observable private _createDate: moment.Moment = null;

  constructor(obj?: any) {
    super(obj);
    this.copyFrom(obj);
  }

  public get downloadIdentifier(): string {
    return this._downloadIdentifier;
  }

  @TypeSystem.propertyDecorator('string')
  public set downloadIdentifier(value: string) {
    this._downloadIdentifier = value;
  }

  public get fileName(): string {
    return this._fileName;
  }

  @TypeSystem.propertyDecorator('string')
  public set fileName(value: string) {
    this._fileName = value;
  }

  public get fileTypeID(): string {
    return this._fileTypeID;
  }

  @TypeSystem.propertyDecorator('string')
  public set fileTypeID(value: string) {
    this._fileTypeID = value;
  }

  public get createDate(): moment.Moment {
    return this._createDate;
  }

  @TypeSystem.propertyDecorator('moment')
  public set createDate(value: moment.Moment) {
    this._createDate = value;
  }
}
