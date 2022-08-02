import { TypeSystem } from 'Cnsys.Core';
import { ApplicationFormBase } from 'EPZEU.CR.Domain';
import { observable } from 'mobx';
import { moduleContext } from '../ModuleContext';
import { RequestForCertificate } from './RequestForCertificate';

@TypeSystem.typeDecorator('RequestForCertificateBase', moduleContext.moduleName)
export class RequestForCertificateBase extends ApplicationFormBase {

    @observable private _certificate: RequestForCertificate = null;

    @TypeSystem.propertyDecorator(RequestForCertificate ? RequestForCertificate : moduleContext.moduleName + '.' + 'RequestForCertificate')
    public set certificate(val: RequestForCertificate) {
        this._certificate = val;
    }

    public get certificate(): RequestForCertificate {
        return this._certificate;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}