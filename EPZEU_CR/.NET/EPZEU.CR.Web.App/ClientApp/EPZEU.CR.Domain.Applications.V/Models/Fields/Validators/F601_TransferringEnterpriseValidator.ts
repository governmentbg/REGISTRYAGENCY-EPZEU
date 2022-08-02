﻿import { RecordValidator } from 'EPZEU.CR.Domain';
import { F601_TransferringEnterprise } from '../ModelsAutoGenerated';
import { CompanyWithBGNameValidator } from './CompanyWithBGNameValidator';

export class F601_TransferringEnterpriseValidator extends RecordValidator<F601_TransferringEnterprise> {
    constructor() {
        super();

        this.ruleFor(m => m.subject).setValidator(new CompanyWithBGNameValidator());
    }

    public validateInternal(obj: F601_TransferringEnterprise): boolean {
        let isValid = super.validateInternal(obj);

        if (!(obj.subject.name && obj.subject.indent)) {
            isValid = false;
            obj.addError('subject', this.getMessage('CR_APP_00027_E')); // Полетата ЕИК и фирма за задължителни.
        }

        return isValid;
    }
}