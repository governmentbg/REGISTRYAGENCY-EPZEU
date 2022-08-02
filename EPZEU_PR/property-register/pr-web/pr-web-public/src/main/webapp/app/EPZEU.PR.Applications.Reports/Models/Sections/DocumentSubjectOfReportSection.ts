import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { observable } from "mobx";
import { moduleContext } from "../../ModuleContext";
import {RequestForReportOfDocument} from "../RequestForReportOfDocument";

@TypeSystem.typeDecorator('DocumentSubjectOfReport', moduleContext.moduleName)
export class DocumentSubjectOfReportSection extends BaseDataModel {
  @observable private _requestsForReportOfDocument: RequestForReportOfDocument[] = [];

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  public get requestsForReportOfDocument(): RequestForReportOfDocument[] {
    return this._requestsForReportOfDocument;
  }

  @TypeSystem.propertyArrayDecorator(RequestForReportOfDocument)
  public set requestsForReportOfDocument(value: RequestForReportOfDocument[]) {
    this._requestsForReportOfDocument = value;
  }
}
