import { DataServiceProvider, Area, ForeignCommercialRegister, ForeignLegalForm } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { Dictionary } from 'typescript-collections';
import { IApplicationFormManager, ProcessStates, Record } from '../../';

export interface IApplicationFormValidationContext {
    isRecordNew(record: Record): boolean;
    isRecordDirty(record: Record): boolean;
    processStates: ProcessStates,
    isRecordEmpty(record: Record, propsDefaultValues?: Dictionary<string, any>): boolean;
    appType: ApplicationFormTypes;
    applicationManager: IApplicationFormManager;
    dataServiceProvider: DataServiceProvider;
    ekatteAreas: Area[];
    foreignCommercialRegisters: ForeignCommercialRegister[]
    legalForms?: ForeignLegalForm[]
}