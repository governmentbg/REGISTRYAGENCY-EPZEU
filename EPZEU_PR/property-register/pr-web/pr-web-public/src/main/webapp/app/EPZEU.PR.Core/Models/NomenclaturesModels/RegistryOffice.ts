import {observable} from "mobx";
import {TypeSystem, BaseDataModel} from 'Cnsys.Core'
import {moduleContext} from "../../ModuleContext";
import * as moment from "moment";

@TypeSystem.typeDecorator('RegistryOffice', moduleContext.moduleName)
export class RegistryOffice extends BaseDataModel {
  @observable private _id: string = null;
  @observable private _name: string = null;
  @observable private _startDate: moment.Moment = null;

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


  public get startDate(): moment.Moment {
    return this._startDate;
  }

  @TypeSystem.propertyDecorator('moment')
  public set startDate(value: moment.Moment) {
    this._startDate = value;
  }

  public clear(): void {
    this.id = null;
    this.name = null;
    this.startDate = null;
  }
}
