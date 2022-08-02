import { observable } from 'mobx'
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { moduleContext } from '../ModuleContext'

@TypeSystem.typeDecorator('ForeignLegalForm', moduleContext.moduleName)
export class ForeignLegalForm extends BaseDataModel {

    @observable private _code: string = null;

    @TypeSystem.propertyDecorator('string')
    public set code(val: string) {
        this._code = val;
    }

    public get code(): string {
        return this._code;
    }

    @observable private _name: string = null;

    @TypeSystem.propertyDecorator('string')
    public set name(val: string) {
        this._name = val;
    }

    public get name(): string {
        return this._name;
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

    @observable private _isActive: boolean = null;

    @TypeSystem.propertyDecorator('boolean')
    public set isActive(val: boolean) {
        this._isActive = val;
    }

    public get isActive(): boolean {
        return this._isActive;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}