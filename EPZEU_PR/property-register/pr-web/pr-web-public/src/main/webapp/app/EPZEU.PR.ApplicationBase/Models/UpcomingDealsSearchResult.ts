import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { observable } from "mobx";
import { moduleContext } from "../ModuleContext";
import { UpcomingDeal } from './UpcomingDeal';

@TypeSystem.typeDecorator('UpcomingDealsSearchResult', moduleContext.moduleName)
export class UpcomingDealsSearchResult extends BaseDataModel {

  @observable private _deals: UpcomingDeal[] = null;

  constructor(obj?: any) {
    super(obj);

    this.copyFrom(obj);
  }

  public get deals(): UpcomingDeal[] {
    return this._deals;
  }

  @TypeSystem.propertyArrayDecorator(UpcomingDeal ? UpcomingDeal : moduleContext.moduleName + '.' + 'UpcomingDeal')
  public set deals(value: UpcomingDeal[]) {
    this._deals = value;
  }

}
