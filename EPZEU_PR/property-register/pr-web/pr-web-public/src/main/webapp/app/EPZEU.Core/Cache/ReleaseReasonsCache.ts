import { ItemCacheBase } from 'Cnsys.Core'
import { NomenclaturesDataService } from '../Services/NomenclaturesDataService'
import { ReleaseReasons } from '../Models';

export class ReleaseReasonsCache extends ItemCacheBase<ReleaseReasons[]> {

    protected generateValue(key: string): Promise<ReleaseReasons[]> {
        var nomenclaturesDataService = new NomenclaturesDataService();

        return nomenclaturesDataService.getReleaseReasons();
    }
}