import { ItemCacheBase } from 'Cnsys.Core'
import { NomenclaturesDataService } from '../Services/NomenclaturesDataService'
import { Authority } from "../Models"

export class AuthoritiesCache extends ItemCacheBase<Authority[]> {

    protected generateValue(key: string): Promise<Authority[]> {
        var nomenclaturesDataService = new NomenclaturesDataService();

        return nomenclaturesDataService.getAuthorities();
    }
}