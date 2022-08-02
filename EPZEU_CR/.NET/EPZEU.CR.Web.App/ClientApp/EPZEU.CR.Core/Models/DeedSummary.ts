import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { observable } from 'mobx';
import * as moment from 'moment';
import { moduleContext } from '../ModuleContext';
import { DeedStatuses, LegalForms, CompanyNameSuffixFlags, ElementHolderAdditionFlags } from './Enums';

@TypeSystem.typeDecorator('DeedSummary', moduleContext.moduleName)
export class DeedSummary extends BaseDataModel {

    @observable private _createdOn: moment.Moment = null;

    @TypeSystem.propertyDecorator('moment')
    public set createdOn(val: moment.Moment) {
        this._createdOn = val;
    }

    public get createdOn(): moment.Moment {
        return this._createdOn;
    }

    @observable private _caseYear: number = null;

    @TypeSystem.propertyDecorator('number')
    public set caseYear(val: number) {
        this._caseYear = val;
    }

    public get caseYear(): number {
        return this._caseYear;
    }


    @observable private _caseNumber: string = null;

    @TypeSystem.propertyDecorator('string')
    public set caseNumber(val: string) {
        this._caseNumber = val;
    }

    public get caseNumber(): string {
        return this._caseNumber;
    }


    @observable private _courtNumber: number = null;

    @TypeSystem.propertyDecorator('number')
    public set courtNumber(val: number) {
        this._courtNumber = val;
    }

    public get courtNumber(): number {
        return this._courtNumber;
    }


    @observable private _hasCompanyCases: boolean = null;

    @TypeSystem.propertyDecorator('boolean')
    public set hasCompanyCases(val: boolean) {
        this._hasCompanyCases = val;
    }

    public get hasCompanyCases(): boolean {
        return this._hasCompanyCases;
    }


    @observable private _status: DeedStatuses = null;

    @TypeSystem.propertyDecorator(DeedStatuses ? DeedStatuses : moduleContext.moduleName + '.' + 'DeedStatuses')
    public set status(val: DeedStatuses) {
        this._status = val;
    }

    public get status(): DeedStatuses {
        return this._status;
    }


    @observable private _legalForm: LegalForms = null;

    @TypeSystem.propertyDecorator(LegalForms ? LegalForms : moduleContext.moduleName + '.' + 'LegalForms')
    public set legalForm(val: LegalForms) {
        this._legalForm = val;
    }

    public get legalForm(): LegalForms {
        return this._legalForm;
    }


    @observable private _companyFullName: string = null;

    @TypeSystem.propertyDecorator('string')
    public set companyFullName(val: string) {
        this._companyFullName = val;
    }

    public get companyFullName(): string {
        return this._companyFullName;
    }


    @observable private _companyName: string = null;

    @TypeSystem.propertyDecorator('string')
    public set companyName(val: string) {
        this._companyName = val;
    }

    public get companyName(): string {
        return this._companyName;
    }


    @observable private _uic: string = null;

    @TypeSystem.propertyDecorator('string')
    public set uic(val: string) {
        this._uic = val;
    }

    public get uic(): string {
        return this._uic;
    }

    @observable private _companyNameSuffixFlag: CompanyNameSuffixFlags = null;

    @TypeSystem.propertyDecorator(CompanyNameSuffixFlags ? CompanyNameSuffixFlags : moduleContext.moduleName + '.' + 'CompanyNameSuffixFlags')
    public set companyNameSuffixFlag(val: CompanyNameSuffixFlags) {
        this._companyNameSuffixFlag = val;
    }

    public get companyNameSuffixFlag(): CompanyNameSuffixFlags {
        return this._companyNameSuffixFlag;
    }


    @observable private _elementHolderAdditionFlag: ElementHolderAdditionFlags = null;

    @TypeSystem.propertyDecorator(ElementHolderAdditionFlags ? ElementHolderAdditionFlags : moduleContext.moduleName + '.' + 'ElementHolderAdditionFlags')
    public set elementHolderAdditionFlag(val: ElementHolderAdditionFlags) {
        this._elementHolderAdditionFlag = val;
    }

    public get elementHolderAdditionFlag(): ElementHolderAdditionFlags {
        return this._elementHolderAdditionFlag;
    }


    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}