import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { moduleContext } from "../ModuleContext";
import { observable } from "mobx";

export enum SearchModeForLegalEntity{
  DEFAULT,
  STARTS_WITH,
  CONTAINS
}
TypeSystem.registerEnumInfo(SearchModeForLegalEntity, 'SearchModeForLegalEntity', moduleContext.moduleName)

@TypeSystem.typeDecorator('LegalEntitySearchCriteria', moduleContext.moduleName)
export class LegalEntitySearchCriteria extends BaseDataModel {
  //This field is only when Legal Entity is with country different from Bulgaria
  @observable private _foreignLegalEntityIdentifier: string = null;

  @observable private _registryOfficeId: string = null;

  @observable private _countryID: number = null;
  @observable private _countryName: string = null;
  @observable private _countryCodeISO: number = null;
  @observable private _countryCode: string = null;

  @observable private _companyCaseNumber: string = null;
  @observable private _companyCaseYear: string = null;
  @observable private _companyCaseCourtId: string = null;
  @observable private _companyName: string = null;
  @observable private _companyIdBulstat: string = null;

  @observable private _searchModeForLegalEntity: SearchModeForLegalEntity = SearchModeForLegalEntity.DEFAULT;

  constructor(obj?: any) {
    super(obj);
    this.copyFrom(obj);
  }


  public get countryCodeISO(): number {
    return this._countryCodeISO;
  }

  @TypeSystem.propertyDecorator('number')
  public set countryCodeISO(value: number) {
    this._countryCodeISO = value;
  }

  public get countryID(): number {
    return this._countryID;
  }

  @TypeSystem.propertyDecorator('number')
  public set countryID(value: number) {
    this._countryID = value;
  }

  public get countryName(): string {
    return this._countryName;
  }

  @TypeSystem.propertyDecorator('string')
  public set countryName(value: string) {
    this._countryName = value;
  }

  public get countryCode(): string {
    return this._countryCode;
  }

  @TypeSystem.propertyDecorator('string')
  public set countryCode(value: string) {
    this._countryCode = value;
  }

  public get companyIdBulstat(): string {
    return this._companyIdBulstat;
  }

  @TypeSystem.propertyDecorator('string')
  public set companyIdBulstat(value: string) {
    this._companyIdBulstat = value;
  }

  public get foreignLegalEntityIdentifier(): string {
    return this._foreignLegalEntityIdentifier;
  }

  @TypeSystem.propertyDecorator('string')
  public set foreignLegalEntityIdentifier(value: string) {
    this._foreignLegalEntityIdentifier = value;
  }

  public get companyCaseNumber(): string {
    return this._companyCaseNumber;
  }

  @TypeSystem.propertyDecorator('string')
  public set companyCaseNumber(value: string) {
    this._companyCaseNumber = value;
  }

  public get companyCaseYear(): string {
    return this._companyCaseYear;
  }

  @TypeSystem.propertyDecorator('string')
  public set companyCaseYear(value: string) {
    this._companyCaseYear = value;
  }

  public get companyCaseCourtId(): string {
    return this._companyCaseCourtId;
  }

  @TypeSystem.propertyDecorator('string')
  public set companyCaseCourtId(value: string) {
    this._companyCaseCourtId = value;
  }

  public get companyName(): string {
    return this._companyName;
  }

  @TypeSystem.propertyDecorator('string')
  public set companyName(value: string) {
    this._companyName = value;
  }

  public get registryOfficeId(): string {
    return this._registryOfficeId;
  }

  @TypeSystem.propertyDecorator('string')
  public set registryOfficeId(value: string) {
    this._registryOfficeId = value;
  }

  public get searchModeForLegalEntity(): SearchModeForLegalEntity {
    return this._searchModeForLegalEntity;
  }

  @TypeSystem.propertyDecorator(SearchModeForLegalEntity)
  public set searchModeForLegalEntity(value: SearchModeForLegalEntity) {
    this._searchModeForLegalEntity = value;
  }
}
