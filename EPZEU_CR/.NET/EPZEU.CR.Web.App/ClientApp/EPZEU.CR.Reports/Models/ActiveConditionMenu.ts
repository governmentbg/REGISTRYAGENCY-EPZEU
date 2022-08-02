import { observable } from 'mobx';
import { TypeSystem, BaseDataModel } from 'Cnsys.Core';
import { moduleContext } from '../ModuleContext';
import { ActiveConditionMenuItem } from '../Models/ActiveConditionMenuItem';

@TypeSystem.typeDecorator('ActiveConditionMenu', moduleContext.moduleName)
export class ActiveConditionMenu extends BaseDataModel {
    @observable private _items: ActiveConditionMenuItem[] = null;

    @TypeSystem.propertyArrayDecorator(ActiveConditionMenuItem ? ActiveConditionMenuItem : moduleContext.moduleName + '.' + 'ActiveConditionMenuItem')
    public set items(val: ActiveConditionMenuItem[]) {
        this._items = val;
    }

    public get items(): ActiveConditionMenuItem[] {
        return this._items;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}