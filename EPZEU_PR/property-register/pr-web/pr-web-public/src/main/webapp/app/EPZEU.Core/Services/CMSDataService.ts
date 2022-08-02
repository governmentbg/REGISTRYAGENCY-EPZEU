import { BaseDataService } from 'Cnsys.Core';
import { appConfig } from "../Common";
import { Page, Registers, StaticPage, Modules } from "../Models";

export class CMSDataService extends BaseDataService {

    protected baseUrl(): string {
        return appConfig.epzeuApiRoot + "cms";
    }

    public getPages(lang?: string, register?: Registers): Promise<Page[]> {
        return this.get<Page[]>(lang ? `Pages/${lang}` : "Pages", Page, { register: register });
    }

    public getStaticPages(module?: Modules): Promise<StaticPage[]> {
        return this.get<StaticPage[]>("StaticPages", StaticPage, { module: module });
    }
}