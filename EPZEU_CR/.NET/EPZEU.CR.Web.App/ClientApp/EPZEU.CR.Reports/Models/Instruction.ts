import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { observable } from 'mobx';
import * as moment from 'moment';
import { moduleContext } from '../ModuleContext';

@TypeSystem.typeDecorator('Instruction', moduleContext.moduleName)
export class Instruction extends BaseDataModel {

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }

    @observable private _incomingNumber: string = null;

    @observable private _fromDate: moment.Moment = null;

    @observable private _endDate: moment.Moment = null;

    @observable private _link: string = null;

    @observable private _deedSummary: string[] = null;

    @TypeSystem.propertyDecorator('string')
    public set incomingNumber(val: string) {
        this._incomingNumber = val;
    }

    public get incomingNumber(): string {
        return this._incomingNumber;
    }

    @TypeSystem.propertyDecorator('moment')
    public set fromDate(val: moment.Moment) {
        this._fromDate = val;
    }

    public get fromDate(): moment.Moment {
        return this._fromDate;
    }

    @TypeSystem.propertyDecorator('moment')
    public set endDate(val: moment.Moment) {
        this._endDate = val;
    }

    public get endDate(): moment.Moment {
        return this._endDate;
    }

    @TypeSystem.propertyDecorator('string')
    public set link(val: string) {
        this._link = val;
    }

    public get link(): string {
        return this._link;
    }

    @TypeSystem.propertyArrayDecorator('string')
    public set deedSummary(val: string[]) {
        this._deedSummary = val;
    }

    public get deedSummary(): string[] {
        return this._deedSummary;
    }
}