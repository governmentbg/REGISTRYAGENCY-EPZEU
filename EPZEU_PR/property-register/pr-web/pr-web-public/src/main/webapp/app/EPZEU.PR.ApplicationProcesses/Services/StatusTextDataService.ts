import { BaseDataService } from 'Cnsys.Core';
import { ApplicationREAU } from "../Models/ApplicationREAU";

export class StatusTextDataService extends BaseDataService {
  protected baseUrl(): string {
    return super.baseUrl() + "Applications/StatusText";
  }

  public getStatusText(incNumber: string, spid: number): Promise<ApplicationREAU> {
    return this.get<ApplicationREAU>(`${incNumber}`, ApplicationREAU, { spid: spid});
  }

}

export const statusTextDataService = new StatusTextDataService();
