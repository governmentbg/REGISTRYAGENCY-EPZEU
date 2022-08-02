import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { observable } from 'mobx';
import { moduleContext } from '../ModuleContext';

@TypeSystem.typeDecorator('APApplicationProcessContent', moduleContext.moduleName)
export class APApplicationProcessContent extends BaseDataModel {
  @observable private _applicationProcessContentId: number = null;
  @observable private _type: number = null;
  @observable private _content: any = null;
  @observable private _applicationProcessId: number = null;

  constructor(obj?: any){
    super(obj);

    this.copyFrom(obj);
  }

  public get applicationProcessContentId(): number {
    return this._applicationProcessContentId;
  }

  @TypeSystem.propertyDecorator('number')
  public set applicationProcessContentId(value: number) {
    this._applicationProcessContentId = value;
  }

  public get type(): number {
    return this._type;
  }

  @TypeSystem.propertyDecorator('number')
  public set type(value: number) {
    this._type = value;
  }

  public get content(): any {
    return this._content;
  }

  @TypeSystem.propertyDecorator('any')
  public set content(value: any) {
    this._content = value;
  }

  public get applicationProcessId(): number {
    return this._applicationProcessId;
  }

  @TypeSystem.propertyDecorator('number')
  public set applicationProcessId(value: number) {
    this._applicationProcessId = value;
  }
}
