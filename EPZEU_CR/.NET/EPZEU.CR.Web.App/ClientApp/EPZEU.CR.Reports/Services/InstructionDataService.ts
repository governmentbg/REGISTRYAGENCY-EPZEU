import { InstructionSearchCriteria } from '../Models/InstructionSearchCriteria';
import { Instruction } from '../Models/Instruction';
import { InstructionDownloadItem } from '../Models/InstructionDownloadItem';
import { EPZEUBaseDataService } from 'EPZEU.Core';

export class InstructionDataService extends EPZEUBaseDataService {
    protected baseUrl(): string {
        return super.baseUrl() + "Instructions";
    }

    public getApplicationInstructions(criteria: InstructionSearchCriteria): Promise<InstructionDownloadItem[]> {
        return this.get<InstructionDownloadItem[]>(null, InstructionDownloadItem, criteria);
    }

    public getDeedInstructions(criteria: InstructionSearchCriteria): Promise<Instruction[]> {
        return this.get<Instruction[]>(null, Instruction, criteria, null).then(function (result: Instruction[]) {
            criteria.count = this.jqXHR.getResponseHeader('Count') ? this.jqXHR.getResponseHeader('Count') : 0;
            return result;
        });
    }
}