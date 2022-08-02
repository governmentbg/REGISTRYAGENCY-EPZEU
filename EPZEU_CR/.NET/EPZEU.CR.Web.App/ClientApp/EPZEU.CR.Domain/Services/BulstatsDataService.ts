import { BaseDataService } from 'Cnsys.Core';
import { BulstatSummary } from '../';

export class BulstatsDataService extends BaseDataService {
    protected baseUrl(): string {
        return super.baseUrl() + "Bulstats";
    }

    public getBulstatSummary(uic: string): Promise<BulstatSummary> {
        return this.get<BulstatSummary>(`/${uic}/Summary/`, BulstatSummary, null);
    }
}