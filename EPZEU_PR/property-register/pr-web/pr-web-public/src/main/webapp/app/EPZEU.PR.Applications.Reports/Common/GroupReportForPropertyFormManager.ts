import { userContext } from "Cnsys.Core";
import { ApplicationFormBaseManager } from "EPZEU.PR.ApplicationBase";
import { GroupReportForProperty } from "../Models/Applications/GroupReportForProperty";

export  class  GroupReportForPropertyFormManager extends  ApplicationFormBaseManager<GroupReportForProperty>{

  protected createApplication(obj: any): GroupReportForProperty {
    return new GroupReportForProperty(obj);
  }

  public get cost():number{
    let price = 0;
    if(this.nomApplicationType && this.application && this.application.propertySubjectOfReportSection && this.application.propertySubjectOfReportSection.requestsForReportOfProperty) {
      price = this.nomApplicationType.prices[0].price * this.application.propertySubjectOfReportSection.requestsForReportOfProperty.length;
    }
    return price;
  }

  public get isTaxFree(): boolean {
    return ((this.nomApplicationType && (this.nomApplicationType.prices[0].price === 0)) || (userContext.user.roles.indexOf('PR_APP_PROPERTY_REPORT_FREE') > -1)) 
  }
}
