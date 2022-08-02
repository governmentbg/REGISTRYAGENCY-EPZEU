import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { observable } from "mobx";
import { moduleContext } from "../ModuleContext";

@TypeSystem.typeDecorator('ApplicantDataOfReport', moduleContext.moduleName)
export class ApplicantDataOfReport extends BaseDataModel {
  @observable private _authenticationType: string = null;
  @observable private _personalIdentifier: string = null;
  @observable private _names: string = null;
  @observable private _serialNumber: string = null;
  @observable private _issuer: string = null;
  @observable private _certificateHash: string = null;
  @observable private _certificateContent: any = null;

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  public get authenticationType(): string {
    return this._authenticationType;
  }

  @TypeSystem.propertyDecorator('string')
  public set authenticationType(value: string) {
    this._authenticationType = value;
  }

  public get personalIdentifier(): string {
    return this._personalIdentifier;
  }

  @TypeSystem.propertyDecorator('string')
  public set personalIdentifier(value: string) {
    this._personalIdentifier = value;
  }

  public get names(): string {
    return this._names;
  }

  @TypeSystem.propertyDecorator('string')
  public set names(value: string) {
    this._names = value;
  }

  public get serialNumber(): string {
    return this._serialNumber;
  }

  @TypeSystem.propertyDecorator('string')
  public set serialNumber(value: string) {
    this._serialNumber = value;
  }

  public get issuer(): string {
    return this._issuer;
  }

  @TypeSystem.propertyDecorator('string')
  public set issuer(value: string) {
    this._issuer = value;
  }

  public get certificateHash(): string {
    return this._certificateHash;
  }

  @TypeSystem.propertyDecorator('string')
  public set certificateHash(value: string) {
    this._certificateHash = value;
  }

  public get certificateContent(): any {
    return this._certificateContent;
  }

  @TypeSystem.propertyDecorator('any')
  public set certificateContent(value: any) {
    this._certificateContent = value;
  }
}
