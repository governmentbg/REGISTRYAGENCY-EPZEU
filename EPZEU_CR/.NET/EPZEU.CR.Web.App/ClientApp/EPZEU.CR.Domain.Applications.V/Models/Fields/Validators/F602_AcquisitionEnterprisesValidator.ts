﻿import { EPZEUBaseValidator } from 'EPZEU.Core';
import { IApplicationFormValidationContext } from 'EPZEU.CR.Domain';
import { F602_AcquisitionEnterprises } from '../ModelsAutoGenerated';
import { F6020_AcquisitionEnterpriseValidator } from './F6020_AcquisitionEnterpriseValidator ';

export class F602_AcquisitionEnterprisesValidator extends EPZEUBaseValidator<F602_AcquisitionEnterprises, IApplicationFormValidationContext> {
    constructor() {
        super();

        this.ruleFor(m => m.acquisitionEnterpriseList).setCollectionValidator(new F6020_AcquisitionEnterpriseValidator());
    }

    public validate(obj: F602_AcquisitionEnterprises): boolean {
        let isValid = super.validate(obj);

        for (var i = 0; i < obj.acquisitionEnterpriseList.length; i++) {
            let company = obj.acquisitionEnterpriseList[i];
            if (this.validationContext.isRecordEmpty(company) && obj.acquisitionEnterpriseList.length > 1) {
                company.clearErrors();
                company.addError('subject', this.getMessage('CR_APP_00063_E')); //Попълнете данните за полето или го изтрийте.
                isValid = false;
            }
        }

        return isValid;
    }
}