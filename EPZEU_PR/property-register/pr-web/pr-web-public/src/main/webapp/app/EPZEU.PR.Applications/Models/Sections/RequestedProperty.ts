import { observable } from "mobx";
import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { PropertyType, PlaceNomenclaturePR } from 'EPZEU.PR.Core';
import { moduleContext } from "../../ModuleContext";


@TypeSystem.typeDecorator('RequestedProperty', moduleContext.moduleName)
export class RequestedProperty extends BaseDataModel {
  @observable private _type: PropertyType = null;
  @observable private _settlement: PlaceNomenclaturePR = null;
  @observable private _countrySide: string = null;
  @observable private _cadastralId: string = null;
  @observable private _accountNumber: string = null;
  @observable private _oldAccountNumber: string = null;
  @observable private _areaByDocuments: number = null;
  @observable private _propertyLimits: string = null;
  @observable private _propertyRemark: string = null;
  @observable private _isIssuingAuthorityChange: boolean = null;

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  public get isIssuingAuthorityChange(): boolean {
    return this._isIssuingAuthorityChange;
  }

  @TypeSystem.propertyDecorator('boolean')
  public set isIssuingAuthorityChange(value: boolean) {
    this._isIssuingAuthorityChange = value;
  }

  public get type(): PropertyType {
    return this._type;
  }

  @TypeSystem.propertyDecorator(PropertyType)
  public set type(value: PropertyType) {
    this._type = value;
  }

  public get settlement(): PlaceNomenclaturePR {
    return this._settlement;
  }

  @TypeSystem.propertyDecorator(PlaceNomenclaturePR)
  public set settlement(value: PlaceNomenclaturePR) {
    this._settlement = value;
  }

  public get countrySide(): string {
    return this._countrySide;
  }

  @TypeSystem.propertyDecorator('string')
  public set countrySide(value: string) {
    this._countrySide = value;
  }

  public get cadastralId(): string {
    return this._cadastralId;
  }

  @TypeSystem.propertyDecorator('string')
  public set cadastralId(value: string) {
    this._cadastralId = value;
  }

  public get accountNumber(): string {
    return this._accountNumber;
  }

  @TypeSystem.propertyDecorator('string')
  public set accountNumber(value: string) {
    this._accountNumber = value;
  }

  public get oldAccountNumber(): string {
    return this._oldAccountNumber;
  }

  @TypeSystem.propertyDecorator('string')
  public set oldAccountNumber(value: string) {
    this._oldAccountNumber = value;
  }

  public get areaByDocuments(): number {
    return this._areaByDocuments;
  }

  @TypeSystem.propertyDecorator('number')
  public set areaByDocuments(value: number) {
    this._areaByDocuments = value;
  }

  public get propertyLimits(): string {
    return this._propertyLimits;
  }

  @TypeSystem.propertyDecorator('string')
  public set propertyLimits(value: string) {
    this._propertyLimits = value;
  }

  public get propertyRemark(): string {
    return this._propertyRemark;
  }

  @TypeSystem.propertyDecorator('string')
  public set propertyRemark(value: string) {
    this._propertyRemark = value;
  }
}
