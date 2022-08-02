import { ArrayHelper, ItemCacheBase } from 'Cnsys.Core';
import { appConfig } from "../Common/ApplicationConfig";
import { Page, PageTypes } from "../Models";
import { CMSDataService } from '../Services/CMSDataService';
import { Nomenclatures } from './';

export class PagesCache extends ItemCacheBase<Page[]> {

    protected generateValue(key: string): Promise<Page[]> {
        var cMSDataService = new CMSDataService();

        return cMSDataService.getPages(appConfig.clientLanguage ? appConfig.clientLanguage : '', null).then(async pages => {

            await Nomenclatures.getServices(srv => true).bind(this).then(async services => {

                await Nomenclatures.getApplicationTypes(intSrv => true).bind(this)
                    .then(applicationTypes => {

                        pages.forEach((page: Page, index: number) => {
                            if (page.type == PageTypes.Service && page.serviceID != null) {
                                pages[index].service = ArrayHelper.queryable.from(services).singleOrDefault(m => m.serviceID == page.serviceID);

                            } else if (page.type == PageTypes.Application && page.applicationID != null) {
                                pages[index].applicationType = ArrayHelper.queryable.from(applicationTypes).singleOrDefault(m => m.applicationTypeID == page.applicationID);
                            }
                        })
                    })
            })

            return pages;
        });
    }
}