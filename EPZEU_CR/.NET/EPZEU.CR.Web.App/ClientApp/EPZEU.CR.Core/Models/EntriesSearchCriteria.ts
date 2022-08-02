import * as moment from 'moment';
import { observable } from 'mobx';
import { TypeSystem, BasePagedSearchCriteria } from 'Cnsys.Core';
import { moduleContext } from '../ModuleContext';
import { BankruptcyEntriesTypes } from '../'

@TypeSystem.typeDecorator('EntriesSearchCriteria', moduleContext.moduleName)
export class EntriesSearchCriteria extends BasePagedSearchCriteria {

    @observable private _dateFrom: moment.Moment = null;
    @observable private _dateTo: moment.Moment = null;

    @TypeSystem.propertyDecorator('moment')
    public set dateFrom(val: moment.Moment) {
        this._dateFrom = val;
    }

    public get dateFrom(): moment.Moment {
        return this._dateFrom;
    }

    @TypeSystem.propertyDecorator('moment')
    public set dateTo(val: moment.Moment) {
        this._dateTo = val;
    }

    public get dateTo(): moment.Moment {
        return this._dateTo;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}


@TypeSystem.typeDecorator('LiquidationSearchCriteria', moduleContext.moduleName)
export class LiquidationSearchCriteria extends EntriesSearchCriteria {

   
    @observable private _companyFullName: string = null;
    @observable private _uic: string = null;

    @TypeSystem.propertyDecorator('string')
    public set companyName(val: string) {
        this._companyFullName = val;
    }

    public get companyName(): string {
        return this._companyFullName;
    }

    @TypeSystem.propertyDecorator('string')
    public set uic(val: string) {
        this._uic = val;
    }

    public get uic(): string {
        return this._uic;
    }



    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}


@TypeSystem.typeDecorator('BankruptcySearchCriteria', moduleContext.moduleName)
export class BankruptcySearchCriteria extends EntriesSearchCriteria {

    @observable private _bankruptcyEntryType: BankruptcyEntriesTypes = null;
    @observable private _companyFullName: string = null;
    @observable private _uic: string = null;

    @TypeSystem.propertyDecorator('string')
    public set companyName(val: string) {
        this._companyFullName = val;
    }

    public get companyName(): string {
        return this._companyFullName;
    }

    @TypeSystem.propertyDecorator('string')
    public set uic(val: string) {
        this._uic = val;
    }

    public get uic(): string {
        return this._uic;
    }

    @TypeSystem.propertyDecorator(BankruptcyEntriesTypes ? BankruptcyEntriesTypes : moduleContext.moduleName + '.' + 'BankruptcyEntriesTypes')
    public set bankruptcyEntryType(val: BankruptcyEntriesTypes) {
        this._bankruptcyEntryType = val;
    }

    public get bankruptcyEntryType(): BankruptcyEntriesTypes {
        return this._bankruptcyEntryType;
    }



    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}