import { ItemCacheBase } from 'Cnsys.Core'
import { NomenclaturesDataService } from '../Services/NomenclaturesDataService';
import { SpecialAccessUserType } from "../Models";

export class SpecialAccessUserTypesCache extends ItemCacheBase<SpecialAccessUserType[]> {

    protected generateValue(key: string): Promise<SpecialAccessUserType[]> {
        var nomenclaturesDataService = new NomenclaturesDataService();

        return nomenclaturesDataService.getSpecialAccessUserTypes();
    }
}
