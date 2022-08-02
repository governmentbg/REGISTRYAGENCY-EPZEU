import { ItemCacheBase } from 'Cnsys.Core'
import { NomenclaturesDataService } from '../Services/NomenclaturesDataService'
import { Act } from "../Models"

export class ActsCache extends ItemCacheBase<Act[]> {

    protected generateValue(key: string): Promise<Act[]> {
        var nomenclaturesDataService = new NomenclaturesDataService();

        return nomenclaturesDataService.getActs();
    }
}