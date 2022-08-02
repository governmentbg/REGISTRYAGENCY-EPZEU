import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { observable } from "mobx";
import { moduleContext } from "../ModuleContext";
import * as moment from 'moment'

@TypeSystem.typeDecorator('UpcomingDeal', moduleContext.moduleName)
export class UpcomingDeal extends BaseDataModel {

  @observable private _cadastreNumbers: string[] = null;
  @observable private _dealType: string = null;
  @observable private _dealDate: moment.Moment = null;
  @observable private _registratorName: string = null;
  @observable private _registratorRoleId: string = null;
  @observable private _registratorUID: string = null;

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  public get cadastreNumbers(): string[] {
    return this._cadastreNumbers;
  }

  @TypeSystem.propertyArrayDecorator('string')
  public set cadastreNumbers(value: string[]) {
    this._cadastreNumbers = value;
  }

  public get dealType(): string {
    return this._dealType;
  }

  @TypeSystem.propertyDecorator('string')
  public set dealType(value: string) {
    this._dealType = value;
  }

  public get dealDate(): moment.Moment {
    return this._dealDate;
  }

  @TypeSystem.propertyDecorator('moment')
  public set dealDate(value: moment.Moment) {
    this._dealDate = value;
  }

  public get registratorName(): string {
    return this._registratorName;
  }

  @TypeSystem.propertyDecorator('string')
  public set registratorName(value: string) {
    this._registratorName = value;
  }

  public get registratorRoleId(): string {
    return this._registratorRoleId;
  }

  @TypeSystem.propertyDecorator('string')
  public set registratorRoleId(value: string) {
    this._registratorRoleId = value;
  }

  public get registratorUID(): string {
    return this._registratorUID;
  }

  @TypeSystem.propertyDecorator('string')
  public set registratorUID(value: string) {
    this._registratorUID = value;
  }
}
