import {TypeSystem, BaseDataModel} from 'Cnsys.Core'
import {moduleContext} from '../ModuleContext'
import {observable} from 'mobx'

@TypeSystem.typeDecorator('AttachedDocumentMetadata', moduleContext.moduleName)
export class AttachedDocumentMetadata extends BaseDataModel {

  @observable private _fileName: string = null;
  @observable private _size: number = null;
  @observable private _contentType: string = null;
  @observable private _hash: any = null;
  @observable private _hashAlgorithm: string = null;

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

 public get fileName(): string {
    return this._fileName;
  }

  @TypeSystem.propertyDecorator('string')
  public set fileName(value: string) {
    this._fileName = value;
  }

  public get size(): number {
    return this._size;
  }

  @TypeSystem.propertyDecorator('number')
  public set size(value: number) {
    this._size = value;
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
