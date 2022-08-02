import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { moduleContext } from "../ModuleContext";
import { observable } from "mobx";
import { PeriodForReport } from "EPZEU.PR.ApplicationBase";
import { PersonOfReport } from "./PersonOfReport";

@TypeSystem.typeDecorator('RequestForReportOfPerson', moduleContext.moduleName)
export class RequestForReportOfPerson extends BaseDataModel {
  @observable private _personOfReport: PersonOfReport = null;
  @observable private _cost: number = null;
  @observable private _periodForReport: PeriodForReport = null;

  constructor(obj?: any) {
    super(obj);
    this.copyFrom(obj);
  }

  public get personOfReport(): PersonOfReport {
    return this._personOfReport;
  }

  @TypeSystem.propertyDecorator(PersonOfReport)
  public set personOfReport(value: PersonOfReport) {
    this._personOfReport = value;
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
