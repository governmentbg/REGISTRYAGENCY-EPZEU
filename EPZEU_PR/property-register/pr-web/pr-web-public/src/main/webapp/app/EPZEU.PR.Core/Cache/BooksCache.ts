import {ItemCacheBase} from 'Cnsys.Core'
import {NomenclaturesPRDataService} from '../Services/NomenclaturesPRDataService'
import {Book} from "../Models/NomenclaturesModels/Book";

export class BooksCache extends ItemCacheBase<Book[]> {

  protected generateValue(key: string): Promise<Book[]> {
    var nomenclaturesDataService = new NomenclaturesPRDataService();

    return nomenclaturesDataService.getBooks();
  }
}
