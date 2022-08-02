import { Page } from "../Models/Page";
import { StaticPage } from "../Models/StaticPage";
import { getCollectionItems } from "./Nomenclatures";
import { PagesCache } from "./PageCache";
import { StaticPageCache } from "./StaticPageCache";

let pagesCache: PagesCache = new PagesCache();
let staticPagesCache: StaticPageCache = new StaticPageCache();

export namespace CMS {

    export function getPages(predicate?: (elem: Page) => boolean): Promise<Page[]> {
        return getCollectionItems(pagesCache, predicate);
    }

    export function getStaticPages(predicate?: (elem: StaticPage) => boolean): Promise<StaticPage[]> {
        return getCollectionItems(staticPagesCache, predicate);
    }
}