import { BaseDataService } from 'Cnsys.Core';
import { appConfig } from '../Common';

export class EvrotrustProcessorDataService extends BaseDataService {

    protected baseUrl(): string {
        return appConfig.epzeuApiRoot + 'EvrotrustProcessor';
    }

    public createSignRequest(processID: string, signerID: number, identType: number, ident: string): Promise<void> {
        return this.ajax({
            url: this.getFullUrl('/CreateSignRequest'),
            contentType: 'application/json',
            type: 'POST',
            crossDomain: true,
            data: JSON.stringify({ processID: processID, signerID: signerID, identType: identType, userIdent: ident})
        }, null);
    }
}