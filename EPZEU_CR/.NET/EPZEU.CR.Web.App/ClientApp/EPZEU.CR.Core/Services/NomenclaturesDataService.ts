import { appConfig as cnsysConfig, BaseDataService } from 'Cnsys.Core';
import { appConfig } from "EPZEU.Core";
import { FieldsGroupsSections } from "../Models/FieldsGroupsSections";

export class NomenclaturesDataService extends BaseDataService {

    protected baseUrl(): string {
        return appConfig.baseUrlName + "api/nomenclatures";
    }

    public getFieldsGroupsSections(legalForm?: number, excludeActs?: boolean, getOnlyActs?: boolean): Promise<FieldsGroupsSections> {
        return this.get<FieldsGroupsSections>(`/FieldsGroupsSections`, FieldsGroupsSections, { legalForm: legalForm, excludeActs: excludeActs, getOnlyActs: getOnlyActs, lang: cnsysConfig.clientLanguage });
    }
}