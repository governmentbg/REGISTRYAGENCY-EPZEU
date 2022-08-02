import {BaseDataModel, TypeSystem} from 'Cnsys.Core';
import {moduleContext} from "../../ModuleContext";
import {observable} from "mobx";

@TypeSystem.typeDecorator('DocumentType', moduleContext.moduleName)
export class DocumentType extends BaseDataModel {

  @observable private _docType_id: number = 0;
  @observable private _applicationFormType: number = 0;
  @observable private _name: string = null;
  @observable private _processState: number = 0;

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  public get docType_id(): number {
    return this._docType_id;
  }

  @TypeSystem.propertyDecorator('number')
  public set docType_id(value: number) {
    this._docType_id = value;
  }

  public get applicationFormType(): number {
    return this._applicationFormType;
  }

  @TypeSystem.propertyDecorator('number')
  public set applicationFormType(value: number) {
    this._applicationFormType = value;
  }

  public get name(): string {
    return this._name;
  }

  @TypeSystem.propertyDecorator('string')
  public set name(value: string) {
    this._name = value;
  }

  public get processState(): number {
    return this._processState;
  }

  @TypeSystem.propertyDecorator('number')
  public set processState(value: number) {
    this._processState = value;
  }
}
