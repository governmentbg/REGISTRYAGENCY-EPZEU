import { BaseDataService } from 'Cnsys.Core';
import { SubUICTypes, DeedSummary } from 'EPZEU.CR.Core';
import { Branch, F005_Seat, SubDeedSummary } from '../';
import * as moment from 'moment';

export class DeedsDataService extends BaseDataService {
    protected baseUrl(): string {
        return super.baseUrl() + "Deeds";
    }

    public getDeedSummary(uic: string): Promise<DeedSummary> {
        return this.get<DeedSummary>(`/${uic}/Summary/`, DeedSummary, null);
    }

    public getSubDeedSummaries(uic: string, subUICTypes: SubUICTypes): Promise<SubDeedSummary[]> {
        return this.get<SubDeedSummary[]>(`/${uic}/SubDeeds/${subUICTypes.toString()}/Summary/`, SubDeedSummary, null);
    }

    public getCompanySeat(uic: string): Promise<F005_Seat> {
        return this.get<F005_Seat>(`/${uic}/Seat/`, F005_Seat, null);
    }

    public getCompanyBranches(uic: string): Promise<Branch[]> {
        return this.get<Branch[]>(`/${uic}/CompanyBranches/`, Branch, null);
    }

    public getDeedFieldIdents(uic: string, entryDate: moment.Moment, includeHistory?: boolean): Promise<string[]> {
        let isIncludedHistory = includeHistory === true ? true : false;

        return this.get<string[]>(`/${uic}/DeedFieldIdents/`, "string", { entryDate: moment.isMoment(entryDate) ? entryDate.endOf('day') : moment().endOf('day'), includeHistory: isIncludedHistory });
    }
}