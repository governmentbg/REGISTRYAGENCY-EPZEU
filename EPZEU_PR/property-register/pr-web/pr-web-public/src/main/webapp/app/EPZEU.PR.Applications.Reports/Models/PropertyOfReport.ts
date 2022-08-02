import { observable } from "mobx";
import { TypeSystem, BaseDataModel } from "Cnsys.Core";
import { resourceManager } from "EPZEU.Core";
import { PropertyType, RegistryOffice, PlaceNomenclaturePR, PermanentUsage } from "EPZEU.PR.Core";
import { moduleContext } from "../ModuleContext";

@TypeSystem.typeDecorator('PropertyOfReport', moduleContext.moduleName)
export class PropertyOfReport extends BaseDataModel {

  @observable private _propertyId: string = null;
  @observable private _propertyType: PropertyType = null;
  @observable private _accountNumber: number = null;
  @observable private _cadastralIdentifier: string = null;
  @observable private _permanentUsage: PermanentUsage = null;
  @observable private _cadastreNumber: number = null;
  @observable private _regulatedNeighborhood: number = null;
  @observable private _plot: string = null;
  @observable private _place: string = null;
  @observable private _settlement: PlaceNomenclaturePR = null;
  @observable private _street: string = null;
  @observable private _streetNumber: string = null;
  @observable private _district: string = null;
  @observable private _building: string = null;
  @observable private _entrance: string = null;
  @observable private _floor: number = null;
  @observable private _flat: string = null;
  @observable private _areaByDocuments: string = null;
  @observable private _remark: string = null;
  @observable private _oldAccountNumber: number = null;
  @observable private _registryOffice: RegistryOffice = null;
  @observable private _housingEstate: string = null;

  constructor(obj?: any) {
    super(obj);
    this.copyFrom(obj);
  }

  public get propertyId(): string {
    return this._propertyId;
  }

  @TypeSystem.propertyDecorator('string')
  public set propertyId(value: string) {
    this._propertyId = value;
  }

  public get propertyType(): PropertyType {
    return this._propertyType;
  }

  @TypeSystem.propertyDecorator(PropertyType)
  public set propertyType(value: PropertyType) {
    this._propertyType = value;
  }

  public get accountNumber(): number {
    return this._accountNumber;
  }

  @TypeSystem.propertyDecorator('number')
  public set accountNumber(value: number) {
    this._accountNumber = value;
  }

  public get cadastralIdentifier(): string {
    return this._cadastralIdentifier;
  }

  @TypeSystem.propertyDecorator('string')
  public set cadastralIdentifier(value: string) {
    this._cadastralIdentifier = value;
  }

  public get permanentUsage(): PermanentUsage {
    return this._permanentUsage;
  }

  @TypeSystem.propertyDecorator(PermanentUsage)
  public set permanentUsage(value: PermanentUsage) {
    this._permanentUsage = value;
  }

  public get cadastreNumber(): number {
    return this._cadastreNumber;
  }

  @TypeSystem.propertyDecorator('number')
  public set cadastreNumber(value: number) {
    this._cadastreNumber = value;
  }

  public get regulatedNeighborhood(): number {
    return this._regulatedNeighborhood;
  }

  @TypeSystem.propertyDecorator('number')
  public set regulatedNeighborhood(value: number) {
    this._regulatedNeighborhood = value;
  }

  public get plot(): string {
    return this._plot;
  }

  @TypeSystem.propertyDecorator('string')
  public set plot(value: string) {
    this._plot = value;
  }

  public get place(): string {
    return this._place;
  }

  @TypeSystem.propertyDecorator('string')
  public set place(value: string) {
    this._place = value;
  }

  public get settlement(): PlaceNomenclaturePR {
    return this._settlement;
  }

  @TypeSystem.propertyDecorator(PlaceNomenclaturePR)
  public set settlement(value: PlaceNomenclaturePR) {
    this._settlement = value;
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

  public get district(): string {
    return this._district;
  }

  @TypeSystem.propertyDecorator('string')
  public set district(value: string) {
    this._district = value;
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

  public get floor(): number {
    return this._floor;
  }

  @TypeSystem.propertyDecorator('number')
  public set floor(value: number) {
    this._floor = value;
  }

  public get flat(): string {
    return this._flat;
  }

  @TypeSystem.propertyDecorator('string')
  public set flat(value: string) {
    this._flat = value;
  }

  public get areaByDocuments(): string {
    return this._areaByDocuments;
  }

  @TypeSystem.propertyDecorator('string')
  public set areaByDocuments(value: string) {
    this._areaByDocuments = value;
  }

  public get remark(): string {
    return this._remark;
  }

  @TypeSystem.propertyDecorator('string')
  public set remark(value: string) {
    this._remark = value;
  }

  public get oldAccountNumber(): number {
    return this._oldAccountNumber;
  }

  @TypeSystem.propertyDecorator('number')
  public set oldAccountNumber(value: number) {
    this._oldAccountNumber = value;
  }

  public get registryOffice(): RegistryOffice {
    return this._registryOffice;
  }

  @TypeSystem.propertyDecorator(RegistryOffice)
  public set registryOffice(value: RegistryOffice) {
    this._registryOffice = value;
  }

  public get housingEstate(): string {
    return this._housingEstate;
  }

  @TypeSystem.propertyDecorator('string')
  public set housingEstate(value: string) {
    this._housingEstate = value;
  }

  public toString(): string {
    let toString = "";
    if (this.propertyType && this.propertyType.name) {
      toString = "<p class=\"field-text\"><span class =\"field-title field-title--preview\">" + this.propertyType.name + "</span></p><p class=\"field-text\">"
    } else {
      toString = "<p class=\"field-text\"><span class =\"field-title field-title--preview\">" + resourceManager.getResourceByKey('PR_APP_PROPERTY_L') + "</span></p><p class=\"form-text\">"
    }
    if (this.accountNumber)
      toString += "<span class =\"field-title field-title--preview\">" + resourceManager.getResourceByKey('PR_APP_ACCOUNT_NUMBER_L') + ": </span>" + this.accountNumber + ", "
    if (this.cadastralIdentifier)
      toString += "<span class =\"field-title field-title--preview\">" + resourceManager.getResourceByKey('PR_APP_CADASTRAL_IDENTIFIER_L') + ": </span>" + this.cadastralIdentifier + ", "
    if (this.permanentUsage && this.permanentUsage.name)
      toString += "<span class =\"field-title field-title--preview\">" + resourceManager.getResourceByKey('PR_APP_00029_L') + ": </span>" + this.permanentUsage.name + ", "
    if (this.cadastreNumber)
      toString += "<span class =\"field-title field-title--preview\">" + resourceManager.getResourceByKey('PR_APP_CADASTRE_NUMBER_L') + ": </span>" + this.cadastreNumber + " "
    if (this.regulatedNeighborhood)
      toString += "<span class =\"field-title field-title--preview\">" + resourceManager.getResourceByKey('PR_APP_REGULATED_AREA_L') + ": </span>" + this.regulatedNeighborhood + ", "
    if (this.plot)
      toString += "<span class =\"field-title field-title--preview\">" + resourceManager.getResourceByKey('PR_APP_PLOT_L') + ": </span>" + this.plot + ", "
    if (this.place)
      toString += "<span class =\"field-title field-title--preview\">" + resourceManager.getResourceByKey('PR_APP_PLACE_OF_PROPERTY_L') + ": </span>" + this.place + ", "
    if (this.settlement && this.settlement.placeId && this.settlement.name && this.settlement.placePR && this.settlement.placePR.name && this.settlement.placePR.placePR.name) {
      toString += this.settlement.name + ", " + this.settlement.placePR.name + "," + this.settlement.placePR.placePR.name + ", "
      if (this.street) {
        toString += resourceManager.getResourceByKey('GL_STREET_L') + " " + this.street + ", "
      }
      if (this.streetNumber) {
        toString += "№" + " " + this.streetNumber + ", "
      }
      if (this.district) {
        toString += "<span class =\"field-title field-title--preview\">" + resourceManager.getResourceByKey('PR_APP_RESIDENTIAL_DISTRICT_L') + ": </span>" + this.district + ", "
      }
      if (this.housingEstate) {
        toString += "<span class =\"field-title field-title--preview\">" + resourceManager.getResourceByKey('PR_APP_RESIDENTIAL_DISTRICT_L') + ": </span>" + this.housingEstate + ", "
      }
      if (this.building) {
        toString += resourceManager.getResourceByKey('GL_BUILDING_ABBREVATION_L') + " " + this.building + ", "
      }
      if (this.entrance) {
        toString += resourceManager.getResourceByKey('GL_ENTRANCE_ABBREVATION_L') + " " + this.entrance + ", "
      }
      if (this.floor) {
        toString += resourceManager.getResourceByKey('GL_FLOOR_ABBREVATION_L') + " " + this.floor + ", "
      }
      if (this.flat) {
        toString += resourceManager.getResourceByKey('GL_FLAT_ABBREVATION_L') + " " + this.flat + ", "
      }
    }
    if (this.areaByDocuments)
      toString += "<span class =\"field-title field-title--preview\">" + resourceManager.getResourceByKey('PR_APP_00030_L') + ": </span>" + this.areaByDocuments + (this.remark || this.oldAccountNumber ? ", " : "");
    if (this.remark)
      toString += "<span class =\"field-title field-title--preview\">" + resourceManager.getResourceByKey('PR_APP_PROPERTY_REMARK_L') + ": </span>" + this.remark + (this.oldAccountNumber ? ", " : "");
    if (this.oldAccountNumber)
      toString += "<span class =\"field-title field-title--preview\">" + resourceManager.getResourceByKey('PR_APP_OLD_ACCOUNT_NUMBER_L') + ": </span>" + this.oldAccountNumber;
    toString += "</p>";

    return toString;
  }
}
