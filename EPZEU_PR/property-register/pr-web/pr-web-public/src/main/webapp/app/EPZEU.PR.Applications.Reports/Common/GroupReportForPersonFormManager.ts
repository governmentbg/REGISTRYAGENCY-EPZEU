import { userContext } from "Cnsys.Core";
import { ApplicationFormBaseManager } from "EPZEU.PR.ApplicationBase";
import { GroupReportForPerson } from "../Models/Applications/GroupReportForPerson";

//TODO ApplicationFormBaseManager this manager have logic with Attached Documents - reports do not have attached documents and it is not recommended to use this base manager
export class GroupReportForPersonFormManager extends ApplicationFormBaseManager<GroupReportForPerson>{

  protected createApplication(obj: any): GroupReportForPerson {
    return new GroupReportForPerson(obj);
  }

  public get cost():number{
    let price = 0;
    if(this.nomApplicationType && this.application && this.application.personSubjectOfReportSection && this.application.personSubjectOfReportSection.requestsForReportOfPerson) {
      price = this.nomApplicationType.prices[0].price * this.application.personSubjectOfReportSection.requestsForReportOfPerson.length;
    }
    return price;
  }

   public get isTaxFree(): boolean {
     return ((this.nomApplicationType && (this.nomApplicationType.prices[0].price === 0)) || (userContext.user.roles.indexOf('PR_APP_PERSON_REPORT_FOR_SELECTED_SERVICE_FREE') > -1))
  }
}
