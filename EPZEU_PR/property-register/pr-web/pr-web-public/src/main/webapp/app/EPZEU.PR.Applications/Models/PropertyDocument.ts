import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { observable } from "mobx";
import { moduleContext } from "../ModuleContext";
import * as moment from 'moment'

export enum PropertyDocumentType {
  ACT_OF_OWNERSHIP = 1,
  CERTIFICATE_FOR_INHERITANCE = 2,
  OTHER = 3
}

TypeSystem.registerEnumInfo(PropertyDocumentType, 'PropertyDocumentType', moduleContext.moduleName);

@TypeSystem.typeDecorator('PropertyDocument', moduleContext.moduleName)
export class PropertyDocument extends BaseDataModel {
  @observable private _type: PropertyDocumentType = null;
  @observable private _actNumber: number = null;
  @observable private _volume: number = null;
  @observable private _incomingRegisterNumber: number = null;
  @observable private _propertyDocumentDate: moment.Moment = null;
  @observable private _description: string = null;

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  public get type(): PropertyDocumentType {
    return this._type;
  }

  @TypeSystem.propertyDecorator(PropertyDocumentType)
  public set type(value: PropertyDocumentType) {
    this._type = value;
  }

  public get actNumber(): number {
    return this._actNumber;
  }

  @TypeSystem.propertyDecorator('number')
  public set actNumber(value: number) {
    this._actNumber = value;
  }

  public get volume(): number {
    return this._volume;
  }

  @TypeSystem.propertyDecorator('number')
  public set volume(value: number) {
    this._volume = value;
  }

  public get incomingRegisterNumber(): number {
    return this._incomingRegisterNumber;
  }

  @TypeSystem.propertyDecorator('number')
  public set incomingRegisterNumber(value: number) {
    this._incomingRegisterNumber = value;
  }

  public get propertyDocumentDate(): moment.Moment {
    return this._propertyDocumentDate;
  }

  @TypeSystem.propertyDecorator('moment')
  public set propertyDocumentDate(value: moment.Moment) {
    this._propertyDocumentDate = value;
  }

  public get description(): string {
    return this._description;
  }

  @TypeSystem.propertyDecorator('string')
  public set description(value: string) {
    this._description = value;
  }
}
