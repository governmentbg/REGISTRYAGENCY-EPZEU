import { userContext } from 'Cnsys.Core';
import { ApplicationFormBaseManager } from 'EPZEU.PR.ApplicationBase';
import { GroupReportForDocument } from "../Models/Applications/GroupReportForDocument";

export class GroupReportForDocumentFormManager extends ApplicationFormBaseManager<GroupReportForDocument> {

  protected createApplication(obj: any): GroupReportForDocument {
    return new GroupReportForDocument(obj);
  }

  public get cost(): number {
    let price = 0;
    if (this.nomApplicationType && this.application && this.application.documentSubjectOfReportSection && this.application.documentSubjectOfReportSection.requestsForReportOfDocument) {
      price = this.nomApplicationType.prices[0].price * this.application.documentSubjectOfReportSection.requestsForReportOfDocument.length;
    }
    return price;
  }

  public get isTaxFree(): boolean {
    return ((this.nomApplicationType && (this.nomApplicationType.prices[0].price === 0)) || (userContext.user.roles.indexOf('PR_APP_DOCUMENT_REPORT_FREE') > -1))
  }
}
