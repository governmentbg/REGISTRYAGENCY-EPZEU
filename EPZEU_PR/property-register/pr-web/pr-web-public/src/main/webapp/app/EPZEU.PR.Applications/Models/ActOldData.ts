import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { observable } from 'mobx';
import { moduleContext } from '../ModuleContext';

@TypeSystem.typeDecorator('ActOldData', moduleContext.moduleName)
export class ActOldData extends BaseDataModel {
  @observable private _actOldNumber: string = null;
  @observable private _volumeOld: string = null;
  @observable private _caseNumber: string = null;
  @observable private _year: number = null;
  @observable private _actAdditionalData: string = null;

  @TypeSystem.propertyDecorator('string')
  public set actOldNumber(value: string) {
    this._actOldNumber = value;
  }

  public get actOldNumber(): string {
    return this._actOldNumber;
  }

  @TypeSystem.propertyDecorator('string')
  public set volumeOld(value: string) {
    this._volumeOld = value;
  }

  public get volumeOld(): string {
    return this._volumeOld;
  }

  @TypeSystem.propertyDecorator('string')
  public set caseNumber(value: string) {
    this._caseNumber = value;
  }

  public get caseNumber(): string {
    return this._caseNumber;
  }

  @TypeSystem.propertyDecorator('number')
  public set year(value: number) {
    this._year = value;
  }

  public get year(): number {
    return this._year;
  }

  @TypeSystem.propertyDecorator('string')
  public set actAdditionalData(value: string) {
    this._actAdditionalData = value;
  }

  public get actAdditionalData(): string {
    return this._actAdditionalData;
  }

  public clear(): void {
    this.actOldNumber = null;
    this.volumeOld = null;
    this.caseNumber = null;
    this.year = null;
    this.actAdditionalData = null;
  }

  constructor(obj?: any) {
    super(obj)

    this.copyFrom(obj);
  }
}
