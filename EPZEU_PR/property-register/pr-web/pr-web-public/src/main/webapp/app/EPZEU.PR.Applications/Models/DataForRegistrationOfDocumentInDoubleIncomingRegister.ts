import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { observable } from 'mobx';
import { moduleContext } from "../ModuleContext";

@TypeSystem.typeDecorator('DataForRegistrationOfDocumentInDoubleIncomingRegister', moduleContext.moduleName)
export class DataForRegistrationOfDocumentInDoubleIncomingRegister extends BaseDataModel {
  @observable private _doubleIncomingRegisterNumber: number = null;
  @observable private _year: number = null;

  public get doubleIncomingRegisterNumber(): number {
    return this._doubleIncomingRegisterNumber;
  }

  @TypeSystem.propertyDecorator('number')
  public set doubleIncomingRegisterNumber(value: number) {
    this._doubleIncomingRegisterNumber = value;
  }

  public get year(): number {
    return this._year;
  }

  @TypeSystem.propertyDecorator('number')
  public set year(val: number) {
    this._year = val;
  }

  public clear(): void {
    this.doubleIncomingRegisterNumber = null;
    this.year = null;
  }

  constructor(obj?: any) {
    super(obj)

    this.copyFrom(obj);
  }
}
