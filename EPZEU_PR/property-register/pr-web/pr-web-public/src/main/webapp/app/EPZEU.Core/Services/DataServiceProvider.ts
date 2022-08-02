import { IRequestLimiterContext } from './IRequestLimiterContext';
import { EPZEUBaseDataService } from './EPZEUBaseDataService';

var dataServicesConstructors: any[] = [];

export function bootstrapperModuleDataServices(constructors: any[]) {
    dataServicesConstructors.push(...constructors);
}

export class DataServiceProvider {
    _limiterContext: IRequestLimiterContext;
    dataServices: { cntr: any, instance: EPZEUBaseDataService }[] = [];

    constructor(limiterContext: IRequestLimiterContext) {
        this._limiterContext = limiterContext;
    }

    getDataService<TService extends EPZEUBaseDataService>(constructor: any): TService {
        var services = this.dataServices.filter(ds => ds.cntr == constructor);

        if (services && services.length > 0) {
            return (services[0].instance as TService);
        }

        var service: TService = new constructor(this._limiterContext);

        this.dataServices.push({ cntr: constructor, instance: service });

        return service;
    }
}

export interface IDataServiceProviderProps {
    dataSrvProvider: DataServiceProvider;
}