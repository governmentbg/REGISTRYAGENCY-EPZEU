import { observable } from 'mobx'
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { moduleContext } from '../ModuleContext'

@TypeSystem.typeDecorator('NKID', moduleContext.moduleName)
export class NKID extends BaseDataModel {

    @observable private _id: number = 0;
    @observable private _code: string = null;
    @observable private _text: string = null;
    @observable private _parentID: number = 0;

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }

    @TypeSystem.propertyDecorator('number')
    public set id(val: number) {
        this._id = val;
    }

    public get id(): number {
        return this._id;
    }

    @TypeSystem.propertyDecorator('string')
    public set code(val: string) {
        this._code = val;
    }

    public get code(): string {
        return this._code;
    }

    @TypeSystem.propertyDecorator('string')
    public set text(val: string) {
        this._text = val;
    }

    public get text(): string {
        return this._text;
    }

    @TypeSystem.propertyDecorator('number')
    public set parentID(val: number) {
        this._parentID = val;
    }

    public get parentID(): number {
        return this._parentID;
    }
}