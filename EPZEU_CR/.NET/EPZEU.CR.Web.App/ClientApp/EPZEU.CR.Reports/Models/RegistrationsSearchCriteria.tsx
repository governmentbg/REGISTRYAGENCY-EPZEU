import { observable } from 'mobx';
import { TypeSystem, BasePagedSearchCriteria } from 'Cnsys.Core';
import { moduleContext } from '../ModuleContext';

@TypeSystem.typeDecorator('RegistrationsSearchCriteria', moduleContext.moduleName)
export class RegistrationsSearchCriteria extends BasePagedSearchCriteria {

    @observable private _incomingNumber: string = null;

    @TypeSystem.propertyDecorator('string')
    public set incomingNumber(val: string) {
        this._incomingNumber = val;
    }

    public get incomingNumber(): string {
        return this._incomingNumber;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}