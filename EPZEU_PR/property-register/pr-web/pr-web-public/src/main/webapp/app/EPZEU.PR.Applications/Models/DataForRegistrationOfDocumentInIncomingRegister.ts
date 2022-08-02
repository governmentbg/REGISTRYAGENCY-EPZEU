import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { observable } from 'mobx';
import * as moment from 'moment';
import { moduleContext } from "../ModuleContext";

@TypeSystem.typeDecorator('DataForRegistrationOfDocumentInIncomingRegister', moduleContext.moduleName)
export class DataForRegistrationOfDocumentInIncomingRegister extends BaseDataModel {
  @observable private _incomingRegisterNumber: number = null;
  @observable private _registrationDate: moment.Moment = null;

  public get incomingRegisterNumber(): number {
    return this._incomingRegisterNumber;
  }

  @TypeSystem.propertyDecorator('number')
  public set incomingRegisterNumber(value: number) {
    this._incomingRegisterNumber = value;
  }

  public get registrationDate(): moment.Moment {
    return this._registrationDate;
  }

  @TypeSystem.propertyDecorator('moment')
  public set registrationDate(val: moment.Moment) {
    this._registrationDate = val;
  }

  public clear(): void {
    this.incomingRegisterNumber = null;
    this.registrationDate = null;
  }

  constructor(obj?: any) {
    super(obj)

    this.copyFrom(obj);
  }
}
