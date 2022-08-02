import { BaseModuleInitializaitonContext } from 'Cnsys.Core'
import { moduleContext } from './ModuleContext'
import { Country, Nomenclatures, bootstrapperModuleDataServices } from 'EPZEU.Core';
import { DeedsDataService, BulstatsDataService } from './Services';

export function registerModule(initContext: BaseModuleInitializaitonContext): Promise<void> {
    moduleContext.initializeContext(initContext);

    bootstrapperModuleDataServices([DeedsDataService, BulstatsDataService]);

    return initBgCountry();
}

export var bgCountry: Country;

async function initBgCountry(): Promise<void> {
    bgCountry = await Nomenclatures.getBGCountry();
}