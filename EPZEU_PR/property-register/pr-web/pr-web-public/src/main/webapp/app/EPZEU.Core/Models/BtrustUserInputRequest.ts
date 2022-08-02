import { TypeSystem } from 'Cnsys.Core';
import { moduleContext } from '../ModuleContext';

export interface BtrustUserInputRequest {
    input: string;
    inputType?: BtrustUserInputTypes;
    otp?: string;
}

export enum BtrustUserInputTypes {
    EGN = 0,
    LNCH = 1,
    PROFILE = 2
}
TypeSystem.registerEnumInfo(BtrustUserInputTypes, 'BtrustUserInputTypes', moduleContext.moduleName);