import { observable } from "mobx";
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { moduleContext } from '../ModuleContext';

@TypeSystem.typeDecorator('BirthPlace', moduleContext.moduleName)
export class BirthPlace extends BaseDataModel {

  @observable private _country: string = null;
  @observable private _place: string = null;

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  @TypeSystem.propertyDecorator('string')
  public set country(val: string) {
    this._country = val;
  }

  public get country(): string {
    return this._country;
  }

  @TypeSystem.propertyDecorator('string')
  public set place(val: string) {
    this._place = val;
  }

  public get place(): string {
    return this._place;
  }
}
