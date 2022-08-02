import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { moduleContext } from "../ModuleContext";
import { observable } from "mobx";
import {AccountPropertyOfReport} from "./AccountPropertyOfReport";

@TypeSystem.typeDecorator('RequestForReportOfAccountProperty', moduleContext.moduleName)
export class RequestForReportOfAccountProperty extends BaseDataModel {
  @observable private _accountPropertyOfReport: AccountPropertyOfReport = null;
  @observable private _cost: number = null;

  constructor(obj?: any) {
    super(obj);
    this.copyFrom(obj);
  }

  public get accountPropertyOfReport(): AccountPropertyOfReport {
    return this._accountPropertyOfReport;
  }

  @TypeSystem.propertyDecorator(AccountPropertyOfReport)
  public set accountPropertyOfReport(value: AccountPropertyOfReport) {
    this._accountPropertyOfReport = value;
  }

  public get cost(): number {
    return this._cost;
  }

  @TypeSystem.propertyDecorator('number')
  public set cost(value: number) {
    this._cost = value;
  }
}
