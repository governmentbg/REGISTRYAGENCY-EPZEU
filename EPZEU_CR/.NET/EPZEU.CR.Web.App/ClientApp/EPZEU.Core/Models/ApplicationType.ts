import { observable } from 'mobx'
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { moduleContext } from '../ModuleContext'

@TypeSystem.typeDecorator('ApplicationType', moduleContext.moduleName)
export class ApplicationType extends BaseDataModel {

    @observable private _applicationTypeID: number = null;

    @TypeSystem.propertyDecorator('number')
    public set applicationTypeID(val: number) {
        this._applicationTypeID = val;
    }

    public get applicationTypeID(): number {
        return this._applicationTypeID;
    }

    @observable private _appType: string = null;

    @TypeSystem.propertyDecorator('string')
    public set appType(val: string) {
        this._appType = val;
    }

    public get appType(): string {
        return this._appType;
    }

    @observable private _name: string = null;

    @TypeSystem.propertyDecorator('string')
    public set name(val: string) {
        this._name = val;
    }

    public get name(): string {
        return this._name;
    }

    @observable private _register_id?: number = null;

    @TypeSystem.propertyDecorator('number')
    public set registerID(val: number) {
        this._register_id = val;
    }

    public get registerID(): number {
        return this._register_id;
    }

    @observable private _appCode: string = null;

    @TypeSystem.propertyDecorator('string')
    public set appCode(val: string) {
        this._appCode = val;
    }

    public get appCode(): string {
        return this._appCode;
    }

    @observable private _url: string = null;

    @TypeSystem.propertyDecorator('string')
    public set url(val: string) {
        this._url = val;
    }

    public get url(): string {
        return this._url;
    }
   
    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}