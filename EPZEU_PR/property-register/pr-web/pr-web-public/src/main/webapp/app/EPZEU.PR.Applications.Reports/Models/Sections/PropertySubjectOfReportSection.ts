import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { observable } from "mobx";
import { moduleContext } from "../../ModuleContext";
import {RequestForReportOfProperty} from "../RequestForReportOfProperty";

@TypeSystem.typeDecorator('PropertySubjectOfReport', moduleContext.moduleName)
export class PropertySubjectOfReportSection extends BaseDataModel {
  @observable private _requestsForReportOfProperty: RequestForReportOfProperty[] = [];

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  public get requestsForReportOfProperty(): RequestForReportOfProperty[] {
    return this._requestsForReportOfProperty;
  }

  @TypeSystem.propertyArrayDecorator(RequestForReportOfProperty)
  public set requestsForReportOfProperty(value: RequestForReportOfProperty[]) {
    this._requestsForReportOfProperty = value;
  }
}
