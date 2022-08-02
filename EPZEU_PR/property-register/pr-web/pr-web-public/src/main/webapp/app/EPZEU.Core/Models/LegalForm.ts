import { observable } from 'mobx'
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { moduleContext } from '../ModuleContext'

@TypeSystem.typeDecorator('LegalForm', moduleContext.moduleName)
export class LegalForm extends BaseDataModel {

    @observable private _id: number = null;

    @TypeSystem.propertyDecorator('number')
    public set id(val: number) {
        this._id = val;
    }

    public get id(): number {
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


    @observable private _abbreviation: string = null;

    @TypeSystem.propertyDecorator('string')
    public set abbreviation(val: string) {
        this._abbreviation = val;
    }

    public get abbreviation(): string {
        return this._abbreviation;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}