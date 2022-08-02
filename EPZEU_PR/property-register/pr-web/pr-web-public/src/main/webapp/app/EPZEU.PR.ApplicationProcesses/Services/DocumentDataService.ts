import { BaseDataService, UrlHelper } from 'Cnsys.Core';
import { epzeuAuthenticationService } from 'EPZEU.Core';

export class DocumentsDataService extends BaseDataService {
  protected baseUrl(): string {
    return super.baseUrl() + "Document";
  }

  private documentAccessUrl(): string {
    return UrlHelper.generateContentUrl("~/DocumentAccess/");
  }

  public getDownloadUrl(docGuid: string): Promise<string> {

    return epzeuAuthenticationService.GetUserAccessToken().then(t => {

      let result = this.baseUrl() + '/' + docGuid;
      //TODO do not return null if there is no token this broke downloading when it is attached document in application or change DocumentUI component
      if (t == null) {
        //Access Denied if cannot get token
        return result = this.documentAccessUrl() + docGuid + "?accessDenied=true";
      }

      result += '?key=' + t;
      return result;
    });
  }
}

export const documentsDataService = new DocumentsDataService();
