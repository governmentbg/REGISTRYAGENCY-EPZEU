import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { observable } from "mobx";
import { moduleContext } from "../ModuleContext";
import * as moment from "moment";
import { ApplicationStatusResultInfo } from "./ApplicationStatusResultInfo";

@TypeSystem.typeDecorator('ApplicationREAU', moduleContext.moduleName)
export class ApplicationREAU extends BaseDataModel {
  @observable private _applicationIdentifier: string = null;
  @observable private _applicationStatusResultInfo: ApplicationStatusResultInfo = null;
  @observable private _applicationType: string = null;
  @observable private _registrationTime: moment.Moment = null;
  @observable private _cin: number = null;
  @observable private _registerIncomingID: string = null;
  @observable private _registerNumber: string = null;
  @observable private _registerDate: moment.Moment = null;
  @observable private _registerSiteID: string = null;
  @observable private _registerTypeID: string = null;
  @observable private _lastApplicationForCorrectionIdentifier: string = null;
  @observable private _lastApplicationForCorrectionRegTime: moment.Moment = null;

  constructor(obj?: any) {
    super(obj);
    this.copyFrom(obj);
  }

  public get applicationIdentifier(): string {
    return this._applicationIdentifier;
  }

  @TypeSystem.propertyDecorator('string')
  public set applicationIdentifier(value: string) {
    this._applicationIdentifier = value;
  }

  public get applicationType(): string {
    return this._applicationType;
  }

  @TypeSystem.propertyDecorator('string')
  public set applicationType(value: string) {
    this._applicationType = value;
  }

  public get registrationTime(): moment.Moment {
    return this._registrationTime;
  }

  @TypeSystem.propertyDecorator('moment')
  public set registrationTime(value: moment.Moment) {
    this._registrationTime = value;
  }


  get applicationStatusResultInfo(): ApplicationStatusResultInfo {
    return this._applicationStatusResultInfo;
  }
  @TypeSystem.propertyDecorator(ApplicationStatusResultInfo ? ApplicationStatusResultInfo : moduleContext.moduleName + '.' + 'ApplicationStatusResultInfo')
  set applicationStatusResultInfo(value: ApplicationStatusResultInfo) {
    this._applicationStatusResultInfo = value;
  }

  get cin(): number {
    return this._cin;
  }

  @TypeSystem.propertyDecorator('number')
  set cin(value: number) {
    this._cin = value;
  }

  get registerIncomingID(): string {
    return this._registerIncomingID;
  }

  @TypeSystem.propertyDecorator('string')
  set registerIncomingID(value: string) {
    this._registerIncomingID = value;
  }

  public get registerNumber(): string {
    return this._registerNumber;
  }

  @TypeSystem.propertyDecorator('string')
  public  set registerNumber(value: string) {
    this._registerNumber = value;
  }

  get registerDate(): moment.Moment {
    return this._registerDate;
  }

  @TypeSystem.propertyDecorator('moment')
  set registerDate(value: moment.Moment) {
    this._registerDate = value;
  }

  get registerSiteID(): string {
    return this._registerSiteID;
  }

  @TypeSystem.propertyDecorator('string')
  set registerSiteID(value: string) {
    this._registerSiteID = value;
  }

  get registerTypeID(): string {
    return this._registerTypeID;
  }

  @TypeSystem.propertyDecorator('string')
  set registerTypeID(value: string) {
    this._registerTypeID = value;
  }

  get lastApplicationForCorrectionIdentifier(): string {
    return this._lastApplicationForCorrectionIdentifier;
  }

  @TypeSystem.propertyDecorator('string')
  set lastApplicationForCorrectionIdentifier(value: string) {
    this._lastApplicationForCorrectionIdentifier = value;
  }

  get lastApplicationForCorrectionRegTime(): moment.Moment {
    return this._lastApplicationForCorrectionRegTime;
  }

  @TypeSystem.propertyDecorator('moment')
  set lastApplicationForCorrectionRegTime(value: moment.Moment) {
    this._lastApplicationForCorrectionRegTime = value;
  }
}
