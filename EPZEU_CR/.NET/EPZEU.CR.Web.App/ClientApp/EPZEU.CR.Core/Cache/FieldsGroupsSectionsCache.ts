import { ItemCacheBase } from 'Cnsys.Core';
import { FieldsGroupsSections } from "../Models/FieldsGroupsSections";
import { NomenclaturesDataService } from '../Services/NomenclaturesDataService';

export class FieldsGroupsSectionsCache extends ItemCacheBase<FieldsGroupsSections> {

    protected generateValue(key: string): Promise<FieldsGroupsSections> {
        var nomenclaturesDataService = new NomenclaturesDataService();
        var params = JSON.parse(key);

        return nomenclaturesDataService.getFieldsGroupsSections(params.legalForm, params.excludeActs, params.getOnlyActs);
    }
}