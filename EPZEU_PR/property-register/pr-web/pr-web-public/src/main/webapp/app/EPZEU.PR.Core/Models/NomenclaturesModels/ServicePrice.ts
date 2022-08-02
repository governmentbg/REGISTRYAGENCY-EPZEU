import {observable} from "mobx";
import {TypeSystem, BaseDataModel} from 'Cnsys.Core'
import {moduleContext} from "../../ModuleContext";

@TypeSystem.typeDecorator('ServicePrice', moduleContext.moduleName)
export class ServicePrice extends BaseDataModel {
  @observable private _price: number = null;
  @observable private _prServiceTypeID: string = null;
  @observable private _epzeuServiceTypeID: number = null;

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  public get price(): number {
    return this._price;
  }

  @TypeSystem.propertyDecorator('number')
  public set price(value: number) {
    this._price = value;
  }

  public get prServiceTypeID(): string {
    return this._prServiceTypeID;
  }

  @TypeSystem.propertyDecorator('string')
  public set prServiceTypeID(value: string) {
    this._prServiceTypeID = value;
  }

  public get epzeuServiceTypeID(): number {
    return this._epzeuServiceTypeID;
  }

  @TypeSystem.propertyDecorator('number')
  public set epzeuServiceTypeID(value: number) {
    this._epzeuServiceTypeID = value;
  }
}
