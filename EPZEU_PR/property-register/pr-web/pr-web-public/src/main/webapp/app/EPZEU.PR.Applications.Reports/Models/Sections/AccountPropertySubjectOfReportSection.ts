import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { observable } from "mobx";
import { moduleContext } from "../../ModuleContext";
import {RequestForReportOfAccountProperty} from "../RequestForReportOfAccountProperty";

@TypeSystem.typeDecorator('AccountPropertySubjectOfReport', moduleContext.moduleName)
export class AccountPropertySubjectOfReportSection extends BaseDataModel {
  @observable private _requestsForReportOfAccountProperty: RequestForReportOfAccountProperty[] = [];

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  public get requestsForReportOfAccountProperty(): RequestForReportOfAccountProperty[] {
    return this._requestsForReportOfAccountProperty;
  }

  @TypeSystem.propertyArrayDecorator(RequestForReportOfAccountProperty)
  public set requestsForReportOfAccountProperty(value: RequestForReportOfAccountProperty[]) {
    this._requestsForReportOfAccountProperty = value;
  }
}
