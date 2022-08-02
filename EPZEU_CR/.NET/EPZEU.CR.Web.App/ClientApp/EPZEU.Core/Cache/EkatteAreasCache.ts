import { ItemCacheBase } from 'Cnsys.Core'
import { NomenclaturesDataService } from '../Services/NomenclaturesDataService'
import { Area } from "../Models"

export class EkatteAreasCache extends ItemCacheBase<Area[]> {

    protected generateValue(key: string): Promise<Area[]> {
        var nomenclaturesDataService = new NomenclaturesDataService();

        return nomenclaturesDataService.getEkatteAreas();
    }
}