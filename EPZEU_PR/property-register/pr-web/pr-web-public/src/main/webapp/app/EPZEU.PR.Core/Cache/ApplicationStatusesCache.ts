import { ItemCacheBase } from 'Cnsys.Core'
import { NomenclaturesPRDataService} from '../Services/NomenclaturesPRDataService'
import { ApplicationStatus } from "../Models/NomenclaturesModels/ApplicationStatus";

export class ApplicationStatusesCache extends ItemCacheBase<ApplicationStatus[]> {

  protected generateValue(key: string): Promise<ApplicationStatus[]> {
    var nomenclaturesDataService = new NomenclaturesPRDataService();

    return nomenclaturesDataService.getApplicationStatuses();
  }
}
