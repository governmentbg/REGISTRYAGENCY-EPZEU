import { ItemCacheBase } from 'Cnsys.Core';
import { Language } from "../Models";
import { NomenclaturesDataService } from '../Services/NomenclaturesDataService';

export class LanguagesCache extends ItemCacheBase<Language[]> {

    protected generateValue(key: string): Promise<Language[]> {
        var nomenclaturesDataService = new NomenclaturesDataService();

        return nomenclaturesDataService.getLanguages();
    }
}