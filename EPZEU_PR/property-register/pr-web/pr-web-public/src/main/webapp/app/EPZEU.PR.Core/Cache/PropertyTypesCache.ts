import { ItemCacheBase } from 'Cnsys.Core'
import { NomenclaturesPRDataService } from '../Services/NomenclaturesPRDataService'
import { PropertyType } from "../Models/NomenclaturesModels/PropertyType";

export class PropertyTypesCache extends ItemCacheBase<PropertyType[]> {

  protected generateValue(key: string): Promise<PropertyType[]> {
    var nomenclaturesDataService = new NomenclaturesPRDataService();

    return nomenclaturesDataService.getPropertyTypes();
  }
}
