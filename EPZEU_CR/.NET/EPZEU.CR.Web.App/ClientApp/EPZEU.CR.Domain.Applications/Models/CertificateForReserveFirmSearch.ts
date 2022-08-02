import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { observable } from 'mobx';
import { moduleContext } from '../ModuleContext';
import { ReservedCompany } from 'EPZEU.CR.Core';

@TypeSystem.typeDecorator('CertificateForReserveFirmSearch', moduleContext.moduleName)
export class CertificateForReserveFirmSearch extends BaseDataModel {

    @observable private _companyName: string = null;

    @TypeSystem.propertyDecorator('string')
    public set companyName(val: string) {
        this._companyName = val;
    }

    public get companyName(): string {
        return this._companyName;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('CertificateForReserveFirmStart', moduleContext.moduleName)
export class CertificateForReserveFirmStart extends BaseDataModel {

    @observable private _searchCriteria: CertificateForReserveFirmSearch = null;

    @TypeSystem.propertyDecorator(CertificateForReserveFirmSearch ? CertificateForReserveFirmSearch : moduleContext.moduleName + '.' + 'CertificateForReserveFirmSearch')
    public set searchCriteria(val: CertificateForReserveFirmSearch) {
        this._searchCriteria = val;
    }

    public get searchCriteria(): CertificateForReserveFirmSearch {
        return this._searchCriteria;
    }

    @observable private _result: ReservedCompany = null;

    @TypeSystem.propertyDecorator(ReservedCompany ? ReservedCompany : moduleContext.moduleName + '.' + 'ReservedCompany')
    public set result(val: ReservedCompany) {
        this._result = val;
    }

    public get result(): ReservedCompany {
        return this._result;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}