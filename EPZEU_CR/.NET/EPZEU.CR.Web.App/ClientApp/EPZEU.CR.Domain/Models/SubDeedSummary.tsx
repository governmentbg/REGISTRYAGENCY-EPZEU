import { observable } from 'mobx'
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { moduleContext } from '../ModuleContext'
import { SubDeedStatuses, SubUICTypes } from 'EPZEU.CR.Core'

@TypeSystem.typeDecorator('SubDeedSummary', moduleContext.moduleName)
export class SubDeedSummary extends BaseDataModel {

    @observable private _subUIC: string = null;

    @TypeSystem.propertyDecorator('string')
    public set subUIC(val: string) {
        this._subUIC = val;
    }

    public get subUIC(): string {
        return this._subUIC;
    }

    @observable private _subUICType: SubUICTypes = null;

    @TypeSystem.propertyDecorator('string')
    public set subUICType(val: SubUICTypes) {
        this._subUICType = val;
    }

    public get subUICType(): SubUICTypes {
        return this._subUICType;
    }

    @observable private _status: SubDeedStatuses = null;

    @TypeSystem.propertyDecorator(SubDeedStatuses)
    public set status(val: SubDeedStatuses) {
        this._status = val;
    }

    public get status(): SubDeedStatuses {
        return this._status;
    }

    @observable private _name: string = null;

    @TypeSystem.propertyDecorator('string')
    public set name(val: string) {
        this._name = val;
    }

    public get name(): string {
        return this._name;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}