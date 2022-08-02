import { BaseDataService } from 'Cnsys.Core';
import { ApplicationStatusResultInfo } from "../Models/ApplicationStatusResultInfo";

export class StatusHistoryDataService extends BaseDataService {
  protected baseUrl(): string {
    return super.baseUrl() + "Applications/StatusHistory";
  }

  public getStatusHistory(incNumber: string): Promise<ApplicationStatusResultInfo[]> {
    return this.get<ApplicationStatusResultInfo[]>(`${incNumber}`, ApplicationStatusResultInfo);
  }
}

export const statusHistoryDataService = new StatusHistoryDataService();
