import {ItemCacheBase} from 'Cnsys.Core'
import {NomenclaturesPRDataService} from '../Services/NomenclaturesPRDataService'
import { ApplicantCategory } from "../Models/NomenclaturesModels/ApplicantCategory";

export class ApplicantCategoriesCache extends ItemCacheBase<ApplicantCategory[]> {

  protected generateValue(key: string): Promise<ApplicantCategory[]> {
    var nomenclaturesDataService = new NomenclaturesPRDataService();

    return nomenclaturesDataService.getApplicantCategories();
  }
}
