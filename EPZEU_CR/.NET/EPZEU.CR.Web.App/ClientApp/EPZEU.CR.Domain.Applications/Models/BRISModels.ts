import { observable } from 'mobx'
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { ApplicationFormFieldsBase, Person } from 'EPZEU.CR.Domain'
import { moduleContext } from '../ModuleContext'

@TypeSystem.typeDecorator('BRISMesageDetails', moduleContext.moduleName)
export class BRISMesageDetails extends BaseDataModel {
    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }

    @observable private _countryCode: string = null;

    @TypeSystem.propertyDecorator('string')
    public set countryCode(val: string) {
        this._countryCode = val;
    }

    public get countryCode(): string {
        return this._countryCode;
    }

    @observable private _countryCodeBris: string = null;

    @TypeSystem.propertyDecorator('string')
    public set countryCodeBris(val: string) {
        this._countryCodeBris = val;
    }

    public get countryCodeBris(): string {
        return this._countryCodeBris;
    }

    @observable private _countryName: string = null;

    @TypeSystem.propertyDecorator('string')
    public set countryName(val: string) {
        this._countryName = val;
    }

    public get countryName(): string {
        return this._countryName;
    }

    @observable private _foreignRegisterCode: string = null;

    @TypeSystem.propertyDecorator('string')
    public set foreignRegisterCode(val: string) {
        this._foreignRegisterCode = val;
    }

    public get foreignRegisterCode(): string {
        return this._foreignRegisterCode;
    }

    @observable private _messageTime: string = null;

    @TypeSystem.propertyDecorator('string')
    public set messageTime(val: string) {
        this._messageTime = val;
    }

    public get messageTime(): string {
        return this._messageTime;
    }

    @observable private _messageUrl: string = null;

    @TypeSystem.propertyDecorator('string')
    public set messageUrl(val: string) {
        this._messageUrl = val;
    }

    public get messageUrl(): string {
        return this._messageUrl;
    }
}

@TypeSystem.typeDecorator('BRISCompany', moduleContext.moduleName)
export class BRISCompany extends BaseDataModel {
    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }

    //brisCompanyData

    @observable private _brisCompanyData: Person = null;

    @TypeSystem.propertyDecorator(Person ? Person : moduleContext.moduleName + '.' + 'Person')
    public set brisCompanyData(val: Person) {
        this._brisCompanyData = val;
    }

    public get brisCompanyData(): Person {
        return this._brisCompanyData;
    }
}

@TypeSystem.typeDecorator('BRISCompanies', moduleContext.moduleName)
export class BRISCompanies extends BaseDataModel {
    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }

    @observable private _brisCompanyList: BRISCompany[] = null;

    @TypeSystem.propertyArrayDecorator(BRISCompany ? BRISCompany : moduleContext.moduleName + '.' + 'BRISCompany')
    public set brisCompanyList(val: BRISCompany[]) {
        this._brisCompanyList = val;
    }

    public get brisCompanyList(): BRISCompany[] {
        return this._brisCompanyList;
    }
}

@TypeSystem.typeDecorator('BRISFields', moduleContext.moduleName)
export class BRISFields extends ApplicationFormFieldsBase {

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }

    @observable private _brisMesageDetails: BRISMesageDetails = null;

    @TypeSystem.propertyDecorator(BRISMesageDetails ? BRISMesageDetails : moduleContext.moduleName + '.' + 'BRISMesageDetails')
    public set brisMesageDetails(val: BRISMesageDetails) {
        this._brisMesageDetails = val;
    }

    public get brisMesageDetails(): BRISMesageDetails {
        return this._brisMesageDetails;
    }

    @observable private _brisCompanies: BRISCompanies = null;

    @TypeSystem.propertyDecorator(BRISCompanies ? BRISCompanies : moduleContext.moduleName + '.' + 'BRISCompanies')
    public set brisCompanies(val: BRISCompanies) {
        this._brisCompanies = val;
    }

    public get brisCompanies(): BRISCompanies {
        return this._brisCompanies;
    }
}
