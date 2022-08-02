import { observable } from 'mobx';
import { TypeSystem, BaseDataModel } from 'Cnsys.Core';
import { moduleContext } from '../ModuleContext';
import { Notification } from './Notification';

@TypeSystem.typeDecorator('NotificationResult', moduleContext.moduleName)
export class NotificationResult extends BaseDataModel {
    @observable private _items: Notification[] = null;

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }

    @TypeSystem.propertyArrayDecorator(Notification ? Notification : moduleContext.moduleName + '.' + 'Notification')
    public set items(val: Notification[]) {
        this._items = val;
    }

    public get items(): Notification[] {
        return this._items;
    }
}