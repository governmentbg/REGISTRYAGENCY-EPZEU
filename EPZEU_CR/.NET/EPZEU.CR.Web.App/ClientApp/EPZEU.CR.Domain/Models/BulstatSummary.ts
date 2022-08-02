import { observable } from 'mobx'
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { moduleContext } from '../ModuleContext'

//TODO:Да се добавят всички полета за BulstatSummary
@TypeSystem.typeDecorator('BulstatSummary', moduleContext.moduleName)
export class BulstatSummary extends BaseDataModel {

    @observable private _uic: string = null;

    @TypeSystem.propertyDecorator('string')
    public set uic(val: string) {
        this._uic = val;
    }

    public get uic(): string {
        return this._uic;
    }

    @observable private _companyName: string = null;

    @TypeSystem.propertyDecorator('string')
    public set companyName(val: string) {
        this._companyName = val;
    }

    public get companyName(): string {
        return this._companyName;
    }

    @observable private _courtCode: string = null;

    @TypeSystem.propertyDecorator('string')
    public set courtCode(val: string) {
        this._courtCode = val;
    }

    public get courtCode(): string {
        return this._courtCode;
    }

    @observable private _caseNumber: number = null;

    @TypeSystem.propertyDecorator('number')
    public set caseNumber(val: number) {
        this._caseNumber = val;
    }

    public get caseNumber(): number {
        return this._caseNumber;
    }

    @observable private _caseYear: number = null;

    @TypeSystem.propertyDecorator('number')
    public set caseYear(val: number) {
        this._caseYear = val;
    }

    public get caseYear(): number {
        return this._caseYear;
    }

    @observable private _legalForm: string = null;

    @TypeSystem.propertyDecorator('string')
    public set legalForm(val: string) {
        this._legalForm = val;
    }

    public get legalForm(): string {
        return this._legalForm;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}