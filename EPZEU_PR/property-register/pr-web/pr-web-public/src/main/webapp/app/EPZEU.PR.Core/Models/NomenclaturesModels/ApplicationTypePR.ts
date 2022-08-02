import {observable} from "mobx";
import {TypeSystem, BaseDataModel} from 'Cnsys.Core'
import {moduleContext} from "../../ModuleContext";
import {ServicePrice} from "./ServicePrice";

@TypeSystem.typeDecorator('ApplicationTypePR', moduleContext.moduleName)
export class ApplicationTypePR extends BaseDataModel {
  @observable private _applicationTypeId: number = null;
  @observable private _appType: number = null;
  @observable private _name: string = null;
  @observable private _prTypeId: string = null;
  @observable private _processInREAU: boolean = null;
  @observable private _prices: ServicePrice[] = [];

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  public get applicationTypeId(): number {
    return this._applicationTypeId;
  }

  @TypeSystem.propertyDecorator('number')
  public set applicationTypeId(value: number) {
    this._applicationTypeId = value;
  }

  public get appType(): number {
    return this._appType;
  }

  @TypeSystem.propertyDecorator('number')
  public set appType(value: number) {
    this._appType = value;
  }

  public get name(): string {
    return this._name;
  }

  @TypeSystem.propertyDecorator('string')
  public set name(value: string) {
    this._name = value;
  }

  public get prTypeId(): string {
    return this._prTypeId;
  }

  @TypeSystem.propertyDecorator('string')
  public set prTypeId(value: string) {
    this._prTypeId = value;
  }

  public get processInREAU(): boolean {
    return this._processInREAU;
  }

  @TypeSystem.propertyDecorator('boolean')
  public set processInREAU(value: boolean) {
    this._processInREAU = value;
  }

  public get prices(): ServicePrice[] {
    return this._prices;
  }

  @TypeSystem.propertyArrayDecorator('number')
  public set prices(value: ServicePrice[]) {
    this._prices = value;
  }
}
