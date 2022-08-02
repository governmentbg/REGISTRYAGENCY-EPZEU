import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { observable } from "mobx";
import * as moment from 'moment';
import { moduleContext } from "../../ModuleContext";

@TypeSystem.typeDecorator('UpcomingDeal', moduleContext.moduleName)
export class UpcomingDeal extends BaseDataModel {

  @observable private _cadastralIds: string[] = null;
  @observable private _propertyDealType: string = null;
  @observable private _propertyDealDate: moment.Moment = null;
  @observable private _propertyDealTime: moment.Moment = null;

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  public get cadastralIds(): string[] {
    return this._cadastralIds;
  }

  @TypeSystem.propertyArrayDecorator('string')
  public set cadastralIds(value: string[]) {
    this._cadastralIds = value;
  }

  public get propertyDealType(): string {
    return this._propertyDealType;
  }

  @TypeSystem.propertyDecorator('string')
  public set propertyDealType(value: string) {
    this._propertyDealType = value;
  }

  public get propertyDealDate(): moment.Moment {
    return this._propertyDealDate;
  }

  @TypeSystem.propertyDecorator('moment')
  public set propertyDealDate(value: moment.Moment) {
    this._propertyDealDate = value;
  }

  public get propertyDealTime(): moment.Moment {
    return this._propertyDealTime;
  }

  @TypeSystem.propertyDecorator('moment')
  public set propertyDealTime(value: moment.Moment) {
    this._propertyDealTime = value;
  }
}
