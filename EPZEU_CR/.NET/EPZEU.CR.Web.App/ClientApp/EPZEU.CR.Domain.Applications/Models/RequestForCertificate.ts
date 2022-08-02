import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { observable } from 'mobx';
import * as moment from 'moment';
import { moduleContext } from '../ModuleContext';

@TypeSystem.typeDecorator('RequestForCertificate', moduleContext.moduleName)
export class RequestForCertificate extends BaseDataModel {

    @observable private _nameOfType: string = null;

    @TypeSystem.propertyDecorator('string')
    public set nameOfType(val: string) {
        this._nameOfType = val;
    }

    public get nameOfType(): string {
        return this._nameOfType;
    }

    @observable private _uicNumber: string = null;

    @TypeSystem.propertyDecorator('string')
    public set uicNumber(val: string) {
        this._uicNumber = val;
    }

    public get uicNumber(): string {
        return this._uicNumber;
    }

    @observable private _firmName: string = null;

    @TypeSystem.propertyDecorator('string')
    public set firmName(val: string) {
        this._firmName = val;
    }

    public get firmName(): string {
        return this._firmName;
    }

    @observable private _email: string = null;

    @TypeSystem.propertyDecorator('string')
    public set email(val: string) {
        this._email = val;
    }

    public get email(): string {
        return this._email;
    }

    @observable private _fieldIdents: string[] = null;

    @TypeSystem.propertyArrayDecorator('string')
    public set fieldIdents(val: string[]) {
        this._fieldIdents = val;
    }

    public get fieldIdents(): string[] {
        return this._fieldIdents;
    }

    @observable private _draftFieldIdents: string[] = null;

    @TypeSystem.propertyArrayDecorator('string')
    public set draftFieldIdents(val: string[]) {
        this._draftFieldIdents = val;
    }

    public get draftFieldIdents(): string[] {
        return this._draftFieldIdents;
    }

    @observable private _dateFrom: moment.Moment = null;

    @TypeSystem.propertyDecorator('moment')
    public set dateFrom(val: moment.Moment) {

        if (moment.isMoment(val))
            this._dateFrom = val.startOf('day');
        else
            this._dateFrom = val
    }

    public get dateFrom(): moment.Moment {
        return this._dateFrom;
    }

    @observable private _dateTo: moment.Moment = null;

    @TypeSystem.propertyDecorator('moment')
    public set dateTo(val: moment.Moment) {
        if (moment.isMoment(val))
            this._dateTo = val.endOf('day');
        else
            this._dateTo = val
    }

    public get dateTo(): moment.Moment {
        return this._dateTo;
    }

    @observable private _includeHistory: boolean = null;

    @TypeSystem.propertyDecorator('boolean')
    public set includeHistory(val: boolean) {
        this._includeHistory = val;
    }

    public get includeHistory(): boolean {
        return this._includeHistory;
    }

    @observable private _legalFormFull: string = null;

    @TypeSystem.propertyDecorator('string')
    public set legalFormFull(val: string) {
        this._legalFormFull = val;
    }

    public get legalFormFull(): string {
        return this._legalFormFull;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}