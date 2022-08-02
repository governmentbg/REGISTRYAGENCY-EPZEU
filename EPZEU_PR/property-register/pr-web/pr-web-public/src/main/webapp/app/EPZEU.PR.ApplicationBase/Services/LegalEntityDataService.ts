import { BaseDataService } from 'Cnsys.Core';
import { LegalEntityIntegration } from "../Models/LegalEntityIntegration";


export class LegalEntityDataService extends BaseDataService {
  protected baseUrl(): string {
    return super.baseUrl() + "LegalEntity";
  }

  public searchLegalEntity(legalEntityNumber: string): Promise<LegalEntityIntegration> {
    return this.get<LegalEntityIntegration>(`/${legalEntityNumber}`, LegalEntityIntegration);
  }

  public getLegalEntityNumber(): Promise<LegalEntityIntegration> {
    return this.get<LegalEntityIntegration>('', LegalEntityIntegration);
  }
}
