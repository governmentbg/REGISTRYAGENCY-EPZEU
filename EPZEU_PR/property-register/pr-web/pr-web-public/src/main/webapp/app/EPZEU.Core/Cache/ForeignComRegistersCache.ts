import { ItemCacheBase } from 'Cnsys.Core'
import { NomenclaturesDataService } from '../Services/NomenclaturesDataService'
import { ForeignCommercialRegister } from "../Models"

export class ForeignComRegistersCache extends ItemCacheBase<ForeignCommercialRegister[]> {

    protected generateValue(key: string): Promise<ForeignCommercialRegister[]> {
        var nomenclaturesDataService = new NomenclaturesDataService();

        return nomenclaturesDataService.getForeignComRegisters();
    }
}