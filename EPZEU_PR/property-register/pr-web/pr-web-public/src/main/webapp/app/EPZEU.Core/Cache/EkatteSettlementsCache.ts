import { ItemCacheBase, ArrayHelper } from 'Cnsys.Core'
import { NomenclaturesDataService } from '../Services/NomenclaturesDataService'
import { Settlement } from "../Models"

export class EkatteSettlementsCache extends ItemCacheBase<Settlement[]> {

    protected generateValue(key: string): Promise<Settlement[]> {
        var nomenclaturesDataService = new NomenclaturesDataService();
        var settlements = nomenclaturesDataService.getEkatteSettlements();;
        var municipalities = nomenclaturesDataService.getEkatteMunicipalities();
        var districts = nomenclaturesDataService.getEkatteDistricts();
        var areas = nomenclaturesDataService.getEkatteAreas();

        return Promise.all([settlements, municipalities, districts, areas]).then((values) => {

            //Municipalities
            values[1].forEach(m => m.district = ArrayHelper.queryable.from(values[2]).single(d => d.id == m.districtID));

            //Settlements
            values[0].forEach((settlement) => {
                settlement.id = settlement.id;
                settlement.ekatteCode = settlement.ekatteCode;
                settlement.name = settlement.name;
                settlement.municipality = ArrayHelper.queryable.from(values[1]).single(m => m.id == settlement.municipalityID);
                settlement.areas = values[3].filter(area => area.settlementID == settlement.id);
            })

            return values[0];
        });
    }
}