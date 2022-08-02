import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { observable } from 'mobx';
import { moduleContext } from '../ModuleContext';
import { StatementReport } from './StatementReport';

@TypeSystem.typeDecorator('StatementsByDateResult', moduleContext.moduleName)
export class StatementsByDateResult extends BaseDataModel {

    @observable private _items: StatementReport[] = null;

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }

    @TypeSystem.propertyArrayDecorator(StatementReport ? StatementReport : moduleContext.moduleName + '.' + 'StatementReport')
    public set items(val: StatementReport[]) {
        this._items = val;
    }

    public get items(): StatementReport[] {
        return this._items;
    }
}