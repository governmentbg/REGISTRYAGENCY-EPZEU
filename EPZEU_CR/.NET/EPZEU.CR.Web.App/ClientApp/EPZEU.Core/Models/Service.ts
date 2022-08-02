import { observable } from 'mobx'
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { moduleContext } from '../ModuleContext'
import { ApplicationType } from '.';



/**Услуга*/
@TypeSystem.typeDecorator('Service', moduleContext.moduleName)
export class Service extends BaseDataModel {

    @observable private _serviceID: number = null;

    /**Идентификатор на услуга.*/
    @TypeSystem.propertyDecorator('number')
    public set serviceID(val: number) {
        this._serviceID = val;
    }

    /**Идентификатор на услуга.*/
    public get serviceID(): number {
        return this._serviceID;
    }

    /**Идентификатор на услуга.*/

    @observable private _registerID: number = null;

    /**Идентификатор на регистър: 1 - Търговски регистър (CR), 2 - Имотен регистър (PR).*/
    @TypeSystem.propertyDecorator('number')
    public set registerID(val: number) {
        this._registerID = val;
    }

    /**Идентификатор на регистър: 1 - Търговски регистър (CR), 2 - Имотен регистър (PR).*/
    public get registerID(): number {
        return this._registerID;
    }

    /**Идентификатор на регистър: 1 - Търговски регистър (CR), 2 - Имотен регистър (PR).*/

    @observable private _iisdaServiceID: number = null;

    /**Номер на услуга от ИИСДА.*/
    @TypeSystem.propertyDecorator('number')
    public set iisdaServiceID(val: number) {
        this._iisdaServiceID = val;
    }

    /**Номер на услуга от ИИСДА.*/
    public get iisdaServiceID(): number {
        return this._iisdaServiceID;
    }

    /**Номер на услуга от ИИСДА.*/

    @observable private _appTypeID: number = null;

    /**Заявление.*/
    @TypeSystem.propertyDecorator('number')
    public set appTypeID(val: number) {
        this._appTypeID = val;
    }

    /**Заявление.*/
    public get appTypeID(): number {
        return this._appTypeID;
    }

    /**Заявление.*/

    @observable private _serviceTypeIDs: number[] = null;

    /**Вид на услуга.*/
    @TypeSystem.propertyArrayDecorator('number')
    public set serviceTypeIDs(val: number[]) {
        this._serviceTypeIDs = val;
    }

    /**Вид на услуга.*/
    public get serviceTypeIDs(): number[] {
        return this._serviceTypeIDs;
    }

    /**Вид на услуга.*/

    @observable private _paymentTypeIDs: number[] = null;

    /**Видове плащане по електронен път*/
    @TypeSystem.propertyArrayDecorator('number')
    public set paymentTypeIDs(val: number[]) {
        this._paymentTypeIDs = val;
    }

    /**Видове плащане по електронен път*/
    public get paymentTypeIDs(): number[] {
        return this._paymentTypeIDs;
    }

    /**Видове плащане по електронен път*/

    @observable private _status: number = null;

    /**Статус: 0- Предоставя се от ЕПЗЕУ; 1 - Прекратено предоставяне от ЕПЗЕУ;*/
    @TypeSystem.propertyDecorator('number')
    public set status(val: number) {
        this._status = val;
    }

    /**Статус: 0- Предоставя се от ЕПЗЕУ; 1 - Прекратено предоставяне от ЕПЗЕУ;*/
    public get status(): number {
        return this._status;
    }

    /**Статус: 0- Предоставя се от ЕПЗЕУ; 1 - Прекратено предоставяне от ЕПЗЕУ;*/

    @observable private _name: string = null;

    /**Наименование на услугата*/
    @TypeSystem.propertyDecorator('string')
    public set name(val: string) {
        this._name = val;
    }

    /**Наименование на услугата*/
    public get name(): string {
        return this._name;
    }

    /**Наименование на услугата*/

    @observable private _description: string = null;

    /**HTML описание на услугата*/
    @TypeSystem.propertyDecorator('string')
    public set description(val: string) {
        this._description = val;
    }

    /**HTML описание на услугата*/
    public get description(): string {
        return this._description;
    }

    /**HTML описание на услугата*/

    @observable private _isAdm: boolean = null;

    /**Флаг, указващ дали услугата е административна или не.*/
    @TypeSystem.propertyDecorator('boolean')
    public set isAdm(val: boolean) {
        this._isAdm = val;
    }

    /**Флаг, указващ дали услугата е административна или не.*/
    public get isAdm(): boolean {
        return this._isAdm;
    }

    /**Флаг, указващ дали услугата е административна или не.*/

    @observable private _shortDescription: string = null;

    /**Кратко описание на услугата*/
    @TypeSystem.propertyDecorator('string')
    public set shortDescription(val: string) {
        this._shortDescription = val;
    }

    /**Кратко описание на услугата*/
    public get shortDescription(): string {
        return this._shortDescription;
    }

    /**Кратко описание на услугата*/

    @observable private _serviceNumber: number = null;

    /**Номер на услуга от ИИСДА.*/
    @TypeSystem.propertyDecorator('number')
    public set serviceNumber(val: number) {
        this._serviceNumber = val;
    }

    /**Номер на услуга от ИИСДА.*/
    public get serviceNumber(): number {
        return this._serviceNumber;
    }

    /**Номер на услуга от ИИСДА.*/

    /**Тип на заявление.*/

    @observable private _applicationType: ApplicationType = null;

    @TypeSystem.propertyDecorator(ApplicationType ? ApplicationType : moduleContext.moduleName + '.' + 'ApplicationType')
    public set applicationType(val: ApplicationType) {
        this._applicationType = val;
    }

    public get applicationType(): ApplicationType {
        return this._applicationType;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}