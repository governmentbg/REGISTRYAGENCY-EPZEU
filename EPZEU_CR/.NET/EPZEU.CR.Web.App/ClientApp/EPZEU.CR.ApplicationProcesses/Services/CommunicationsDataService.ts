import { EPZEUBaseDataService } from 'EPZEU.Core';
import { ApplicationInfo } from 'EPZEU.CR.Core';
import { RequestForCorrectionForScanning } from '../Models/RequestForCorrectionForScanning';

export class CommunicationsDataService extends EPZEUBaseDataService {

    protected baseUrl(): string {
        return super.baseUrl() + "Communications";
    }

    public loadCommunication(incomingNumber: string): Promise<RequestForCorrectionForScanning> {
        return this.get<RequestForCorrectionForScanning>(`Search/${incomingNumber}/Communication/`, RequestForCorrectionForScanning);
    }

    public loadApplicationInfo(incomingNumber: string): Promise<ApplicationInfo> {
        return this.get<ApplicationInfo>(`Load/${incomingNumber}/ApplicationInfo/`, ApplicationInfo);
    }

    public createCommunication(data: RequestForCorrectionForScanning): Promise<RequestForCorrectionForScanning> {
        return this.post<RequestForCorrectionForScanning>("Accept", RequestForCorrectionForScanning, data);
    }
}