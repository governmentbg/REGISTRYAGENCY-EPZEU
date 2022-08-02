import * as moment from 'moment'
import { observable, computed } from 'mobx'
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { ApplicationFormBase, Person, Address, Passport, OutgoingNumber  } from 'EPZEU.CR.Domain'
import { moduleContext } from '../ModuleContext'
import { ActSenderType } from './ModelsAutoGenerated'


@TypeSystem.typeDecorator('AppealRefusalSearchCriteria', moduleContext.moduleName)
export class AppealRefusalSearchCriteria extends BaseDataModel {

    @observable private _incomingNumber: string = null;

    @TypeSystem.propertyDecorator('string')
    public set incomingNumber(val: string) {
        this._incomingNumber = val;
    }

    public get incomingNumber(): string {
        return this._incomingNumber;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('AppealRefusalSearchResults', moduleContext.moduleName)
export class AppealRefusalSearchResults extends BaseDataModel {

    @observable private _appealRefusalSearchResults: AppealRefusalSearchResult[] = null;

    @TypeSystem.propertyArrayDecorator(AppealRefusalSearchResult ? AppealRefusalSearchResult : moduleContext.moduleName + '.' + 'AppealRefusalSearchResult')
    public set appealRefusalSearchResults(val: AppealRefusalSearchResult[]) {
        this._appealRefusalSearchResults = val;
    }

    public get appealRefusalSearchResults(): AppealRefusalSearchResult[] {
        return this._appealRefusalSearchResults;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('AppealRefusalSearchResult', moduleContext.moduleName)
export class AppealRefusalSearchResult extends BaseDataModel {

    @observable private _incomingNumber: string = null;

    @TypeSystem.propertyDecorator('string')
    public set incomingNumber(val: string) {
        this._incomingNumber = val;
    }

    public get incomingNumber(): string {
        return this._incomingNumber;
    }

    @observable private _outgoingNumber: string = null;

    @TypeSystem.propertyDecorator('string')
    public set outgoingNumber(val: string) {
        this._outgoingNumber = val;
    }

    public get outgoingNumber(): string {
        return this._outgoingNumber;
    }

    @observable private _indent: string = null;

    @TypeSystem.propertyDecorator('string')
    public set indent(val: string) {
        this._indent = val;
    }

    public get indent(): string {
        return this._indent;
    }


    @observable private _name: string = null;

    @TypeSystem.propertyDecorator('string')
    public set name(val: string) {
        this._name = val;
    }

    public get name(): string {
        return this._name;
    }

    @observable private _isSelected: boolean = null;

    @TypeSystem.propertyDecorator('boolean')
    public set isSelected(val: boolean) {
        this._isSelected = val;
    }

    public get isSelected(): boolean {
        return this._isSelected;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('AppealRefusalSearch', moduleContext.moduleName)
export class AppealRefusalSearch extends BaseDataModel {

    @observable private _searchCriteria: AppealRefusalSearchCriteria = null;

    @TypeSystem.propertyDecorator(AppealRefusalSearchCriteria ? AppealRefusalSearchCriteria : moduleContext.moduleName + '.' + 'AppealRefusalSearchCriteria')
    public set searchCriteria(val: AppealRefusalSearchCriteria) {
        this._searchCriteria = val;
    }

    public get searchCriteria(): AppealRefusalSearchCriteria {
        return this._searchCriteria;
    }

    @observable private _appealRefusalSearchResults: AppealRefusalSearchResults = null;

    @TypeSystem.propertyDecorator(AppealRefusalSearchResults ? AppealRefusalSearchResults : moduleContext.moduleName + '.' + 'AppealRefusalSearchResults')
    public set appealRefusalSearchResults(val: AppealRefusalSearchResults) {
        this._appealRefusalSearchResults = val;
    }

    public get appealRefusalSearchResults(): AppealRefusalSearchResults {
        return this._appealRefusalSearchResults;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}