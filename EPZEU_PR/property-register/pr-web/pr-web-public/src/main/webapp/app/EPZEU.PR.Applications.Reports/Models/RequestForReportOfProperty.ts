import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { moduleContext } from "../ModuleContext";
import { observable } from "mobx";
import { PeriodForReport } from "EPZEU.PR.ApplicationBase";
import {PropertyOfReport} from "./PropertyOfReport";

@TypeSystem.typeDecorator('RequestForReportOfProperty', moduleContext.moduleName)
export class RequestForReportOfProperty extends BaseDataModel {
  @observable private _propertyOfReport: PropertyOfReport = null;
  @observable private _cost: number = null;
  @observable private _periodForReport: PeriodForReport = null;

  constructor(obj?: any) {
    super(obj);
    this.copyFrom(obj);
  }

  public get propertyOfReport(): PropertyOfReport {
    return this._propertyOfReport;
  }

  @TypeSystem.propertyDecorator(PropertyOfReport)
  public set propertyOfReport(value: PropertyOfReport) {
    this._propertyOfReport = value;
  }

  public get cost(): number {
    return this._cost;
  }

  @TypeSystem.propertyDecorator('number')
  public set cost(value: number) {
    this._cost = value;
  }

  public get periodForReport(): PeriodForReport {
    return this._periodForReport;
  }

  @TypeSystem.propertyDecorator(PeriodForReport)
  public set periodForReport(value: PeriodForReport) {
    this._periodForReport = value;
  }
}
