import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { observable } from 'mobx';
import { moduleContext } from '../ModuleContext';

@TypeSystem.typeDecorator('RequestForCertificateSearch', moduleContext.moduleName)
export class RequestForCertificateSearch extends BaseDataModel {

    @observable private _uic: string = null;

    @TypeSystem.propertyDecorator('string')
    public set uic(val: string) {
        this._uic = val;
    }

    public get uic(): string {
        return this._uic;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('RequestForCertificateSearchResult', moduleContext.moduleName)
export class RequestForCertificateSearchResult extends BaseDataModel {

    @observable private _uic: string = null;

    @TypeSystem.propertyDecorator('string')
    public set uic(val: string) {
        this._uic = val;
    }

    public get uic(): string {
        return this._uic;
    }

    @observable private _legalFormFull: string = null;

    @TypeSystem.propertyDecorator('string')
    public set legalFormFull(val: string) {
        this._legalFormFull = val;
    }

    public get legalFormFull(): string {
        return this._legalFormFull;
    }

    @observable private _name: string = null;

    @TypeSystem.propertyDecorator('string')
    public set name(val: string) {
        this._name = val;
    }

    public get name(): string {
        return this._name;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('RequestForCertificateStart', moduleContext.moduleName)
export class RequestForCertificateStart extends BaseDataModel {

    @observable private _searchCriteria: RequestForCertificateSearch = null;

    @TypeSystem.propertyDecorator(RequestForCertificateSearch ? RequestForCertificateSearch : moduleContext.moduleName + '.' + 'RequestForCertificateSearch')
    public set searchCriteria(val: RequestForCertificateSearch) {
        this._searchCriteria = val;
    }

    public get searchCriteria(): RequestForCertificateSearch {
        return this._searchCriteria;
    }

    @observable private _requestForCertificateSearchResult: RequestForCertificateSearchResult = null;

    @TypeSystem.propertyDecorator(RequestForCertificateSearchResult ? RequestForCertificateSearchResult : moduleContext.moduleName + '.' + 'RequestForCertificateSearchResult')
    public set requestForCertificateSearchResult(val: RequestForCertificateSearchResult) {
        this._requestForCertificateSearchResult = val;
    }

    public get requestForCertificateSearchResult(): RequestForCertificateSearchResult {
        return this._requestForCertificateSearchResult;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}