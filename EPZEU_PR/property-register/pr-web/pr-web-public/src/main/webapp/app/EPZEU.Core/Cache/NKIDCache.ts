import { ItemCacheBase } from 'Cnsys.Core'
import { NomenclaturesDataService } from '../Services/NomenclaturesDataService'
import { NKID } from "../Models"

export class NKIDCache extends ItemCacheBase<NKID[]> {

    protected generateValue(key: string): Promise<NKID[]> {
        var nomenclaturesDataService = new NomenclaturesDataService();

        return nomenclaturesDataService.getNKID();
    }
}