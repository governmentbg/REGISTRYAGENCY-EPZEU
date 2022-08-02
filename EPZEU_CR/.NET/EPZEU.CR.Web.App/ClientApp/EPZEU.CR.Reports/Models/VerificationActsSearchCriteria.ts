import { observable } from 'mobx';
import { TypeSystem, BaseDataModel } from 'Cnsys.Core';
import { moduleContext } from '../ModuleContext';

@TypeSystem.typeDecorator('VerificationActsSearchCriteria', moduleContext.moduleName)
export class VerificationActsSearchCriteria extends BaseDataModel {

    @observable private _uic: string = null;

    @TypeSystem.propertyDecorator('string')
    public set uic(val: string) {
        this._uic = val;
    }

    public get uic(): string {
        return this._uic;
    }


    @observable private _includeHistory: boolean = null;

    @TypeSystem.propertyDecorator('boolean')
    public set includeHistory(val: boolean) {
        this._includeHistory = val;
    }

    public get includeHistory(): boolean {
        return this._includeHistory;
    }


    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}