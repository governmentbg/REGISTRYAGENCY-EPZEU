import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { observable } from "mobx";
import { moduleContext } from '../ModuleContext';

@TypeSystem.typeDecorator('SpecialAccessUserType', moduleContext.moduleName)
export class SpecialAccessUserType extends BaseDataModel {
    @observable private _userTypeId: number = null;
    @observable private _name: string = null;

    constructor(obj?: any) {
        super(obj);

        this.copyFrom(obj);
    }

    @TypeSystem.propertyDecorator('number')
    public set userTypeId(val: number) {
        this._userTypeId = val;
    }

    public get userTypeId(): number {
        return this._userTypeId;
    }

    @TypeSystem.propertyDecorator('string')
    public set name(val: string) {
        this._name = val;
    }

    public get name(): string {
        return this._name;
    }
}
