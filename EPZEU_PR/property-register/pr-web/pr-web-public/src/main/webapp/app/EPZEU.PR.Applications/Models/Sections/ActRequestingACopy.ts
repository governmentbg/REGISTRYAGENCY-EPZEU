import { observable } from "mobx";
import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { RegistryOffice } from 'EPZEU.PR.Core';
import { moduleContext } from "../../ModuleContext";
import { ActData } from "../ActData";
import { ActOldData } from "../ActOldData";

@TypeSystem.typeDecorator('ActRequestingACopy', moduleContext.moduleName)
export class ActRequestingACopy extends BaseDataModel {
  @observable private _registryOffice: RegistryOffice = null;
  @observable private _actData: ActData = null;
  @observable private _actOldData: ActOldData = null;
  @observable private _copyReason: string = null;
  @observable private _isBeforeStartDate: boolean = null;

  @TypeSystem.propertyDecorator(RegistryOffice ? RegistryOffice : moduleContext.moduleName + '.' + 'RegistryOffice')
  public set registryOffice(val: RegistryOffice) {
    this._registryOffice = val;
  }

  public get registryOffice(): RegistryOffice {
    return this._registryOffice;
  }

  @TypeSystem.propertyDecorator(ActData ? ActData : moduleContext.moduleName + '.' + 'ActData')
  public set actData(val: ActData) {
    this._actData = val;
  }

  public get actData(): ActData {
    return this._actData;
  }

  @TypeSystem.propertyDecorator(ActOldData ? ActOldData : moduleContext.moduleName + '.' + 'ActOldData')
  public set actOldData(val: ActOldData) {
    this._actOldData = val;
  }

  public get actOldData(): ActOldData {
    return this._actOldData;
  }

  @TypeSystem.propertyDecorator('string')
  public set copyReason(value: string) {
    this._copyReason = value;
  }

  public get copyReason(): string {
    return this._copyReason;
  }

  @TypeSystem.propertyDecorator('boolean')
  public set isBeforeStartDate(value: boolean) {
    this._isBeforeStartDate = value;
  }

  public get isBeforeStartDate(): boolean {
    return this._isBeforeStartDate;
  }

  constructor(obj?: any) {
    super(obj)

    this.copyFrom(obj);
  }
}
