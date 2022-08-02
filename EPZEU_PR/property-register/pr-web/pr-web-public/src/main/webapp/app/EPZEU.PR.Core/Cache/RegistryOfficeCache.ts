import {ItemCacheBase} from 'Cnsys.Core'
import {NomenclaturesPRDataService} from '../Services/NomenclaturesPRDataService'
import { RegistryOffice } from "../Models/NomenclaturesModels/RegistryOffice";

export class RegistryOfficeCache extends ItemCacheBase<RegistryOffice[]> {

  protected generateValue(key: string): Promise<RegistryOffice[]> {
    var nomenclaturesDataService = new NomenclaturesPRDataService();

    return nomenclaturesDataService.getRegistryOffice();
  }
}
