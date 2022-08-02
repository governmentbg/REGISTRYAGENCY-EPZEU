import { BaseDataService } from 'Cnsys.Core';
import { epzeuAuthenticationService } from 'EPZEU.Core';

export class DocumentsDataService extends BaseDataService {
    protected baseUrl(): string {
        return super.baseUrl() + "Documents";
    }

    //#region Public methods

    public getDraftDownloadUrl(docGuid: string): Promise<string> {

        return epzeuAuthenticationService.GetUserAccessToken().then(t => {

            let result = this.baseUrl() + '/Draft/' + docGuid;

            if (t != null)
                result += '?access_token=' + t;

            return result;
        });
    }

    public getDownloadUrl(docGuid: string): Promise<string> {

        return epzeuAuthenticationService.GetUserAccessToken().then(t => {

            let result = this.baseUrl() + '/' + docGuid;

            if (t != null)
                result += '?access_token=' + t;

            return result;
        });
    }

    public getDownloadCcUrl(uic: string, docGuid: string): Promise<string> {

        return epzeuAuthenticationService.GetUserAccessToken().then(t => {

            let result = this.baseUrl() + '/' + uic + '/' + docGuid;

            if (t != null)
                result += '?access_token=' + t;

            return result;
        });
    }

    //#endregion
}

export const documentsDataService = new DocumentsDataService();