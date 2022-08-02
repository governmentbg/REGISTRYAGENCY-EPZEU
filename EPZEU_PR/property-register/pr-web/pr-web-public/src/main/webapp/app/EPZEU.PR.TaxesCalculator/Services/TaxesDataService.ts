import { BaseDataService, TypeInfo } from 'Cnsys.Core';
import { Act } from 'EPZEU.Core';

export class TaxesDataService extends BaseDataService {
  protected baseUrl(): string {
    return super.baseUrl() + "Reports";
  }

  public calculateTax(actId: string, materialInterest: number): Promise<number> {
    return this.get<number>('/FeeCalculator', null, { actId: actId, materialInterest: materialInterest });
  }
}
