import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { observable } from 'mobx';
import { ApplicationFormTypes } from 'EPZEU.PR.Core';
import { moduleContext } from '../ModuleContext';
import { APApplicationDocument } from './APApplicationDocument';
import { APApplicationProcessContent } from "./APApplicationProcessContent";

@TypeSystem.typeDecorator('APApplication', moduleContext.moduleName)
export class APApplication extends BaseDataModel {

  @observable private _applicationId: number = null;
  @observable private _applicationProcessId: number = null;
  @observable private _type: ApplicationFormTypes = null;
  @observable private _applicationContentId: number = null;
  @observable private _order: number = null;
  @observable private _applicationProcessContent: APApplicationProcessContent = null;
  @observable private _documents: APApplicationDocument[] = null;
  @observable private _additionalData: any = null;

  constructor(obj?: any){
    super(obj);

    this.copyFrom(obj);
  }

  public get applicationId(): number {
    return this._applicationId;
  }

  @TypeSystem.propertyDecorator('number')
  public set applicationId(value: number) {
    this._applicationId = value;
  }

  public get applicationProcessId(): number {
    return this._applicationProcessId;
  }

  @TypeSystem.propertyDecorator('number')
  public set applicationProcessId(value: number) {
    this._applicationProcessId = value;
  }

  public get type(): ApplicationFormTypes {
    return this._type;
  }

  @TypeSystem.propertyDecorator(ApplicationFormTypes)
  public set type(value: ApplicationFormTypes) {
    this._type = value;
  }

  public get applicationContentId(): number {
    return this._applicationContentId;
  }

  @TypeSystem.propertyDecorator('number')
  public set applicationContentId(value: number) {
    this._applicationContentId = value;
  }

  public get order(): number {
    return this._order;
  }

  @TypeSystem.propertyDecorator('number')
  public set order(value: number) {
    this._order = value;
  }

  public get applicationProcessContent(): APApplicationProcessContent {
    return this._applicationProcessContent;
  }

  @TypeSystem.propertyDecorator(APApplicationProcessContent)
  public set applicationProcessContent(value: APApplicationProcessContent) {
    this._applicationProcessContent = value;
  }

  public get documents(): APApplicationDocument[] {
    return this._documents;
  }

  @TypeSystem.propertyArrayDecorator(APApplicationDocument)
  public set documents(value: APApplicationDocument[]) {
    this._documents = value;
  }

  @TypeSystem.propertyDecorator('any')
  public set additionalData(val: any) {
    this._additionalData = val;
  }

  public get additionalData(): any {
    return this._additionalData;
  } 
}
