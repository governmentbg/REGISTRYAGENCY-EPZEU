import * as moment from 'moment';
import { observable } from 'mobx';
import { TypeSystem, BasePagedSearchCriteria } from 'Cnsys.Core';
import { moduleContext } from '../ModuleContext';
import { MasterAssignmentSearchCriteriaFilter, MasterAssignmentSearchSearchMode } from './Enums';

@TypeSystem.typeDecorator('MasterAssignmentSearchCriteria', moduleContext.moduleName)
export class MasterAssignmentSearchCriteria extends BasePagedSearchCriteria {
    @observable private _uic: string = null;
    @observable private _incomingNumber: string = null;
    @observable private _companyName: string = null;
    @observable private _fromDate: moment.Moment = null;
    @observable private _toDate: moment.Moment = null;
    @observable private _outgoingIncomingNumber: string = null;
    @observable private _outgoingSeqNumber: string = null;
    @observable private _outgoingNumberDate: moment.Moment = null;
    @observable private _includeAll: boolean = undefined;
    @observable private _getOnlyAssWithoutDeed: boolean = undefined;
    @observable private _searchFilter: MasterAssignmentSearchCriteriaFilter = MasterAssignmentSearchCriteriaFilter.ByIncomingNumber;
    @observable private _mode: MasterAssignmentSearchSearchMode = MasterAssignmentSearchSearchMode.ByIncomingNumber;

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

    @TypeSystem.propertyDecorator('string')
    public set companyName(val: string) {
        this._companyName = val;
    }

    public get companyName(): string {
        return this._companyName;
    }

    @TypeSystem.propertyDecorator('string')
    public set outgoingIncomingNumber(val: string) {
        this._outgoingIncomingNumber = val;
    }

    public get outgoingIncomingNumber(): string {
        return this._outgoingIncomingNumber;
    }

    @TypeSystem.propertyDecorator('string')
    public set outgoingSeqNumber(val: string) {
        this._outgoingSeqNumber = val;
    }

    public get outgoingSeqNumber(): string {
        return this._outgoingSeqNumber;
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

    @TypeSystem.propertyDecorator('moment')
    public set outgoingNumberDate(val: moment.Moment) {
        this._outgoingNumberDate = val;
    }

    public get outgoingNumberDate(): moment.Moment {
        return this._outgoingNumberDate;
    }

    @TypeSystem.propertyDecorator('boolean')
    public set includeAll(val: boolean) {
        this._includeAll = val;
    }

    public get includeAll(): boolean {
        return this._includeAll;
    }

    @TypeSystem.propertyDecorator('boolean')
    public set getOnlyAssWithoutDeed(val: boolean) {
        this._getOnlyAssWithoutDeed = val;
    }

    public get getOnlyAssWithoutDeed(): boolean {
        return this._getOnlyAssWithoutDeed;
    }

    @TypeSystem.propertyDecorator(MasterAssignmentSearchCriteriaFilter ? MasterAssignmentSearchCriteriaFilter : moduleContext.moduleName + '.' + 'MasterAssignmentSearchCriteriaFilter')
    public set searchFilter(val: MasterAssignmentSearchCriteriaFilter) {
        this._searchFilter = val;
    }

    public get searchFilter(): MasterAssignmentSearchCriteriaFilter {
        return this._searchFilter;
    }

    @TypeSystem.propertyDecorator(MasterAssignmentSearchSearchMode ? MasterAssignmentSearchSearchMode : moduleContext.moduleName + '.' + 'MasterAssignmentSearchSearchMode')
    public set mode(val: MasterAssignmentSearchSearchMode) {
        this._mode = val;
    }

    public get mode(): MasterAssignmentSearchSearchMode {
        return this._mode;
    }
}