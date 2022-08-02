import { BaseDataService, ObjectHelper } from 'Cnsys.Core';
import { ApplicationStatusResult } from '../Models/ApplicationStatusResult';
import { ApplicationREAU } from "EPZEU.PR.ApplicationProcesses";
import * as moment from 'moment';
import {UpcomingDealsSearchResult} from "../../EPZEU.PR.ApplicationBase/Models";

export class ReportsDataService extends BaseDataService {
  protected baseUrl(): string {
    return super.baseUrl() + "Reports";
  }

  public searchApplicationsWithoutMovement(): Promise<ApplicationREAU[]> {
    return this.get<ApplicationREAU[]>('/applicationsWithoutMovement', ApplicationREAU);
  }

  public getApplicationStatus(reauIncomingNumber: string, prIncomingNumber: string, registerDate: moment.Moment, registerId: string, registryOfficeId: string): Promise<ApplicationStatusResult> {
    if (ObjectHelper.isStringNullOrEmpty(reauIncomingNumber)) {
      return this.get<ApplicationStatusResult>('/ApplicationStatus', ApplicationStatusResult, {
        prIncomingNumber: prIncomingNumber,
        registerDate: registerDate,
        registerId: registerId,
        registryOfficeId: registryOfficeId,
      });
    } else
      return this.get<ApplicationStatusResult>('/ApplicationStatus', ApplicationStatusResult, { reauIncomingNumber: reauIncomingNumber})
  }

  public searchUpcomingDeals(cadastreNumber: string): Promise<UpcomingDealsSearchResult> {
    return this.get<UpcomingDealsSearchResult>('/PropertyDeals', UpcomingDealsSearchResult, { cadastreNumber: cadastreNumber });
  }
}
