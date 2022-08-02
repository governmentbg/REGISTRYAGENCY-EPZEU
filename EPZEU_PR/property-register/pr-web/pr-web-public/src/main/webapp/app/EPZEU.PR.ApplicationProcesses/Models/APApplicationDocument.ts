import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { moduleContext } from '../ModuleContext';
import { observable } from 'mobx';

@TypeSystem.typeDecorator('APApplicationDocument', moduleContext.moduleName)
export class APApplicationDocument extends BaseDataModel {
  @observable private _applicationDocumentId: number = null;
  @observable private _name: string = null;
  @observable private _backOfficeGuid: string = null;
  @observable private _applicationId: number = null;
  @observable private _docType: number = null;
  @observable private _fileSize: number = null;

  constructor(obj?: any){
    super(obj);

    this.copyFrom(obj);
  }

  public get applicationDocumentId(): number {
    return this._applicationDocumentId;
  }

  @TypeSystem.propertyDecorator('number')
  public set applicationDocumentId(value: number) {
    this._applicationDocumentId = value;
  }

  public get name(): string {
    return this._name;
  }

  @TypeSystem.propertyDecorator('string')
  public set name(value: string) {
    this._name = value;
  }

  public get backOfficeGuid(): string {
    return this._backOfficeGuid;
  }

  @TypeSystem.propertyDecorator('string')
  public set backOfficeGuid(value: string) {
    this._backOfficeGuid = value;
  }

  public get applicationId(): number {
    return this._applicationId;
  }

  @TypeSystem.propertyDecorator('number')
  public set applicationId(value: number) {
    this._applicationId = value;
  }

  public get docType(): number {
    return this._docType;
  }

  @TypeSystem.propertyDecorator('number')
  public set docType(value: number) {
    this._docType = value;
  }

  public get fileSize(): number {
    return this._fileSize;
  }

  @TypeSystem.propertyDecorator('number')
  public set fileSize(value: number) {
    this._fileSize = value;
  }
}
