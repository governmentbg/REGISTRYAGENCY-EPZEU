import { observable } from 'mobx';
import { TypeSystem, BasePagedSearchCriteria } from 'Cnsys.Core';
import { moduleContext } from '../ModuleContext';
import { StatementsByDateResultFilter } from './Enums';
import * as moment from 'moment';

@TypeSystem.typeDecorator('StatementsByDateSearch', moduleContext.moduleName)
export class StatementsByDateSearch extends BasePagedSearchCriteria {
    @observable private _fieldIdentsCollection: string[] = null;

    @observable private _fieldIdents: string = null;

    @observable private _actName: string = null;

    @observable private _year: number = null;

    @observable private _fromActionDate: moment.Moment = null;

    @observable private _toActionDate: moment.Moment = null;

    @observable private _mode: StatementsByDateResultFilter = StatementsByDateResultFilter.CurrentUpcomingDate;

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }

    @TypeSystem.propertyArrayDecorator('string')
    public set fieldIdentsCollection(val: string[]) {
        this._fieldIdentsCollection = val;
    }

    public get fieldIdentsCollection(): string[] {
        return this._fieldIdentsCollection;
    }

    @TypeSystem.propertyDecorator('string')
    public set fieldIdents(val: string) {
        this._fieldIdents = val;
    }

    public get fieldIdents(): string {
        return this._fieldIdents;
    }

    @TypeSystem.propertyDecorator('string')
    public set actName(val: string) {
        this._actName = val;
    }

    public get actName(): string {
        return this._actName;
    }

    @TypeSystem.propertyDecorator('number')
    public set year(val: number) {
        this._year = val;
    }

    public get year(): number {
        return this._year;
    }

    @TypeSystem.propertyDecorator('moment')
    public set fromActionDate(val: moment.Moment) {
        if (moment.isMoment(val))
            this._fromActionDate = val.startOf('day');
        else
            this._fromActionDate = val
    }

    public get fromActionDate(): moment.Moment {
        return this._fromActionDate;
    }

    @TypeSystem.propertyDecorator('moment')
    public set toActionDate(val: moment.Moment) {
        if (moment.isMoment(val))
            this._toActionDate = val.endOf('day');
        else
            this._toActionDate = val;
    }

    public get toActionDate(): moment.Moment {
        return this._toActionDate;
    }

    @TypeSystem.propertyDecorator(StatementsByDateResultFilter ? StatementsByDateResultFilter : moduleContext.moduleName + '.' + 'StatementsByDateResultFilter')
    public set mode(val: StatementsByDateResultFilter) {
        this._mode = val;
    }

    public get mode(): StatementsByDateResultFilter {
        return this._mode;
    }
}