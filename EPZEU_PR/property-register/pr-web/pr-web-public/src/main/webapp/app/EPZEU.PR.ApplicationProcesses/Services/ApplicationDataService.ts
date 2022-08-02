import { BaseDataService } from "Cnsys.Core";

export class ApplicationDataService extends BaseDataService {
  protected baseUrl(): string {
    return super.baseUrl() + "Applications";
  }

  public getApplicationForm(incomingNumber: string): Promise<any> {
    return this.get<any>(`${incomingNumber}/Form`, null);
  }
}
