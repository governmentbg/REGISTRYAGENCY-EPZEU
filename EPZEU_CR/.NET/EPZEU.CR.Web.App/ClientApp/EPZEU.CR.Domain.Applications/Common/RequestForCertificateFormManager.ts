import { ApplicationFormBaseManager } from 'EPZEU.CR.Domain';
import { RequestForCertificateBase } from '../Models/RequestForCertificateBase';

export class RequestForCertificateFormManager extends ApplicationFormBaseManager<RequestForCertificateBase> {

    protected createApplication(obj: any): RequestForCertificateBase {
        return new RequestForCertificateBase(obj);
    }
}