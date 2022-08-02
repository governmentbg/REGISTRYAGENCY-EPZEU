import { ItemCacheBase } from 'Cnsys.Core'
import { NomenclaturesDataService } from '../Services/NomenclaturesDataService'
import { ApplicationType } from "../Models"
import { appConfig } from "../Common/ApplicationConfig"

export class ApplicationTypesCache extends ItemCacheBase<ApplicationType[]> {

    protected generateValue(key: string): Promise<ApplicationType[]> {
        var applicationTypeDataService = new NomenclaturesDataService();

        return applicationTypeDataService.getApplicationTypes();
    }
}