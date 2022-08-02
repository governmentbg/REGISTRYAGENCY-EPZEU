import { ItemCacheBase } from 'Cnsys.Core'
import { NomenclaturesDataService } from '../Services/NomenclaturesDataService'
import { Country } from "../Models"

export class CountriesCache extends ItemCacheBase<Country[]> {

    protected generateValue(key: string): Promise<Country[]> {
        var nomenclaturesDataService = new NomenclaturesDataService();

        return nomenclaturesDataService.getCountries();
    }
}