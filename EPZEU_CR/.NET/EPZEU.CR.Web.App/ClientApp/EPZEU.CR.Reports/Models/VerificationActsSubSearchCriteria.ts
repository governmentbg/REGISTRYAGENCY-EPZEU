import { observable } from 'mobx';
import { TypeSystem } from 'Cnsys.Core';
import { moduleContext } from '../ModuleContext';
import { VerificationActsSearchCriteria } from './VerificationActsSearchCriteria';

@TypeSystem.typeDecorator('VerificationActsSubSearchCriteria', moduleContext.moduleName)
export class VerificationActsSubSearchCriteria extends VerificationActsSearchCriteria {
    @observable private _selectedFields: string = null;

    @TypeSystem.propertyDecorator('string')
    public set selectedFields(val: string) {
        this._selectedFields = val;
    }

    public get selectedFields(): string {
        return this._selectedFields;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}