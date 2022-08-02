import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { observable } from 'mobx';
import { moduleContext } from '../ModuleContext';

@TypeSystem.typeDecorator('Language', moduleContext.moduleName)
export class Language extends BaseDataModel {

    @observable private _languageID: number = null;

    @TypeSystem.propertyDecorator('number')
    public set languageID(val: number) {
        this._languageID = val;
    }

    public get languageID(): number {
        return this._languageID;
    }

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

    @observable private _isActive: boolean = null;

    @TypeSystem.propertyDecorator('boolean')
    public set isActive(val: boolean) {
        this._isActive = val;
    }

    public get isActive(): boolean {
        return this._isActive;
    }

    @observable private _isDefault: boolean = null;

    @TypeSystem.propertyDecorator('boolean')
    public set isDefault(val: boolean) {
        this._isDefault = val;
    }

    public get isDefault(): boolean {
        return this._isDefault;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}