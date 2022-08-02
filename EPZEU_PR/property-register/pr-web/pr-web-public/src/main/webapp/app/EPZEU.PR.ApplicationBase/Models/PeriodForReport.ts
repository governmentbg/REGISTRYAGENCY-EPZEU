import * as moment from 'moment'
import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { moduleContext } from '../ModuleContext'
import { observable } from "mobx";

@TypeSystem.typeDecorator('PeriodForReport', moduleContext.moduleName)
export class PeriodForReport extends BaseDataModel {
  @observable private _startDate: moment.Moment = null;
  @observable private _endDate: moment.Moment = null;
  @observable private _minStartDate: moment.Moment = null;

  constructor(obj?: any) {
    super(obj);
    this.copyFrom(obj);
  }

  public get startDate(): moment.Moment {
    return this._startDate;
  }

  @TypeSystem.propertyDecorator('moment')
  public set startDate(value: moment.Moment) {
    this._startDate = value;
  }

  public get endDate(): moment.Moment {
    return this._endDate;
  }

  @TypeSystem.propertyDecorator('moment')
  public set endDate(value: moment.Moment) {
    this._endDate = value;
  }

  public get minStartDate(): moment.Moment {
    return this._minStartDate;
  }

  @TypeSystem.propertyDecorator('moment')
  public set minStartDate(value: moment.Moment) {
    this._minStartDate = value;
  }
}
