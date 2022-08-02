import { ItemCacheBase } from 'Cnsys.Core';
import { Registers, StaticPage, Modules } from "../Models";
import { CMSDataService } from '../Services/CMSDataService';

export class StaticPageCache extends ItemCacheBase<StaticPage[]> {

    protected generateValue(key: string): Promise<StaticPage[]> {
        var cMSDataService = new CMSDataService();
        return cMSDataService.getStaticPages(Modules.EPZEU);
    }
}