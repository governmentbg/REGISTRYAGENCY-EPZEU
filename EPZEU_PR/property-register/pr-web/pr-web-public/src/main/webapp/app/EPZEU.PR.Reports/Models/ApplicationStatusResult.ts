import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { observable } from "mobx";
import * as moment from 'moment';
import { moduleContext } from "../ModuleContext";

@TypeSystem.typeDecorator('ApplicationStatusResult', moduleContext.moduleName)
export class ApplicationStatusResult extends BaseDataModel {
  @observable private _applicationIdentifier: string = null;
  @observable private _applicationRegTime: moment.Moment = null;
  @observable private _applicationType: number = null;
  @observable private _receptionType: ReceptionTypes = null;
  @observable private _registerDate: moment.Moment = null;
  @observable private _registerIdentifier: string = null;
  @observable private _registerNumber: string = null;
  @observable private _registerSiteId: string = null;
  @observable private _serviceStatus: string = null;
  @observable private _registryOfficeId: string = null;
  @observable private _serviceStatusTime: moment.Moment = null;
  @observable private _applicationTypeNameFromPR: string = null;

  constructor(obj?: any) {
    super(obj);
    this.copyFrom(obj);
  }

  @TypeSystem.propertyDecorator('string')
  public set applicationIdentifier(value: string) {
    this._applicationIdentifier = value;
  }

  public get applicationIdentifier(): string {
    return this._applicationIdentifier;
  }

  @TypeSystem.propertyDecorator('string')
  public set registerNumber(value: string) {
    this._registerNumber = value;
  }

  public get registerNumber(): string {
    return this._registerNumber;
  }

  @TypeSystem.propertyDecorator('number')
  public set applicationType(value: number) {
    this._applicationType = value;
  }

  public get applicationType(): number {
    return this._applicationType;
  }

  @TypeSystem.propertyDecorator('string')
  public set serviceStatus(value: string) {
    this._serviceStatus = value;
  }

  public get serviceStatus(): string {
    return this._serviceStatus;
  }

  public get registerDate(): moment.Moment {
    return this._registerDate;
  }

  @TypeSystem.propertyDecorator('moment')
  public set registerDate(val: moment.Moment) {
    this._registerDate = val;
  }

  public get applicationRegTime(): moment.Moment {
    return this._applicationRegTime;
  }

  @TypeSystem.propertyDecorator('moment')
  public set applicationRegTime(val: moment.Moment) {
    this._applicationRegTime = val;
  }

  @TypeSystem.propertyDecorator('string')
  public set registerIdentifier(value: string) {
    this._registerIdentifier = value;
  }

  public get registerIdentifier(): string {
    return this._registerIdentifier;
  }

  @TypeSystem.propertyDecorator('string')
  public set registryOfficeId(value: string) {
    this._registryOfficeId = value;
  }

  public get registryOfficeId(): string {
    return this._registryOfficeId;
  }

  public get receptionType(): ReceptionTypes {
    return this._receptionType;
  }

  @TypeSystem.propertyDecorator(ReceptionTypes ? ReceptionTypes : moduleContext.moduleName + '.' + 'ReceptionTypes')
  public set receptionType(value: ReceptionTypes) {
    this._receptionType = value;
  }

  @TypeSystem.propertyDecorator('string')
  public set registerSiteId(value: string) {
    this._registerSiteId = value;
  }

  public get registerSiteId(): string {
    return this._registerSiteId;
  }

  public get serviceStatusTime(): moment.Moment {
    return this._serviceStatusTime;
  }

  @TypeSystem.propertyDecorator('moment')
  public set serviceStatusTime(val: moment.Moment) {
    this._serviceStatusTime = val;
  }

  @TypeSystem.propertyDecorator('string')
  public set applicationTypeNameFromPR(value: string) {
    this._applicationTypeNameFromPR = value;
  }

  public get applicationTypeNameFromPR(): string {
    return this._applicationTypeNameFromPR;
  }
}

export enum ReceptionTypes {
  EPZEU = 1,
  RegistryOffice = 2
}

TypeSystem.registerEnumInfo(ReceptionTypes, 'ReceptionTypes', moduleContext.moduleName);
