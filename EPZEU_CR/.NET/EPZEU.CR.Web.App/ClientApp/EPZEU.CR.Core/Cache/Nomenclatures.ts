import { ArrayHelper, ItemCacheBase } from "Cnsys.Core";
import { FieldsGroupsSectionsCache } from "./FieldsGroupsSectionsCache";
import { FieldsGroupsSections } from "../Models/FieldsGroupsSections";

let fieldsGroupsSectionsCache: FieldsGroupsSectionsCache = new FieldsGroupsSectionsCache();

export namespace Nomenclatures {

    export function getFieldsGroupsSections(legalForm?: number, excludeActs?: boolean, getOnlyActs?: boolean): Promise<FieldsGroupsSections> {
        let excludeActsValue = excludeActs ? true : false;
        let getOnlyActsValue = getOnlyActs ? true : false;

        return fieldsGroupsSectionsCache.getItem(JSON.stringify({ legalForm, excludeActs: excludeActsValue, getOnlyActs: getOnlyActsValue}))
    }
}

function getCollectionItems<TItem>(cache: ItemCacheBase<TItem[]>, predicate?: (elem: TItem) => boolean, key?: string): Promise<TItem[]> {
    if (predicate) {
        return cache.getItem(key).then(items => {
            return ArrayHelper.queryable.from(items).where(predicate).toArray();
        });
    }
    else {
        return cache.getItem(key);
    }
}