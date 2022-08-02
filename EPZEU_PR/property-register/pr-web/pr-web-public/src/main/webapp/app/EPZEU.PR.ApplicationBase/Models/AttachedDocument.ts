import {TypeSystem, BaseDataModel} from 'Cnsys.Core'
import {moduleContext} from '../ModuleContext'
import {observable} from 'mobx'

@TypeSystem.typeDecorator('AttachedDocument', moduleContext.moduleName)
export class AttachedDocument extends BaseDataModel {

  @observable private _name: string = null;
  @observable private _fileName: string = null;
  @observable private _documentUniqueId: string = null;
  @observable private _size: number = null;
  @observable private _documentTypeId: string = null;
  @observable private _documentTypeName: string = null;
  @observable private _contentType: string = null;
  @observable private _hash: any = null;
  @observable private _hashAlgorithm: string = null;
  @observable private _applicationDocumentId: number = null;

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  @TypeSystem.propertyDecorator('number')
  public set applicationDocumentId(val: number) {
    this._applicationDocumentId = val;
  }

  public get applicationDocumentId(): number {
    return this._applicationDocumentId;
  }

  public get name(): string {
    return this._name;
  }

  @TypeSystem.propertyDecorator('string')
  public set name(value: string) {
    this._name = value;
  }

  public get documentUniqueId(): string {
    return this._documentUniqueId;
  }

  @TypeSystem.propertyDecorator('string')
  public set documentUniqueId(value: string) {
    this._documentUniqueId = value;
  }

  @TypeSystem.propertyDecorator('number')
  public set size(val: number) {
    this._size = val;
  }

  public get size(): number {
    return this._size;
  }

  public get documentTypeId(): string {
    return this._documentTypeId;
  }

  @TypeSystem.propertyDecorator('string')
  public set documentTypeId(value: string) {
    this._documentTypeId = value;
  }

  public get fileName(): string {
    return this._fileName;
  }

  @TypeSystem.propertyDecorator('string')
  public set fileName(value: string) {
    this._fileName = value;
  }

  public get documentTypeName(): string {
    return this._documentTypeName;
  }

  @TypeSystem.propertyDecorator('string')
  public set documentTypeName(value: string) {
    this._documentTypeName = value;
  }

  public get contentType(): string {
    return this._contentType;
  }

  @TypeSystem.propertyDecorator('string')
  public set contentType(value: string) {
    this._contentType = value;
  }

  public get hash(): any {
    return this._hash;
  }

  @TypeSystem.propertyDecorator('any')
  public set hash(value: any) {
    this._hash = value;
  }

  public get hashAlgorithm(): string {
    return this._hashAlgorithm;
  }

  @TypeSystem.propertyDecorator('string')
  public set hashAlgorithm(value: string) {
    this._hashAlgorithm = value;
  }
}
