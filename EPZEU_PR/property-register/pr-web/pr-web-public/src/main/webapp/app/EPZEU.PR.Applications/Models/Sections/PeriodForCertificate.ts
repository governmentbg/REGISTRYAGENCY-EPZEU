import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { observable } from "mobx";
import { moduleContext } from "../../ModuleContext";
import { PeriodForReport } from "EPZEU.PR.ApplicationBase";
import * as moment from 'moment'

@TypeSystem.typeDecorator('PeriodForCertificate', moduleContext.moduleName)
export class PeriodForCertificate extends BaseDataModel {
  @observable private _periodForReport: PeriodForReport = null;
  @observable private _expectedRegistrationDate: moment.Moment = null;

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  public get periodForReport(): PeriodForReport {
    return this._periodForReport;
  }

  @TypeSystem.propertyDecorator(PeriodForReport)
  public set periodForReport(value: PeriodForReport) {
    this._periodForReport = value;
  }

  public get expectedRegistrationDate(): moment.Moment {
    return this._expectedRegistrationDate;
  }

  @TypeSystem.propertyDecorator('moment')
  public set expectedRegistrationDate(value: moment.Moment) {
    this._expectedRegistrationDate = value;
  }
}


