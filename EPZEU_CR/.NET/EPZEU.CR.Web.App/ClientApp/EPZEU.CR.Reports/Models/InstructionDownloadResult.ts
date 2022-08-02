import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { observable } from 'mobx';
import { moduleContext } from '../ModuleContext';
import { InstructionDownloadItem } from './InstructionDownloadItem';

@TypeSystem.typeDecorator('InstructionDownloadResult', moduleContext.moduleName)
export class InstructionDownloadResult extends BaseDataModel {
    @observable private _items: InstructionDownloadItem[] = null;

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }

    @TypeSystem.propertyArrayDecorator(InstructionDownloadItem ? InstructionDownloadItem : moduleContext.moduleName + '.' + 'InstructionDownloadItem')
    public set items(val: InstructionDownloadItem[]) {
        this._items = val;
    }

    public get items(): InstructionDownloadItem[] {
        return this._items;
    }
}