import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import {computed, observable} from "mobx";
import { moduleContext } from "../ModuleContext";

@TypeSystem.typeDecorator('IndividualSearchCriteria', moduleContext.moduleName)
export class IndividualSearchCriteria extends BaseDataModel {

  @observable private _registryOfficeId: string = null;
  @observable private _identity: string = null;
  @observable private _byPartOfName: boolean = false;
  @observable private _firstName: string = null;
  @observable private _surName: string = null;
  @observable private _familyName: string = null;

  constructor(obj?: any) {
    super(obj);
    this.registryOfficeId = null;
    this.identity = null;
    this.byPartOfName = false;
    this.firstName = null;
    this.surName = null;
    this.familyName = null;

    this.copyFrom(obj);
  }

  public get registryOfficeId(): string {
    return this._registryOfficeId;
  }
  @TypeSystem.propertyDecorator('string')
  public set registryOfficeId(value: string) {
    this._registryOfficeId = value;
  }

  public get byPartOfName(): boolean {
    return this._byPartOfName;
  }

  @TypeSystem.propertyDecorator('boolean')
  public set byPartOfName(value: boolean) {
    this._byPartOfName = value;
  }

  public get identity(): string {
    return this._identity;
  }

  @TypeSystem.propertyDecorator('string')
  public set identity(value: string) {
    this._identity = value;
  }

  public get firstName(): string {
    return this._firstName;
  }

  @TypeSystem.propertyDecorator('string')
  public set firstName(value: string) {
    this._firstName = value;
  }

  public get surName(): string {
    return this._surName;
  }

  @TypeSystem.propertyDecorator('string')
  public set surName(value: string) {
    this._surName = value;
  }

  public get familyName(): string {
    return this._familyName;
  }

  @TypeSystem.propertyDecorator('string')
  public set familyName(value: string) {
    this._familyName = value;
  }

}
