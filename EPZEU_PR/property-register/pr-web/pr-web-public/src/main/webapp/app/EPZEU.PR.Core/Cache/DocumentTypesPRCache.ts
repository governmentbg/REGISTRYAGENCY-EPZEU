import { ItemCacheBase } from 'Cnsys.Core'
import { NomenclaturesPRDataService } from '../Services/NomenclaturesPRDataService'
import { DocumentTypePR} from "../Models/NomenclaturesModels/DocumentTypePR";

export class DocumentTypesPRCache extends ItemCacheBase<DocumentTypePR[]> {

  protected generateValue(key: string): Promise<DocumentTypePR[]> {
    var nomenclaturesDataService = new NomenclaturesPRDataService();

    return nomenclaturesDataService.getDocumentTypes();
  }
}
