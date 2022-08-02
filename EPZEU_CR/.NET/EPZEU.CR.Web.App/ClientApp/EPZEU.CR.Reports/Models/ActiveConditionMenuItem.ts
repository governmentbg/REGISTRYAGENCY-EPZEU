import { observable } from 'mobx';
import { TypeSystem, BaseDataModel } from 'Cnsys.Core';
import { moduleContext } from '../ModuleContext';

@TypeSystem.typeDecorator('ActiveConditionMenuItem', moduleContext.moduleName)
export class ActiveConditionMenuItem extends BaseDataModel {

    @observable private _text: string = null;

    @TypeSystem.propertyDecorator('string')
    public set text(val: string) {
        this._text = val;
    }

    public get text(): string {
        return this._text;
    }

    @observable private _value: number = null;

    @TypeSystem.propertyDecorator('number')
    public set value(val: number) {
        this._value = val;
    }

    public get value(): number {
        return this._value;
    }

    @observable private _isActive: boolean = false;

    @TypeSystem.propertyDecorator('boolean')
    public set isActive(val: boolean) {
        this._isActive = val;
    }

    public get isActive(): boolean {
        return this._isActive;
    }

    public showMenuItemComponent: () => JSX.Element;

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}