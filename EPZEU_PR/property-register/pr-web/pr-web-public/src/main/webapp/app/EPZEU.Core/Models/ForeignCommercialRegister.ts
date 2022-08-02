import { observable } from 'mobx'
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { moduleContext } from '../ModuleContext'

@TypeSystem.typeDecorator('ForeignCommercialRegister', moduleContext.moduleName)
export class ForeignCommercialRegister extends BaseDataModel {

    @observable private _code: string = null;

    @TypeSystem.propertyDecorator('string')
    public set code(val: string) {
        this._code = val;
    }

    public get code(): string {
        return this._code;
    }

    @observable private _nameOriginal: string = null;

    @TypeSystem.propertyDecorator('string')
    public set nameOriginal(val: string) {
        this._nameOriginal = val;
    }

    public get nameOriginal(): string {
        return this._nameOriginal;
    }

    @observable private _nameEN: string = null;

    @TypeSystem.propertyDecorator('string')
    public set nameEN(val: string) {
        this._nameEN = val;
    }

    public get nameEN(): string {
        return this._nameEN;
    }

    @observable private _countryCode: string = null;

    @TypeSystem.propertyDecorator('string')
    public set countryCode(val: string) {
        this._countryCode = val;
    }

    public get countryCode(): string {
        return this._countryCode;
    }

    @observable private _isOther: boolean = null;

    @TypeSystem.propertyDecorator('boolean')
    public set isOther(val: boolean) {
        this._isOther = val;
    }

    public get isOther(): boolean {
        return this._isOther;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}