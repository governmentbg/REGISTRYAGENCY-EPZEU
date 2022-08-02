﻿import { ObjectHelper } from 'Cnsys.Core';
import { EPZEUBaseValidator } from 'EPZEU.Core';
import { IApplicationFormValidationContext } from 'EPZEU.CR.Domain';
import { F8040_ReorgBranch, F804_ReorgBranches } from '../ModelsAutoGenerated';
import { F8040_ReorgBranchesValidator } from './F8040_ReorgBranchesValidator';

export class F804_ReorgBranchesValidator extends EPZEUBaseValidator<F804_ReorgBranches, IApplicationFormValidationContext> {
    constructor() {
        super();

        this.ruleFor(m => m.branchList).setCollectionValidator(new F8040_ReorgBranchesValidator());
    }

    public validate(obj: F804_ReorgBranches): boolean {
        let isValid = super.validate(obj);
        var branchesCodes: string[] = [];

        for (var i = 0; i < obj.branchList.length; i++) {
            let record = obj.branchList[i];

            if (this.isBranchItemEmpty(record) && (obj.branchList.length > 1)) {
                record.clearErrors();
                record.addError(this.getMessage('CR_APP_00063_E')); //Попълнете данните за полето или го изтрийте.
                isValid = false;
            } else {

                for (var currentBranch of obj.branchList[i].branches) {

                    if ((ObjectHelper.isStringNullOrEmpty(currentBranch.branchCode)) || (branchesCodes.filter(x => x == currentBranch.branchCode).length == 0))
                        branchesCodes.push(currentBranch.branchCode)
                    else {
                        currentBranch.addError(this.getMessage("CR_APP_00148_E")); // Този клон вече е посочен.
                        isValid = false;
                    }
                }
            }
        }

        return isValid;
    }

    private isBranchItemEmpty(branchItem: F8040_ReorgBranch) {

        if (branchItem.branchSubject.name || branchItem.branchSubject.indent)
            return false;

        for (var i = 0; i < branchItem.branches.length; i++) {
            if (!ObjectHelper.isStringNullOrEmpty(branchItem.branches[i].branchCode) ||
                !ObjectHelper.isStringNullOrEmpty(branchItem.branches[i].firmName)) {
                return false;
            }
        }

        return true;
    }
}