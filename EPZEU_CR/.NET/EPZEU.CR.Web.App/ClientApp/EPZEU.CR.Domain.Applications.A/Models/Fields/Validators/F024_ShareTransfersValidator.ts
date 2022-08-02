﻿import { EPZEUBaseValidator } from 'EPZEU.Core';
import { bgCountry, DomainModelHepler, IApplicationFormValidationContext, RecordOperations } from 'EPZEU.CR.Domain';
import { Dictionary } from 'typescript-collections';
import { F024_ShareTransfers } from '../ModelsAutoGenerated';
import { F0240_ShareTransferValidator } from './F0240_ShareTransferValidator';

export class F024_ShareTransfersValidator extends EPZEUBaseValidator<F024_ShareTransfers, IApplicationFormValidationContext> {
    constructor() {
        super();

        this.ruleFor(m => m.shareTransfersList).setCollectionValidator(new F0240_ShareTransferValidator());
    }

    public validate(obj: F024_ShareTransfers): boolean {
        let isValid = super.validate(obj);

        var propsDefaultValues = new Dictionary<string, any>();

        propsDefaultValues.setValue("oldOwnerCountryName", bgCountry.name)
        propsDefaultValues.setValue("newOwnerCountryName", bgCountry.name)
        propsDefaultValues.setValue("newOwnerCountryID", bgCountry.id)
        propsDefaultValues.setValue("oldOwnerCountryID", bgCountry.id)

        if (obj.shareTransfersList.length > 1) {
            for (var i = 0; i < obj.shareTransfersList.length ; i++) {
                if (DomainModelHepler.isObjectEmpty(obj.shareTransfersList[i], propsDefaultValues) &&
                    obj.shareTransfersList[i].recordOperation != RecordOperations.Erase) {
                    obj.shareTransfersList[i].addError(this.getMessage('CR_APP_00063_E'));
                    isValid = false;
                }
            }
        }
               
        return isValid;
    }
}