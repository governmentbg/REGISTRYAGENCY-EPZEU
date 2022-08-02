import { ItemCacheBase } from 'Cnsys.Core'
import { NomenclaturesDataService } from '../Services/NomenclaturesDataService'
import { District } from "../Models"

export class EkatteDistrictsCache extends ItemCacheBase<District[]> {

    protected generateValue(key: string): Promise<District[]> {
        var nomenclaturesDataService = new NomenclaturesDataService();

        return nomenclaturesDataService.getEkatteDistricts();
    }
}