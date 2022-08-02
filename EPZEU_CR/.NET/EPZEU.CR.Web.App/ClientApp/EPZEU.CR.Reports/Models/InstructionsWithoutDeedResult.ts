import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { observable } from 'mobx';
import { moduleContext } from '../ModuleContext';
import { Instruction } from './Instruction';

@TypeSystem.typeDecorator('InstructionsWithoutDeedResult', moduleContext.moduleName)
export class InstructionsWithoutDeedResult extends BaseDataModel {

    @observable private _items: Instruction[] = null;

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }

    @TypeSystem.propertyArrayDecorator(Instruction ? Instruction : moduleContext.moduleName + '.' + 'Instruction')
    public set items(val: Instruction[]) {
        this._items = val;
    }

    public get items(): Instruction[] {
        return this._items;
    }
}