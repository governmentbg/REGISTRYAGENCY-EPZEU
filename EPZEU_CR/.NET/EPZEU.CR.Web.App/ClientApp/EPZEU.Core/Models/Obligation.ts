import * as moment from 'moment';
import { observable } from 'mobx'
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { moduleContext } from '../ModuleContext'
import { Registers } from './ApplicationDocumentType';

export enum ObligationStatuses {
    /**Заявено*/
    Requested = 1,

    /**Платено*/
    Paid = 2,

    /**Анулирано*/
    Canceled = 3
}
TypeSystem.registerEnumInfo(ObligationStatuses, 'ObligationStatuses', moduleContext.moduleName)

@TypeSystem.typeDecorator('Obligation', moduleContext.moduleName)
export class Obligation extends BaseDataModel {

    @observable private _obligationNumber: number = null;

    /**Номер на задължение*/
    @TypeSystem.propertyDecorator('number')
    public set obligationNumber(val: number) {
        this._obligationNumber = val;
    }

    public get obligationNumber(): number {
        return this._obligationNumber;
    }


    @observable private _status: ObligationStatuses = null;

    /**Статус*/
    @TypeSystem.propertyDecorator(ObligationStatuses)
    public set status(val: ObligationStatuses) {
        this._status = val;
    }

    public get status(): ObligationStatuses {
        return this._status;
    }


    @observable private _applicationType: string = null;

    /**Вид заявление*/
    @TypeSystem.propertyDecorator('string')
    public set applicationType(val: string) {
        this._applicationType = val;
    }

    public get applicationType(): string {
        return this._applicationType;
    }


    @observable private _applicationNumber: string = null;

    /**Номер на заявление*/
    @TypeSystem.propertyDecorator('string')
    public set applicationNumber(val: string) {
        this._applicationNumber = val;
    }

    public get applicationNumber(): string {
        return this._applicationNumber;
    }


    @observable private _register: Registers = null;

    /**Регистър*/
    @TypeSystem.propertyDecorator(Registers)
    public set register(val: Registers) {
        this._register = val;
    }

    public get register(): Registers {
        return this._register;
    }
       

    @observable private _referenceNumber: string = null;

    /**Референтен номер*/
    @TypeSystem.propertyDecorator('string')
    public set referenceNumber(val: string) {
        this._referenceNumber = val;
    }

    public get referenceNumber(): string {
        return this._referenceNumber;
    }


    @observable private _obligationAmount: number = null;

    /**Задължение - обща сума на регистрираните задължения по услугата*/
    @TypeSystem.propertyDecorator('number')
    public set obligationAmount(val: number) {
        this._obligationAmount = val;
    }

    public get obligationAmount(): number {
        return this._obligationAmount;
    }


    @observable private _paidAmount: number = null;

    /**Платена сума - обща платена сума по задълженията на услугата (всички несторнирани транзакции)*/
    @TypeSystem.propertyDecorator('number')
    public set paidAmount(val: number) {
        this._paidAmount = val;
    }

    public get paidAmount(): number {
        return this._paidAmount;
    }


    @observable private _reversalAmount: number = null;

    /**Отменена сума*/
    @TypeSystem.propertyDecorator('number')
    public set reversalAmount(val: number) {
        this._reversalAmount = val;
    }

    public get reversalAmount(): number {
        return this._reversalAmount;
    }

    @observable private _deadline: moment.Moment = null;

    /**Краен срок за плащане*/
    @TypeSystem.propertyDecorator('moment')
    public set deadline(val: moment.Moment) {
        this._deadline = val;
    }

    public get deadline(): moment.Moment {
        return this._deadline;
    }


    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}