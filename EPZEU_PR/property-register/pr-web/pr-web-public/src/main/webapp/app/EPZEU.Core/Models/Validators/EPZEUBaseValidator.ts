﻿import { BaseValidator, IModelErrors, ClientError, ItemCacheBase } from 'Cnsys.Core';
import { moduleContext } from '../../ModuleContext'

export class EPZEUBaseValidator<TModel extends IModelErrors, TValidationContext> extends BaseValidator<TModel, TValidationContext> {

    public getMessage(messageKey: string): string {
        return moduleContext.resourceManager.getResourceByKey(messageKey);
    }

    public getCacheItems<TItem>(cache: ItemCacheBase<TItem>, itemKey?: string): TItem {
        var itemsPromise = cache.getItem(itemKey);

        if (itemsPromise.isPending()) {
            throw new ClientError("Nomenclature is not loaded.")
        }
        else {
            return itemsPromise.value();
        }
    }
}