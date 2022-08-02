import { BaseDataService } from 'Cnsys.Core';
import { appConfig } from '../Common';
import { SigningProcess } from '../Models/SigningProcess';

export class SigningProcessesDataService extends BaseDataService {

    protected baseUrl(): string {
        return appConfig.epzeuApiRoot + 'SigningProcesses';
    }

    public search(processID: string): Promise<SigningProcess[]> {
        return this.get<SigningProcess[]>(`/${processID}`, SigningProcess, null);
    }
    
    public rejectSigningProcess(processID: string): Promise<boolean> {
        return this.post<boolean>(`/${processID}/reject`, 'boolean', null);
    }

    public testSign(processID: string): Promise<void> {
        return this.ajax({
            url: this.getFullUrl(`/${processID}/testSign`),
            contentType: 'application/json',
            type: 'POST',
            crossDomain: true
        }, null);
    }

    public signerRejectSigning(processID: string, signerID: number): Promise<void> {
        return this.ajax({
            url: this.getFullUrl(`/${processID}/Signers/${signerID}/RejectSigning`),
            contentType: 'application/json',
            type: 'PUT',
            crossDomain: true
        }, null);
    }
}