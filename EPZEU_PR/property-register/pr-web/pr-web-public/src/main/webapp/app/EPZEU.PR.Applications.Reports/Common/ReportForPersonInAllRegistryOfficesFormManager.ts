import { userContext } from "Cnsys.Core";
import { ApplicationFormBaseManager } from "EPZEU.PR.ApplicationBase";
import { RequestForReportForPersonInAllRegistryOffices } from "../Models/Applications/ReportForPersonInAllRegistryOffices";

export class ReportForPersonInAllRegistryOfficesFormManager extends ApplicationFormBaseManager<RequestForReportForPersonInAllRegistryOffices>{

  protected createApplication(obj: any): RequestForReportForPersonInAllRegistryOffices {
    return new RequestForReportForPersonInAllRegistryOffices(obj);
  }

  public get cost():number{
      return 1; //Cost is fixed to 1 bgn per report
  }

  public get isTaxFree(): boolean {
    return ((this.cost === 0) || (userContext.user.roles.indexOf('PR_APP_PERSON_REPORT_FOR_ALL_SERVICES_REPORT_FREE') > -1))
  }
}
