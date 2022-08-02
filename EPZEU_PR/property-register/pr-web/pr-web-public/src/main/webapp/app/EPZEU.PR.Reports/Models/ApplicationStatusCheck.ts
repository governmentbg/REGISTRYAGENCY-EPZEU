import { observable } from "mobx";
import * as moment from 'moment';
import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { RegistryOffice } from "EPZEU.PR.Core";
import { moduleContext } from "../ModuleContext";

@TypeSystem.typeDecorator('ApplicationStatusCheck', moduleContext.moduleName)
export class ApplicationStatusCheck extends BaseDataModel {
  @observable private _regNumber: string = null;
  @observable private _registrationDate: moment.Moment = null;
  @observable private _registerId: string = null;
  @observable private _registryOffice: RegistryOffice = null;
  @observable private _applicationNumber: string = null;
  @observable private _isSearchByApplicationNumberSelected: boolean = null;
  
  constructor(obj?: any) {
    super(obj);
    this.copyFrom(obj);
  }

  @TypeSystem.propertyDecorator('string')
  public set regNumber(value: string) {
    this._regNumber = value;
  }

  public get regNumber(): string {
    return this._regNumber;
  }

  public get registrationDate(): moment.Moment {
    return this._registrationDate;
  }

  @TypeSystem.propertyDecorator('moment')
  public set registrationDate(val: moment.Moment) {
    this._registrationDate = val;
  }

  @TypeSystem.propertyDecorator('string')
  public set registerId(value: string) {
    this._registerId = value;
  }

  public get registerId(): string {
    return this._registerId;
  }

  @TypeSystem.propertyDecorator(RegistryOffice ? RegistryOffice : moduleContext.moduleName + '.' + 'RegistryOffice')
  public set registryOffice(val: RegistryOffice) {
    this._registryOffice = val;
  }

  public get registryOffice(): RegistryOffice {
    return this._registryOffice;
  }

  @TypeSystem.propertyDecorator('string')
  public set applicationNumber(value: string) {
    this._applicationNumber = value;
  }

  public get applicationNumber(): string {
    return this._applicationNumber;
  }

  @TypeSystem.propertyDecorator('boolean')
  public set isSearchByApplicationNumberSelected(value: boolean) {
    this._isSearchByApplicationNumberSelected = value;
  }

  public get isSearchByApplicationNumberSelected(): boolean {
    return this._isSearchByApplicationNumberSelected;
  }

  public clear(): void {
    this.regNumber = null;
    this.registrationDate = null;
    this.registerId = null;
    this.registryOffice = null;
    this.applicationNumber = null;
  }
}
