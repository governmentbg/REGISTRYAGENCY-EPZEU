import { BasePagedSearchCriteria, TypeSystem } from 'Cnsys.Core';
import { observable } from 'mobx';
import * as moment from 'moment';
import { moduleContext } from '../ModuleContext';
import { UnassignedAssignmentSearchCriteriaFilter, ApplicationFormTypes } from './Enums';

@TypeSystem.typeDecorator('UnassignedAssignmentSearchCriteria', moduleContext.moduleName)
export class UnassignedAssignmentSearchCriteria extends BasePagedSearchCriteria {
    @observable private _incomingNumber: string = null;
    @observable private _fromDate: moment.Moment = null;
    @observable private _toDate: moment.Moment = null;
    @observable private _applicationFormType: ApplicationFormTypes = undefined;
    @observable private _searchFilter: UnassignedAssignmentSearchCriteriaFilter = UnassignedAssignmentSearchCriteriaFilter.ByIncomingNumber;

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }

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
    public set toDate(val: moment.Moment) {
        this._toDate = val;
    }

    public get toDate(): moment.Moment {
        return this._toDate;
    }

    @TypeSystem.propertyDecorator(ApplicationFormTypes ? ApplicationFormTypes : moduleContext.moduleName + '.' + 'ApplicationFormTypes')
    public set applicationFormType(val: ApplicationFormTypes) {
        this._applicationFormType = val;
    }

    public get applicationFormType(): ApplicationFormTypes {
        return this._applicationFormType;
    }

    @TypeSystem.propertyDecorator(UnassignedAssignmentSearchCriteriaFilter ? UnassignedAssignmentSearchCriteriaFilter : moduleContext.moduleName + '.' + 'UnassignedAssignmentSearchCriteriaFilter')
    public set searchFilter(val: UnassignedAssignmentSearchCriteriaFilter) {
        this._searchFilter = val;
    }

    public get searchFilter(): UnassignedAssignmentSearchCriteriaFilter {
        return this._searchFilter;
    }
}