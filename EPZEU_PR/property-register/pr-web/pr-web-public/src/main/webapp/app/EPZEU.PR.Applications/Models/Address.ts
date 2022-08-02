import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { observable } from "mobx";
import { moduleContext } from '../ModuleContext';

@TypeSystem.typeDecorator('Address', moduleContext.moduleName)
export class Address extends BaseDataModel {

  @observable private _settlementId: number = null;
  @observable private _settlementEkatteCode: string = null;
  @observable private _settlementName: string = null;

  @observable private _municipalityId: number = null;
  @observable private _municipalityName: string = null;
  @observable private _municipalityEkatteCode: string = null;

  @observable private _regionId: number = null;
  @observable private _regionName: string = null;
  @observable private _regionEkatteCode: string = null;

  @observable private _areaId: number = null;
  @observable private _areaName: string = null;
  @observable private _areaEkatteCode: string = null;
  @observable private _hasAreas: boolean = null;

  @observable private _postCode: number = null;
  @observable private _street: string = null;
  @observable private _housingEstate: string = null;
  @observable private _streetNumber: string = null;
  @observable private _block: string = null;
  @observable private _entrance: string = null;
  @observable private _floor: string = null;
  @observable private _apartment: string = null;

  constructor(obj?: any) {
    super(obj);
    this.copyFrom(obj);
  }

  @TypeSystem.propertyDecorator('number')
  public set settlementId(val: number) {
    this._settlementId = val;
  }

  public get settlementId(): number {
    return this._settlementId;
  }

  @TypeSystem.propertyDecorator('string')
  public set settlementEkatteCode(val: string){
    this._settlementEkatteCode = val;
  }

  public get settlementEkatteCode(): string{
    return this._settlementEkatteCode;
  }

  @TypeSystem.propertyDecorator('string')
  public set settlementName(val: string) {
    this._settlementName = val;
  }

  public get settlementName(): string {
    return this._settlementName;
  }

  @TypeSystem.propertyDecorator('string')
  public set municipalityName(val: string) {
    this._municipalityName = val;
  }

  public get municipalityName(): string {
    return this._municipalityName;
  }

  @TypeSystem.propertyDecorator('string')
  public set municipalityEkatteCode(val: string){
    this._municipalityEkatteCode = val;
  }

  public get municipalityEkatteCode(): string{
    return this._municipalityEkatteCode;
  }

  @TypeSystem.propertyDecorator('number')
  public set municipalityId(val: number) {
    this._municipalityId = val;
  }

  public get municipalityId(): number {
    return this._municipalityId;
  }

  @TypeSystem.propertyDecorator('string')
  public set regionName(val: string) {
    this._regionName = val;
  }

  public get regionName(): string {
    return this._regionName;
  }

  @TypeSystem.propertyDecorator('string')
  public set regionEkatteCode(val: string){
    this._regionEkatteCode = val;
  }

  public get regionEkatteCode(): string{
    return this._regionEkatteCode;
  }

  @TypeSystem.propertyDecorator('number')
  public set regionId(val: number) {
    this._regionId = val;
  }

  public get regionId(): number {
    return this._regionId;
  }

  @TypeSystem.propertyDecorator('string')
  public set areaName(val: string) {
    this._areaName = val;
  }

  public get areaName(): string {
    return this._areaName;
  }

  @TypeSystem.propertyDecorator('number')
  public set areaId(val: number) {
    this._areaId = val;
  }

  public get areaId(): number {
    return this._areaId;
  }

  @TypeSystem.propertyDecorator('string')
  public set areaEkatteCode(val: string) {
    this._areaEkatteCode = val;
  }

  public get areaEkatteCode(): string {
    return this._areaEkatteCode;
  }

  @TypeSystem.propertyDecorator('boolean')
  public set hasAreas(val: boolean) {
    this._hasAreas = val;
  }

  public get hasAreas(): boolean {
    return this._hasAreas;
  }

  @TypeSystem.propertyDecorator('number')
  public set postCode(val: number) {
    this._postCode = val;
  }

  public get postCode(): number {
    return this._postCode;
  }

  @TypeSystem.propertyDecorator('string')
  public set street(val: string) {
    this._street = val;
  }

  public get street(): string {
    return this._street;
  }

  @TypeSystem.propertyDecorator('string')
  public set housingEstate(val: string) {
    this._housingEstate = val;
  }

  public get housingEstate(): string {
    return this._housingEstate;
  }

  @TypeSystem.propertyDecorator('string')
  public set streetNumber(val: string) {
    this._streetNumber = val;
  }

  public get streetNumber(): string {
    return this._streetNumber;
  }

  @TypeSystem.propertyDecorator('string')
  public set block(val: string) {
    this._block = val;
  }

  public get block(): string {
    return this._block;
  }

  @TypeSystem.propertyDecorator('string')
  public set entrance(val: string) {
    this._entrance = val;
  }

  public get entrance(): string {
    return this._entrance;
  }

  @TypeSystem.propertyDecorator('string')
  public set floor(val: string) {
    this._floor = val;
  }

  public get floor(): string {
    return this._floor;
  }

  @TypeSystem.propertyDecorator('string')
  public set apartment(val: string) {
    this._apartment = val;
  }

  public get apartment(): string {
    return this._apartment;
  }
}
