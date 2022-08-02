import * as moment from 'moment';
import { observable } from 'mobx';
import { TypeSystem, BaseDataModel } from 'Cnsys.Core';
import { moduleContext } from '../ModuleContext';

@TypeSystem.typeDecorator('Notification', moduleContext.moduleName)
export class Notification extends BaseDataModel {
    @observable private _outgoingNumber: string = null;
    @observable private _uic: string = null;
    @observable private _companyFullName: string = null;
    @observable private _deadLine: moment.Moment = null;
    @observable private _downloadLink: string = null;

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }

    @TypeSystem.propertyDecorator('string')
    public set outgoingNumber(val: string) {
        this._outgoingNumber = val;
    }

    public get outgoingNumber(): string {
        return this._outgoingNumber;
    }

    @TypeSystem.propertyDecorator('string')
    public set uic(val: string) {
        this._uic = val;
    }

    public get uic(): string {
        return this._uic;
    }

    @TypeSystem.propertyDecorator('string')
    public set companyFullName(val: string) {
        this._companyFullName = val;
    }

    public get companyFullName(): string {
        return this._companyFullName;
    }

    @TypeSystem.propertyDecorator('moment')
    public set deadLine(val: moment.Moment) {
        this._deadLine = val;
    }

    public get deadLine(): moment.Moment {
        return this._deadLine;
    }

    @TypeSystem.propertyDecorator('string')
    public set downloadLink(val: string) {
        this._downloadLink = val;
    }

    public get downloadLink(): string {
        return this._downloadLink;
    }
}