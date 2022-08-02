import { observable } from 'mobx';
import { TypeSystem, BaseDataModel } from 'Cnsys.Core';
import { moduleContext } from '../ModuleContext';
import { ApplicationInfo } from 'EPZEU.CR.Core';

@TypeSystem.typeDecorator('ActiveConditionCaseResult', moduleContext.moduleName)
export class ActiveConditionCaseResult extends BaseDataModel {

    @observable private _items: ApplicationInfo[] = null;

    @TypeSystem.propertyArrayDecorator(ApplicationInfo ? ApplicationInfo : moduleContext.moduleName + '.' + 'ApplicationInfo')
    public set items(val: ApplicationInfo[]) {
        this._items = val;
    }

    public get items(): ApplicationInfo[] {
        return this._items;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}