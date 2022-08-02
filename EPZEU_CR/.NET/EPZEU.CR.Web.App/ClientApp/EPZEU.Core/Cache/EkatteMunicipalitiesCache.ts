import { ItemCacheBase } from 'Cnsys.Core'
import { NomenclaturesDataService } from '../Services/NomenclaturesDataService'
import { Municipality } from "../Models"

export class EkatteMunicipalitiesCache extends ItemCacheBase<Municipality[]> {

    protected generateValue(key: string): Promise<Municipality[]> {
        var nomenclaturesDataService = new NomenclaturesDataService();

        return nomenclaturesDataService.getEkatteMunicipalities();
    }
}