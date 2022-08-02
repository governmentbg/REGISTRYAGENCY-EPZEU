import { ItemCacheBase } from 'Cnsys.Core';
import { RegisterType } from "../Models/NomenclaturesModels/RegisterType";
import { NomenclaturesPRDataService } from '../Services/NomenclaturesPRDataService';

export class RegisterTypesCache extends ItemCacheBase<RegisterType[]> {

  protected generateValue(key: string): Promise<RegisterType[]> {
    var nomenclaturesDataService = new NomenclaturesPRDataService();

    return nomenclaturesDataService.getRegisterTypes();
  }
}
