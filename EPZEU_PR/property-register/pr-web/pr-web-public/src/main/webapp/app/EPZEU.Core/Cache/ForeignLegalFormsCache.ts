import { ItemCacheBase } from 'Cnsys.Core'
import { NomenclaturesDataService } from '../Services/NomenclaturesDataService'
import { ForeignLegalForm } from "../Models"

export class ForeignLegalFormsCache extends ItemCacheBase<ForeignLegalForm[]> {

    protected generateValue(key: string): Promise<ForeignLegalForm[]> {
        var nomenclaturesDataService = new NomenclaturesDataService();

        return nomenclaturesDataService.getForeignLegalForms();
    }
}