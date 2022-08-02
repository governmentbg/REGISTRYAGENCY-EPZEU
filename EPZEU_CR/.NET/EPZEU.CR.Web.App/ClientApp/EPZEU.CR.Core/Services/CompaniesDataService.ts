import { EPZEUBaseDataService } from 'EPZEU.Core';
import { ReservedCompany } from '../Models/ReservedCompany';
import { CompanySummary } from '../Models/CompanySummary';
import { TransformationSummary } from '../Models/TransformationSummary';
import { TreeNodeCollection } from 'Cnsys.UI.React';

export class CompaniesDataService extends EPZEUBaseDataService {
    protected baseUrl(): string {
        return super.baseUrl() + "Companies";
    }

    public getCompanySummaries(incomingNumber: string, entryNumber: string): Promise<CompanySummary[]> {

        var uri = "/Summary/?";
        if (incomingNumber != null && incomingNumber != undefined && incomingNumber != "") {
            uri += "incomingNumber=" + incomingNumber;
        }
        else if (entryNumber != null && entryNumber != undefined && entryNumber != "") {
            uri += "entryNumber=" + entryNumber;
        }

        return this.get<CompanySummary[]>(uri, CompanySummary, null);
    }

    public getTransformationSummary(incomingNumber: string): Promise<TransformationSummary> {

        var uri = "/GetTransformationInfo/" + incomingNumber;

        return this.get<TransformationSummary>(uri, TransformationSummary, null, null);
    }

    public getReservedCompany(companyName: string): Promise<ReservedCompany[]> {

        var uri = "/GetReservedCompany/" + companyName;

        return this.get<ReservedCompany[]>(uri, ReservedCompany, null, null);
    }

    public getCompanyCases(uic: string): Promise<TreeNodeCollection> {
        return this.get<TreeNodeCollection>(`CompanyCases/${uic}`, TreeNodeCollection, null, null);
    }
}