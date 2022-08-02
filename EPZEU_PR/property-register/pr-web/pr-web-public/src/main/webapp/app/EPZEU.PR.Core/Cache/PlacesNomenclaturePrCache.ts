import { ArrayHelper, ItemCacheBase } from "Cnsys.Core";
import { NomenclaturesPRDataService } from '../Services/NomenclaturesPRDataService'
import { PlaceNomenclaturePR } from "../Models/NomenclaturesModels/PlaceNomenclaturePR";

export class PlacesNomenclaturePrCache extends ItemCacheBase<PlaceNomenclaturePR[]>{


  protected generateValue(key?: string): Promise<PlaceNomenclaturePR[]> {
    var nomenclaturesDataService = new NomenclaturesPRDataService();
    var places = nomenclaturesDataService.getPlaces();

    return Promise.all(places).then((values)=>{
      let settlements = values.filter((model) => model.siteId);
      let municipality = values.filter((model) => !model.siteId && model.parentId);
      let area = values.filter((model) => !model.siteId && !model.parentId);

      municipality.forEach(m=>m.placePR = ArrayHelper.queryable.from(area).single(s=>s.placeId == m.parentId));
      settlements.forEach(m=>m.placePR = ArrayHelper.queryable.from(municipality).single(s=>s.placeId == m.parentId));

      return settlements;
    })


  }
}
