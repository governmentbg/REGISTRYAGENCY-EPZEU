import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { observable } from 'mobx';
import { moduleContext } from '../ModuleContext';
import { ApplicationFormTypes } from './Enums'

@TypeSystem.typeDecorator('TransformationSummary', moduleContext.moduleName)
export class TransformationSummary extends BaseDataModel {

    @observable private _transformingCompanies: TransformingCompanySummary[] = null;

    @TypeSystem.propertyArrayDecorator(TransformingCompanySummary ? TransformingCompanySummary : moduleContext.moduleName + '.' + 'TransformingCompanySummary')
    public set transformingCompanies(val: TransformingCompanySummary[]) {
        this._transformingCompanies = val;
    }

    public get transformingCompanies(): TransformingCompanySummary[] {
        return this._transformingCompanies;
    }

    @observable private _successors: SuccessorCompanySummary[] = null;

    @TypeSystem.propertyArrayDecorator(SuccessorCompanySummary ? SuccessorCompanySummary : moduleContext.moduleName + '.' + 'SuccessorCompanySummary')
    public set successors(val: SuccessorCompanySummary[]) {
        this._successors = val;
    }

    public get successors(): SuccessorCompanySummary[] {
        return this._successors;
    }

    @observable private _mainApplicationFormType: ApplicationFormTypes = null;

    @TypeSystem.propertyDecorator(ApplicationFormTypes)
    public set mainApplicationFormType(val: ApplicationFormTypes) {
        this._mainApplicationFormType = val;
    }

    public get mainApplicationFormType(): ApplicationFormTypes {
        return this._mainApplicationFormType;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('TransformingCompanySummary', moduleContext.moduleName)
export class TransformingCompanySummary extends BaseDataModel {

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

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}

@TypeSystem.typeDecorator('SuccessorCompanySummary', moduleContext.moduleName)
export class SuccessorCompanySummary extends BaseDataModel {

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

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}