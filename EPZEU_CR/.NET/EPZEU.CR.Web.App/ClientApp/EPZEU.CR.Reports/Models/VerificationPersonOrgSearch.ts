import { observable } from 'mobx';
import { TypeSystem, BasePagedSearchCriteria } from 'Cnsys.Core';
import { moduleContext } from '../ModuleContext';
import { VerificationPersonOrgResultFilters } from './Enums';

@TypeSystem.typeDecorator('VerificationPersonOrgSearch', moduleContext.moduleName)
export class VerificationPersonOrgSearch extends BasePagedSearchCriteria {
    @observable private _name: string = null;
    @observable private _ident: string = null;
    @observable private _selectedSearchFilter: VerificationPersonOrgResultFilters = VerificationPersonOrgResultFilters.PhysicalForm;
    @observable private _includeHistory: boolean = false;

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }

    @TypeSystem.propertyDecorator('string')
    public set name(val: string) {
        this._name = val;
    }

    public get name(): string {
        return this._name;
    }

    @TypeSystem.propertyDecorator('string')
    public set ident(val: string) {
        this._ident = val;
    }

    public get ident(): string {
        return this._ident;
    }

    @TypeSystem.propertyDecorator(VerificationPersonOrgResultFilters ? VerificationPersonOrgResultFilters : moduleContext.moduleName + '.' + 'VerificationPersonOrgResultFilters')
    public set selectedSearchFilter(val: VerificationPersonOrgResultFilters) {
        this._selectedSearchFilter = val;
    }

    public get selectedSearchFilter(): VerificationPersonOrgResultFilters {
        return this._selectedSearchFilter;
    }

    @TypeSystem.propertyDecorator('boolean')
    public set includeHistory(val: boolean) {
        this._includeHistory = val;
    }

    public get includeHistory(): boolean {
        return this._includeHistory;
    }
}