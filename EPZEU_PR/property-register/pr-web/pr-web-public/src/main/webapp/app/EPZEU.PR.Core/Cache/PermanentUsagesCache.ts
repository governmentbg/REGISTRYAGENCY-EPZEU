import { ItemCacheBase } from 'Cnsys.Core'
import { NomenclaturesPRDataService } from '../Services/NomenclaturesPRDataService'
import { PermanentUsage } from "../Models/NomenclaturesModels/PermanentUsage";

export class PermanentUsagesCache extends ItemCacheBase<PermanentUsage[]> {

  protected generateValue(key: string): Promise<PermanentUsage[]> {
    var nomenclaturesDataService = new NomenclaturesPRDataService();

    return nomenclaturesDataService.getPermanentUsages();
  }
}
