import { userContext } from 'Cnsys.Core';
import { ApplicationFormBaseManager } from 'EPZEU.PR.ApplicationBase';
import { GroupReportForAccountProperty } from "../Models/Applications/GroupReportForAccountProperty";


export class GroupReportForAccountPropertyFormManager extends ApplicationFormBaseManager<GroupReportForAccountProperty> {

  protected createApplication(obj: any): GroupReportForAccountProperty {
    return new GroupReportForAccountProperty(obj);
  }

  public get cost(): number {
    let price = 0;
    if (this.nomApplicationType && this.application && this.application.accountPropertySubjectOfReportSection
      && this.application.accountPropertySubjectOfReportSection.requestsForReportOfAccountProperty) {

      price = this.nomApplicationType.prices[0].price * this.application.accountPropertySubjectOfReportSection.requestsForReportOfAccountProperty.length;
    }
    return price;
  }

  public get isTaxFree(): boolean {
    return ((this.nomApplicationType && (this.nomApplicationType.prices[0].price === 0)) || (userContext.user.roles.indexOf('PR_APP_PROPERTY_LOT_REPORT_FREE') > -1))
  }
}
