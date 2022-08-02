import { TypeSystem, BaseDataModel } from "Cnsys.Core";
import { moduleContext } from "../ModuleContext";
import { observable } from "mobx";
import { PropertyOfReport } from "./PropertyOfReport";

@TypeSystem.typeDecorator('SearchPropertiesForReport', moduleContext.moduleName)
export class SearchPropertiesForReport extends BaseDataModel  {
  @observable private _cadastralIdentifier: string = null;
  @observable private _accountNumber: string = null;
  @observable private _oldAccountNumber: string = null;
  @observable private _settlementId: string = null;
  @observable private _settlementName: string = null;
  @observable private _district: string = null;
  @observable private _street: string = null;
  @observable private _streetNumber: string = null;
  @observable private _building: string = null;
  @observable private _entrance: string = null;
  @observable private _floor: string = null;
  @observable private _flat: string = null;
  @observable private _place: string = null;
  @observable private _cadastreNumber: string = null;
  @observable private _plot: string = null;
  @observable private _minArea: string = null;
  @observable private _maxArea: string = null;
  @observable private _remark: string = null;
  @observable private _registryOfficeId: string = null;
  @observable private _registryOfficeName: string = null;
  @observable private _items: PropertyOfReport[] = [];

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  public get cadastralIdentifier(): string {
    return this._cadastralIdentifier;
  }

  @TypeSystem.propertyDecorator('string')
  public set cadastralIdentifier(value: string) {
    this._cadastralIdentifier = value;
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


  public get settlementId(): string {
    return this._settlementId;
  }

  @TypeSystem.propertyDecorator('string')
  public set settlementId(value: string) {
    this._settlementId = value;
  }

  public get settlementName(): string {
    return this._settlementName;
  }

  @TypeSystem.propertyDecorator('string')
  public set settlementName(value: string) {
    this._settlementName = value;
  }

  public get district(): string {
    return this._district;
  }

  @TypeSystem.propertyDecorator('string')
  public set district(value: string) {
    this._district = value;
  }

  public get street(): string {
    return this._street;
  }

  @TypeSystem.propertyDecorator('string')
  public set street(value: string) {
    this._street = value;
  }


  public get streetNumber(): string {
    return this._streetNumber;
  }
  @TypeSystem.propertyDecorator('string')
  public set streetNumber(value: string) {
    this._streetNumber = value;
  }

  public get building(): string {
    return this._building;
  }

  @TypeSystem.propertyDecorator('string')
  public set building(value: string) {
    this._building = value;
  }

  public get entrance(): string {
    return this._entrance;
  }

  @TypeSystem.propertyDecorator('string')
  public set entrance(value: string) {
    this._entrance = value;
  }

  public get floor(): string {
    return this._floor;
  }

  @TypeSystem.propertyDecorator('string')
  public set floor(value: string) {
    this._floor = value;
  }

  public get flat(): string {
    return this._flat;
  }

  @TypeSystem.propertyDecorator('string')
  public set flat(value: string) {
    this._flat = value;
  }

  public get place(): string {
    return this._place;
  }

  @TypeSystem.propertyDecorator('string')
  public set place(value: string) {
    this._place = value;
  }

  public get cadastreNumber(): string {
    return this._cadastreNumber;
  }

  @TypeSystem.propertyDecorator('string')
  public set cadastreNumber(value: string) {
    this._cadastreNumber = value;
  }

  public get plot(): string {
    return this._plot;
  }
  @TypeSystem.propertyDecorator('string')
  public set plot(value: string) {
    this._plot = value;
  }

  public get minArea(): string {
    return this._minArea;
  }

  @TypeSystem.propertyDecorator('string')
  public set minArea(value: string) {
    this._minArea = value;
  }

  public get maxArea(): string {
    return this._maxArea;
  }

  @TypeSystem.propertyDecorator('string')
  public set maxArea(value: string) {
    this._maxArea = value;
  }

  public get remark(): string {
    return this._remark;
  }

  @TypeSystem.propertyDecorator('string')
  public set remark(value: string) {
    this._remark = value;
  }

  public get registryOfficeId(): string {
    return this._registryOfficeId;
  }

  @TypeSystem.propertyDecorator('string')
  public set registryOfficeId(value: string) {
    this._registryOfficeId = value;
  }


 public get registryOfficeName(): string {
    return this._registryOfficeName;
  }

  @TypeSystem.propertyDecorator('string')
 public set registryOfficeName(value: string) {
    this._registryOfficeName = value;
  }

  public get items(): PropertyOfReport[] {
    return this._items;
  }

  @TypeSystem.propertyDecorator(PropertyOfReport)
  public set items(value: PropertyOfReport[]) {
    this._items = value;
  }
}
