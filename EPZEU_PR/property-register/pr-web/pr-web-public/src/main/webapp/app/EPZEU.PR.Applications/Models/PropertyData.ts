import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { observable } from "mobx";
import { moduleContext } from "../ModuleContext";
import { RequestedProperty } from "./Sections/RequestedProperty";
import { Owners } from "./Sections/Owners";


export class PropertyData extends BaseDataModel {
  @observable private _requestedProperty: RequestedProperty = null;
  @observable private _currentOwners: Owners = null;
  @observable private _previousOwners: Owners = null;

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  public get requestedProperty(): RequestedProperty {
    return this._requestedProperty;
  }

  @TypeSystem.propertyDecorator(RequestedProperty)
  public set requestedProperty(value: RequestedProperty) {
    this._requestedProperty = value;
  }

  public get currentOwners(): Owners {
    return this._currentOwners;
  }

  @TypeSystem.propertyDecorator(Owners)
  public set currentOwners(value: Owners) {
    this._currentOwners = value;
  }

  public get previousOwners(): Owners {
    return this._previousOwners;
  }

  @TypeSystem.propertyDecorator(Owners)
  public set previousOwners(value: Owners) {
    this._previousOwners = value;
  }

}


