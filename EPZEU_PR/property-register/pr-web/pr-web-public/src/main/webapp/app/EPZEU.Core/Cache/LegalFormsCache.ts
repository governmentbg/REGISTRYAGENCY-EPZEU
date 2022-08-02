import { ItemCacheBase } from 'Cnsys.Core'
import { NomenclaturesDataService } from '../Services/NomenclaturesDataService'
import { LegalForm } from "../Models"

export class LegalFormsCache extends ItemCacheBase<LegalForm[]> {

    protected generateValue(key: string): Promise<LegalForm[]> {
        var nomenclaturesDataService = new NomenclaturesDataService();

        return nomenclaturesDataService.getLegalForms();
    }
}