import { TypeSystem, BasePagedSearchCriteria } from 'Cnsys.Core';
import { observable } from 'mobx';
import * as moment from 'moment';
import { moduleContext } from '../ModuleContext';
import { SortColumnsWithOrder } from './Enums';

@TypeSystem.typeDecorator('PreservedCompaniesSearch', moduleContext.moduleName)
export class PreservedCompaniesSearch extends BasePagedSearchCriteria {
    @observable private _fromDate: moment.Moment = null;
    @observable private _toDate: moment.Moment = null;
    @observable private _companyFirstLatter: string = null;
    @observable private _sortColumnOrder: SortColumnsWithOrder = SortColumnsWithOrder.CompanyNameASC;

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
    public set companyFirstLatter(val: string) {
        this._companyFirstLatter = val;
    }

    public get companyFirstLatter(): string {
        return this._companyFirstLatter;
    }

    @TypeSystem.propertyDecorator(SortColumnsWithOrder ? SortColumnsWithOrder : moduleContext.moduleName + '.' + 'SortColumnsWithOrder')
    public set sortColumnOrder(val: SortColumnsWithOrder) {
        this._sortColumnOrder = val;
    }

    public get sortColumnOrder(): SortColumnsWithOrder {
        return this._sortColumnOrder;
    }
}