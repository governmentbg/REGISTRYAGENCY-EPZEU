import { BaseDataModel, TypeSystem } from 'Cnsys.Core';
import { observable } from 'mobx';
import { moduleContext } from '../ModuleContext';

@TypeSystem.typeDecorator('InstructionDownloadItem', moduleContext.moduleName)
export class InstructionDownloadItem extends BaseDataModel {
    @observable private _downloadLink: string = null;
    @observable private _instructionReason: string = null;

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }

    @TypeSystem.propertyDecorator('string')
    public set downloadLink(val: string) {
        this._downloadLink = val;
    }

    public get downloadLink(): string {
        return this._downloadLink;
    }

    @TypeSystem.propertyDecorator('string')
    public set instructionReason(val: string) {
        this._instructionReason = val;
    }

    public get instructionReason(): string {
        return this._instructionReason;
    }
}