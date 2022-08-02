﻿import { EPZEUBaseValidator } from 'EPZEU.Core';
import { IApplicationFormValidationContext, ValidatorHelpers } from 'EPZEU.CR.Domain';
import { F053_BranchManagers } from '../ModelsAutoGenerated';
import { F053_BranchManagerValidator } from './F0530_BranchManagerValidator';

export class F053_BranchManagersValidator extends EPZEUBaseValidator<F053_BranchManagers, IApplicationFormValidationContext> {
    constructor() {
        super();

        this.ruleFor(m => m.managersList).setCollectionValidator(new F053_BranchManagerValidator());
    }

    public validate(obj: F053_BranchManagers): boolean {
        let isValid = super.validate(obj);

        if (obj.managersList.length > 1) {
            for (var i = 0; i < obj.managersList.length; i++) {

                if (this.validationContext.isRecordEmpty(obj.managersList[i])) {
                    obj.managersList[i].person.clearErrors();
                    obj.managersList[i].addError(this.getMessage('CR_APP_00063_E'));

                    isValid = false;
                }
            }
            //Грешката се визуалзира при добавяне на второ и следващо лице със същия идентификатор като на вече добавено лице
            if (ValidatorHelpers.isExistDublicateIndents(obj.managersList, true, "CR_APP_00125_E"))
                isValid = false;
        }

        return isValid;
    }
}