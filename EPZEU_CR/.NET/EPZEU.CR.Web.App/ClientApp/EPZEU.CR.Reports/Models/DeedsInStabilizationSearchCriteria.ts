import { TypeSystem, BasePagedSearchCriteria } from 'Cnsys.Core';
import { observable } from 'mobx';
import * as moment from 'moment';
import { moduleContext } from '../ModuleContext';

@TypeSystem.typeDecorator('DeedsInStabilizationSearchCriteria', moduleContext.moduleName)
export class DeedsInStabilizationSearchCriteria extends BasePagedSearchCriteria {
    @observable private _fromDate: moment.Moment = null;
    @observable private _toDate: moment.Moment = null;
    @observable private _name: string = null;
    @observable private _uic: string = null;

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }

    @TypeSystem.propertyDecorator('moment')
    public set fromDate(val: moment.Moment) {
        this._fromDate = val;
    }

    public get fromDate(): moment.Moment {
        return this._fromDate;
    }

    @TypeSystem.propertyDecorator('moment')
    public set toDate(val: moment.Moment) {
        this._toDate = val;
    }

    public get toDate(): moment.Moment {
        return this._toDate;
    }

    @TypeSystem.propertyDecorator('string')
    public set name(val: string) {
        this._name = val;
    }

    public get name(): string {
        return this._name;
    }

    @TypeSystem.propertyDecorator('string')
    public set uic(val: string) {
        this._uic = val;
    }

    public get uic(): string {
        return this._uic;
    }
}