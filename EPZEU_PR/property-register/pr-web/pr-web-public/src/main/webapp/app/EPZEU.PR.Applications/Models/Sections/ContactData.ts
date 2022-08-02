import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { observable } from "mobx";
import { moduleContext } from "../../ModuleContext";
import { Address } from "../Address";

@TypeSystem.typeDecorator('ContactData', moduleContext.moduleName)
export class ContactData extends BaseDataModel {

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  @observable private _appEmailAddress: string = null;

  public get appEmailAddress(): string {
    return this._appEmailAddress;
  }

  @TypeSystem.propertyDecorator('string')
  public set appEmailAddress(value: string) {
    this._appEmailAddress = value;
  }

  @observable private _phone: string = null;

  public get phone(): string {
    return this._phone;
  }

  @TypeSystem.propertyDecorator('string')
  public set phone(value: string) {
    this._phone = value;
  }

  @observable private _address: Address = null;

  public get address(): Address {
    return this._address;
  }

  @TypeSystem.propertyDecorator(Address ? Address : moduleContext.moduleName + '.' + 'Address')
  public set address(value: Address) {
    this._address = value;
  }

  @observable private _appAddressee: string = null;

  public get appAddressee(): string {
    return this._appAddressee;
  }

  @TypeSystem.propertyDecorator('string')
  public set appAddressee(value: string) {
    this._appAddressee = value;
  }
}
