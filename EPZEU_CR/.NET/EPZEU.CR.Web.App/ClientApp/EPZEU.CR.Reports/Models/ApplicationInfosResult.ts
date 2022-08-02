import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { ApplicationInfo } from "EPZEU.CR.Core";
import { observable } from 'mobx';
import { moduleContext } from '../ModuleContext';

@TypeSystem.typeDecorator('ApplicationInfosResult', moduleContext.moduleName)
export class ApplicationInfosResult extends BaseDataModel {

    @observable private _items: ApplicationInfo[] = null;

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }

    @TypeSystem.propertyArrayDecorator(ApplicationInfo ? ApplicationInfo : moduleContext.moduleName + '.' + 'ApplicationInfo')
    public set items(val: ApplicationInfo[]) {
        this._items = val;
    }

    public get items(): ApplicationInfo[] {
        return this._items;
    }
}
