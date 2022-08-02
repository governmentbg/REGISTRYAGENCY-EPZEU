import { RegisterType, RegistryOffice } from "EPZEU.PR.Core";
import { observable } from "mobx";
import * as moment from 'moment';
import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { moduleContext } from "../../ModuleContext";

@TypeSystem.typeDecorator('InitialApplicationData', moduleContext.moduleName)
export class InitialApplicationData extends BaseDataModel {

  @observable private _incomingReauNumber: string = null;
  @observable private _registerNumber: number = null;
  @observable private _registerDate: moment.Moment = null;
  @observable private _registerType: RegisterType = null;
  @observable private _registryOffice: RegistryOffice = null;

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  public  get incomingReauNumber(): string {
    return this._incomingReauNumber;
  }

  @TypeSystem.propertyDecorator('string')
  public set incomingReauNumber(incomingReauNumber: string) {
    this._incomingReauNumber = incomingReauNumber;
  }

  public  get registerNumber(): number {
    return this._registerNumber;
  }

  @TypeSystem.propertyDecorator('number')
  public set registerNumber(registerNumber: number) {
    this._registerNumber = registerNumber;
  }

  public  get registerDate(): moment.Moment {
    return this._registerDate;
  }

  @TypeSystem.propertyDecorator('moment')
  public set registerDate(registerDate: moment.Moment) {
    this._registerDate = registerDate;
  }

  public  get registerType(): RegisterType {
    return this._registerType;
  }

  @TypeSystem.propertyDecorator(RegisterType)
  public set registerType(registerType: RegisterType) {
    this._registerType = registerType;
  }

  public  get registryOffice(): RegistryOffice {
    return this._registryOffice;
  }

  @TypeSystem.propertyDecorator(RegistryOffice)
  public set registryOffice(registryOffice: RegistryOffice) {
    this._registryOffice = registryOffice;
  }
}
