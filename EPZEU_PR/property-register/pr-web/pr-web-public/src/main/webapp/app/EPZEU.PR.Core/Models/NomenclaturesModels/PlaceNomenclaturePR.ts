import {observable} from "mobx";
import {TypeSystem, BaseDataModel} from 'Cnsys.Core'
import {moduleContext} from "../../ModuleContext";

export enum Type {
  /**Населено място - град, село.*/
  SETTLEMENT = 1,
  /**Община.*/
  MUNICIPALITY = 2,
  /**Област.*/
  AREA = 3,
}

TypeSystem.registerEnumInfo(Type, 'Type', moduleContext.moduleName);

@TypeSystem.typeDecorator('PlaceNomenclaturePR', moduleContext.moduleName)
export class PlaceNomenclaturePR extends BaseDataModel {

  @observable private _placeId: string = null;
  @observable private _name: string = null;
  @observable private _ekatte: string = null;
  @observable private _type: Type = null;
  @observable private _parentId: string = null;
  @observable private _siteId: string = null;
  @observable private _placePR: PlaceNomenclaturePR = null;

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  public get placeId(): string {
    return this._placeId;
  }

  @TypeSystem.propertyDecorator('string')
  public set placeId(value: string) {
    this._placeId = value;
  }

  public get name(): string {
    return this._name;
  }

  @TypeSystem.propertyDecorator('string')
  public set name(value: string) {
    this._name = value;
  }

  public get ekatte(): string {
    return this._ekatte;
  }
  @TypeSystem.propertyDecorator('string')
  public  set ekatte(value: string) {
    this._ekatte = value;
  }

  public get type(): Type {
    return this._type;
  }

  @TypeSystem.propertyDecorator(Type)
  public set type(value: Type) {
    this._type = value;
  }

  public get parentId(): string {
    return this._parentId;
  }

  @TypeSystem.propertyDecorator('string')
  public set parentId(value: string) {
    this._parentId = value;
  }

  public get siteId(): string {
    return this._siteId;
  }

  @TypeSystem.propertyDecorator('string')
  public set siteId(value: string) {
    this._siteId = value;
  }

  public get placePR(): PlaceNomenclaturePR {
    return this._placePR;
  }

  @TypeSystem.propertyDecorator(PlaceNomenclaturePR)
  public set placePR(value: PlaceNomenclaturePR) {
    this._placePR = value;
  }
}
