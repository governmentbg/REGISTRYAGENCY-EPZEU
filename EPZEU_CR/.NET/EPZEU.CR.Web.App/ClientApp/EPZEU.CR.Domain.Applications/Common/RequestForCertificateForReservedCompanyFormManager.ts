import { ClientError } from 'Cnsys.Core';
import { ApplicationFormBaseManager } from 'EPZEU.CR.Domain';
import { RequestForCertificateForReservedCompany } from '../Models/RequestForCertificateForReservedCompany';

export class RequestForCertificateForReservedCompanyFormManager extends ApplicationFormBaseManager<RequestForCertificateForReservedCompany> {

    protected createApplication(obj: any): RequestForCertificateForReservedCompany {
        return new RequestForCertificateForReservedCompany(obj);
    }
}