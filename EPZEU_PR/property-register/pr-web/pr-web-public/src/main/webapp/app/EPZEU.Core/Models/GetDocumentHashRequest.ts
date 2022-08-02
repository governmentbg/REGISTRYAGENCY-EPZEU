import { observable } from 'mobx';
import { TypeSystem, BaseDataModel } from 'Cnsys.Core';
import { moduleContext } from '../ModuleContext';

@TypeSystem.typeDecorator('GetDocumentHashRequest', moduleContext.moduleName)
export class GetDocumentHashRequest extends BaseDataModel {
    @observable private _base64SigningCert: string = null;

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }

    @TypeSystem.propertyDecorator('string')
    public set base64SigningCert(val: string) {
        this._base64SigningCert = val;
    }

    public get base64SigningCert(): string {
        return this._base64SigningCert;
    }
}