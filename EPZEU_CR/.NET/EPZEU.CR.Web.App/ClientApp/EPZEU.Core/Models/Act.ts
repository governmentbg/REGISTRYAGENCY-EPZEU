import { observable } from 'mobx'
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { moduleContext } from '../ModuleContext'

@TypeSystem.typeDecorator('Act', moduleContext.moduleName)
export class Act extends BaseDataModel {

    @observable private _id: string = null;

    @TypeSystem.propertyDecorator('string')
    public set id(val: string) {
        this._id = val;
    }

    public get id(): string {
        return this._id;
    }

    @observable private _name: string = null;

    @TypeSystem.propertyDecorator('string')
    public set name(val: string) {
        this._name = val;
    }

    public get name(): string {
        return this._name;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}