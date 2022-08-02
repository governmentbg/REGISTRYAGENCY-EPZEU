import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { observable } from "mobx";
import { RequestForReportOfPerson } from "../RequestForReportOfPerson";
import { moduleContext } from "../../ModuleContext";

@TypeSystem.typeDecorator('PersonSubjectOfReportSection', moduleContext.moduleName)
export class PersonSubjectOfReportSection extends BaseDataModel {
  @observable private _requestsForReportOfPerson: RequestForReportOfPerson[] = [];

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  public get requestsForReportOfPerson(): RequestForReportOfPerson[] {
    return this._requestsForReportOfPerson;
  }

  @TypeSystem.propertyArrayDecorator(RequestForReportOfPerson)
  public set requestsForReportOfPerson(value: RequestForReportOfPerson[]) {
    this._requestsForReportOfPerson = value;
  }
}
