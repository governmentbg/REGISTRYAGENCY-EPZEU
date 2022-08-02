import { observable } from 'mobx';
import { TypeSystem, BasePagedSearchCriteria } from 'Cnsys.Core';
import { moduleContext } from '../ModuleContext';
import { InstructionSearchMode } from './Enums';
import * as moment from 'moment';

@TypeSystem.typeDecorator('InstructionSearchCriteria', moduleContext.moduleName)
export class InstructionSearchCriteria extends BasePagedSearchCriteria {
    @observable private _uic: string = null;
    @observable private _incomingNumber: string = null;
    @observable private _isActiveWithoutDeed: boolean = false;
    @observable private _loadIncomingLinkedDeeds: boolean = false;
    @observable private _mode: InstructionSearchMode = InstructionSearchMode.ByIncomingNumber;
    @observable private _fromDate: moment.Moment = null;
    @observable private _toDate: moment.Moment = null;

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

    @TypeSystem.propertyDecorator('string')
    public set incomingNumber(val: string) {
        this._incomingNumber = val;
    }

    public get incomingNumber(): string {
        return this._incomingNumber;
    }

    @TypeSystem.propertyDecorator('boolean')
    public set isActiveWithoutDeed(val: boolean) {
        this._isActiveWithoutDeed = val;
    }

    public get isActiveWithoutDeed(): boolean {
        return this._isActiveWithoutDeed;
    }

    @TypeSystem.propertyDecorator('boolean')
    public set loadIncomingLinkedDeeds(val: boolean) {
        this._loadIncomingLinkedDeeds = val;
    }

    public get loadIncomingLinkedDeeds(): boolean {
        return this._loadIncomingLinkedDeeds;
    }

    @TypeSystem.propertyDecorator(InstructionSearchMode ? InstructionSearchMode : moduleContext.moduleName + '.' + 'InstructionSearchMode')
    public set mode(val: InstructionSearchMode) {
        this._mode = val;
    }

    public get mode(): InstructionSearchMode {
        return this._mode;
    }

    @TypeSystem.propertyDecorator('moment')
    public set applicationDateFrom(val: moment.Moment) {
        this._fromDate = val;
    }

    public get applicationDateFrom(): moment.Moment {
        return this._fromDate;
    }

    @TypeSystem.propertyDecorator('moment')
    public set applicationDateTo(val: moment.Moment) {
        this._toDate = val;
    }

    public get applicationDateTo(): moment.Moment {
        return this._toDate;
    }
}