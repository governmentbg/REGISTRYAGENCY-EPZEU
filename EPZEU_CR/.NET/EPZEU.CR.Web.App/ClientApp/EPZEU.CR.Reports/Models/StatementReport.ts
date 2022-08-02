import { observable } from 'mobx';
import { TypeSystem, BaseDataModel } from 'Cnsys.Core';
import { moduleContext } from '../ModuleContext';
import * as moment from 'moment';
import { DeedSummary } from 'EPZEU.CR.Core';

@TypeSystem.typeDecorator('StatementReport', moduleContext.moduleName)
export class StatementReport extends BaseDataModel {

    @observable private _entryDate: moment.Moment = null;

    @TypeSystem.propertyDecorator('moment')
    public set entryDate(val: moment.Moment) {
        this._entryDate = val;
    }

    public get entryDate(): moment.Moment {
        return this._entryDate;
    }

    @observable private _actionDate: moment.Moment = null;

    @TypeSystem.propertyDecorator('moment')
    public set actionDate(val: moment.Moment) {
        this._actionDate = val;
    }

    public get actionDate(): moment.Moment {
        return this._actionDate;
    }

    @observable private _fieldIdent: string = null;

    @TypeSystem.propertyDecorator('string')
    public set fieldIdent(val: string) {
        this._fieldIdent = val;
    }

    public get fieldIdent(): string {
        return this._fieldIdent;
    }

    @observable private _actModeName: string = null;

    @TypeSystem.propertyDecorator('string')
    public set actModeName(val: string) {
        this._actModeName = val;
    }

    public get actModeName(): string {
        return this._actModeName;
    }

    @observable private _actDocumentGuid: string = null;

    @TypeSystem.propertyDecorator('string')
    public set actDocumentGuid(val: string) {
        this._actDocumentGuid = val;
    }

    public get actDocumentGuid(): string {
        return this._actDocumentGuid;
    }

    @observable private _actDate: moment.Moment = null;

    @TypeSystem.propertyDecorator('moment')
    public set actDate(val: moment.Moment) {
        this._actDate = val;
    }

    public get actDate(): moment.Moment {
        return this._actDate;
    }

    @observable private _actYear: number = null;

    @TypeSystem.propertyDecorator('number')
    public set actYear(val: number) {
        this._actYear = val;
    }

    public get actYear(): number {
        return this._actYear;
    }

    @observable private _description: string = null;

    @TypeSystem.propertyDecorator('string')
    public set description(val: string) {
        this._description = val;
    }

    public get description(): string {
        return this._description;
    }

    @observable private _deeds: DeedSummary = null;

    @TypeSystem.propertyDecorator(DeedSummary ? DeedSummary : moduleContext.moduleName + '.' + 'DeedSummary')
    public set deeds(val: DeedSummary) {
        this._deeds = val;
    }

    public get deeds(): DeedSummary {
        return this._deeds;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}