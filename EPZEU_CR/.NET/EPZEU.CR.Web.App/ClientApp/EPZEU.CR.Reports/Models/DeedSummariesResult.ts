import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { DeedSummary } from "EPZEU.CR.Core";
import { observable } from 'mobx';
import { moduleContext } from '../ModuleContext';

@TypeSystem.typeDecorator('DeedSummariesResult', moduleContext.moduleName)
export class DeedSummariesResult extends BaseDataModel {

    @observable private _items: DeedSummary[] = null;

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }

    @TypeSystem.propertyArrayDecorator(DeedSummary ? DeedSummary : moduleContext.moduleName + '.' + 'DeedSummary')
    public set items(val: DeedSummary[]) {
        this._items = val;
    }

    public get items(): DeedSummary[] {
        return this._items;
    }
}
