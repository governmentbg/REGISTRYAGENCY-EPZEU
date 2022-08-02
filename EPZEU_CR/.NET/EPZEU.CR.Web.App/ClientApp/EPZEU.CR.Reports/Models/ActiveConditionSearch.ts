import * as moment from 'moment'
import { observable } from 'mobx'
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { moduleContext } from '../ModuleContext'

@TypeSystem.typeDecorator('ActiveConditionSearch', moduleContext.moduleName)
export class ActiveConditionSearch extends BaseDataModel {
    private _reportRequestLimiteToken: string = null;

    @observable private _uic: string = null;
    @observable private _entryDate: moment.Moment = null;
    @observable private _loadFieldsFromAllLegalForms: boolean = false;

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }

    @TypeSystem.propertyDecorator('string')
    public set uic(val: string) {
        this._uic = val;
    }

    public get uic(): string {
        return this._uic;
    }

    @TypeSystem.propertyDecorator('moment')
    public set entryDate(val: moment.Moment) {
        this._entryDate = val;
    }

    public get entryDate(): moment.Moment {
        return this._entryDate;
    }

    @TypeSystem.propertyDecorator('boolean')
    public set loadFieldsFromAllLegalForms(val: boolean) {
        this._loadFieldsFromAllLegalForms = val;
    }

    public get loadFieldsFromAllLegalForms(): boolean {
        return this._loadFieldsFromAllLegalForms;
    }

    public setReportRequestLimiteToken(val: string): void {
        this._reportRequestLimiteToken = val;
    }

    public getReportRequestLimiteToken(): string {
        return this._reportRequestLimiteToken;
    }
}