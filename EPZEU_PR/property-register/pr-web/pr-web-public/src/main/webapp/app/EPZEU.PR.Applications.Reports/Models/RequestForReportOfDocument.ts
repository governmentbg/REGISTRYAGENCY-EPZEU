import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { moduleContext } from "../ModuleContext";
import { observable } from "mobx";
import {Document} from "EPZEU.PR.ApplicationBase";

@TypeSystem.typeDecorator('RequestForReportOfDocument', moduleContext.moduleName)
export class RequestForReportOfDocument extends BaseDataModel {
  @observable private _document: Document = null;
  @observable private _cost: number = null;

  constructor(obj?: any) {
    super(obj);
    this.copyFrom(obj);
  }

  public get document(): Document {
    return this._document;
  }

  @TypeSystem.propertyDecorator(Document)
  public set document(value: Document) {
    this._document = value;
  }

  public get cost(): number {
    return this._cost;
  }

  @TypeSystem.propertyDecorator('number')
  public set cost(value: number) {
    this._cost = value;
  }
}
