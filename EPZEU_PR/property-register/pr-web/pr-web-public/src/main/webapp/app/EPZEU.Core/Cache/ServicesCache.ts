import { ArrayHelper, ItemCacheBase } from 'Cnsys.Core';
import { Registers, Service } from "../Models";
import { NomenclaturesDataService } from '../Services/NomenclaturesDataService';
import { Nomenclatures } from './';

export class ServicesCache extends ItemCacheBase<Service[]> {

    protected generateValue(key: string): Promise<Service[]> {
        var servicesDataService = new NomenclaturesDataService();

        return servicesDataService.getServices(Registers.CR).then(async (services) => {

            await Nomenclatures.getApplicationTypes(appl => true).bind(this)
                .then(applicationTypes => {

                    services.forEach((service: Service, index: number) => {
                        if (service.appTypeID != undefined && service.appTypeID != null) {
                            services[index].applicationType = ArrayHelper.queryable.from(applicationTypes).singleOrDefault(m => m.applicationTypeID == service.appTypeID);
                        }
                    })
                })

            return services
        });
    }
}