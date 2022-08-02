import { ItemCacheBase } from 'Cnsys.Core'
import { NomenclaturesDataService } from '../Services/NomenclaturesDataService'
import { DocumentType } from '../Models';

export class DocumentTypesCache extends ItemCacheBase<DocumentType[]> {

    protected generateValue(key: string): Promise<DocumentType[]> {
        var nomenclaturesDataService = new NomenclaturesDataService();

        return nomenclaturesDataService.getDocumentTypes(Number(key));
    }
}