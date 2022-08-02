import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { observable } from 'mobx';
import { ProcessStatuses } from './ProcessStatuses';
import { moduleContext } from '../ModuleContext';
import { APApplication } from './APApplication';

@TypeSystem.typeDecorator('APApplicationProcess', moduleContext.moduleName)
export class APApplicationProcess extends BaseDataModel {

  @observable private _applicationProcessId: number = null;
  @observable private _applicantId: number = null;
  @observable private _mainApplicationId: number = null;
  @observable private _status: ProcessStatuses = null;
  @observable private _applications: APApplication[] = null;
  @observable private _hasChangesInApplicationsNomenclature: boolean = null;

  constructor(obj?: any){
    super(obj);

    this.copyFrom(obj);
  }

  public get applicationProcessId(): number {
    return this._applicationProcessId;
  }

  @TypeSystem.propertyDecorator('number')
  public set applicationProcessId(value: number) {
    this._applicationProcessId = value;
  }

  public get applicantId(): number {
    return this._applicantId;
  }

  @TypeSystem.propertyDecorator('number')
  public set applicantId(value: number) {
    this._applicantId = value;
  }

  public get mainApplicationId(): number {
    return this._mainApplicationId;
  }

  @TypeSystem.propertyDecorator('number')
  public set mainApplicationId(value: number) {
    this._mainApplicationId = value;
  }

  public get status(): ProcessStatuses {
    return this._status;
  }

  @observable private _signingGuid: string = null;

  /**Идентификатор на заявката за подписване в модула за подписване.*/
  @TypeSystem.propertyDecorator('string')
  public set signingGuid(val: string) {
    this._signingGuid = val;
  }

  /**Идентификатор на заявката за подписване в модула за подписване.*/
  public get signingGuid(): string {
    return this._signingGuid;
  }

  @observable private _errorMessage: string = null;

  /**Съобщение за грешка при обработката на процеса*/
  @TypeSystem.propertyDecorator('string')
  public set errorMessage(val: string) {
    this._errorMessage = val;
  }

  /**Съобщение за грешка при обработката на процеса*/
  public get errorMessage(): string {
    return this._errorMessage;
  }

  @observable private _incomingNumbers: string[] = null;

  /**Входящ номер на заявлението в CR*/
  @TypeSystem.propertyArrayDecorator('string')
  public set incomingNumbers(val: string[]) {
    this._incomingNumbers = val;
  }

  /**Входящ номер на заявлението в CR*/
  public get incomingNumbers(): string[] {
    return this._incomingNumbers;
  }

  @TypeSystem.propertyDecorator(ProcessStatuses)
  public set status(value: ProcessStatuses) {
    this._status = value;
  }
  
  public get applications(): APApplication[] {
    return this._applications;
  }

  @TypeSystem.propertyArrayDecorator(APApplication)
  public set applications(value: APApplication[]) {
    this._applications = value;
  }

  /**Индикира дали има направени промени по номенклатурите.*/
  get hasChangesInApplicationsNomenclature(): boolean {
    return this._hasChangesInApplicationsNomenclature;
  }
  @TypeSystem.propertyDecorator('boolean')
  set hasChangesInApplicationsNomenclature(value: boolean) {
    this._hasChangesInApplicationsNomenclature = value;
  }
}
