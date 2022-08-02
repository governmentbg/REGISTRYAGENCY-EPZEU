import { ItemCacheBase } from 'Cnsys.Core'
import { NomenclaturesPRDataService } from '../Services/NomenclaturesPRDataService'
import { ApplicationTypePR } from "../Models/NomenclaturesModels/ApplicationTypePR";

export class ApplicationTypesPRCache extends ItemCacheBase<ApplicationTypePR[]> {

  protected generateValue(key: string): Promise<ApplicationTypePR[]> {
    var nomenclaturesDataService = new NomenclaturesPRDataService();

    return nomenclaturesDataService.getApplicationTypes();
  }
}
