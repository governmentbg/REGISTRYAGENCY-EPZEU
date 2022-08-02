﻿import { EPZEUBaseValidator } from 'EPZEU.Core';
import { F019_Partners } from '../ModelsAutoGenerated';
import { F0190_PartnerValidator } from './F0190_PartnerValidator'
import { IApplicationFormValidationContext, RecordOperations, ValidatorHelpers } from 'EPZEU.CR.Domain';

export class F019_PartnersValidator extends EPZEUBaseValidator<F019_Partners, IApplicationFormValidationContext> {
    constructor() {
        super();

        //partnersList
        this.ruleFor(m => m.partnersList).setCollectionValidator(new F0190_PartnerValidator());
    }

    public validate(obj: F019_Partners): boolean {
        let isValid = super.validate(obj);

        if (obj.partnersList.length > 1) {

            for (var i = 0; i < obj.partnersList.length; i++) {

                if (ValidatorHelpers.isObjectWithPersonEmpty(obj.partnersList[i], "subject") && obj.partnersList[i].recordOperation != RecordOperations.Erase) {
                    obj.partnersList[i].clearErrors(true);
                    obj.partnersList[i].addError(this.getMessage('CR_APP_00063_E'));
                    isValid = false;
                }
            }

            //Грешката се визуалзира при добавяне на второ и следващо лице със същия идентификатор като на вече добавено лице
            if (ValidatorHelpers.isExistDublicateIndents(obj.partnersList, false, "CR_APP_00106_E")) // 
                isValid = false;   
        }                    

        return isValid;
    }
}