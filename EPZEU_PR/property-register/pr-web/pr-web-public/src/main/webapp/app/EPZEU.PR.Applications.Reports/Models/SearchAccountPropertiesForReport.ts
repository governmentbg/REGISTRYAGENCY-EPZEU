import { TypeSystem, BaseDataModel } from "Cnsys.Core";
import { observable } from "mobx";
import { moduleContext } from "../ModuleContext";
import { AccountPropertyOfReport } from "./AccountPropertyOfReport";

@TypeSystem.typeDecorator('SearchAccountsForReport', moduleContext.moduleName)
export class SearchAccountPropertiesForReport extends BaseDataModel {
  @observable private _registryOfficeId: string = null;
  @observable private _registryOfficeName: string = null;
  @observable private _cadastralIdentifier: string = null;
  @observable private _accountNumber: string = null;
  @observable private _cadastralIdentifierForm: boolean = true;
  @observable private _accountNumberForm: boolean = false;

  @observable private _items: AccountPropertyOfReport[] = [];

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  get cadastralIdentifierForm(): boolean {
    return this._cadastralIdentifierForm;
  }

  @TypeSystem.propertyDecorator('boolean')
  set cadastralIdentifierForm(value: boolean) {
    this._cadastralIdentifierForm = value;
  }

  get accountNumberForm(): boolean {
    return this._accountNumberForm;
  }

  @TypeSystem.propertyDecorator('boolean')
  set accountNumberForm(value: boolean) {
    this._accountNumberForm = value;
  }

  public get registryOfficeId(): string {
    return this._registryOfficeId;
  }

  @TypeSystem.propertyDecorator('string')
  public set registryOfficeId(value: string) {
    this._registryOfficeId = value;
  }

 public get registryOfficeName(): string {
    return this._registryOfficeName;
  }

  @TypeSystem.propertyDecorator('string')
 public set registryOfficeName(value: string) {
    this._registryOfficeName = value;
  }

  public get cadastralIdentifier(): string {
    return this._cadastralIdentifier;
  }

  @TypeSystem.propertyDecorator('string')
  public set cadastralIdentifier(value: string) {
    this._cadastralIdentifier = value;
  }

  public get accountNumber(): string {
    return this._accountNumber;
  }

  @TypeSystem.propertyDecorator('string')
  public set accountNumber(value: string) {
    this._accountNumber = value;
  }

  public get items(): AccountPropertyOfReport[] {
    return this._items;
  }

  @TypeSystem.propertyDecorator(AccountPropertyOfReport)
  public set items(value: AccountPropertyOfReport[]) {
    this._items = value;
  }
}
