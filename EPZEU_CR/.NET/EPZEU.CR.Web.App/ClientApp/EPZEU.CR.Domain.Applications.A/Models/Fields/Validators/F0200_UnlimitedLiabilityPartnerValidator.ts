﻿import { RecordValidator, SimpleAddressValidator, SubjectFLEBaseValidator, ValidatorHelpers } from 'EPZEU.CR.Domain';
import { F0200_UnlimitedLiabilityPartner } from '../ModelsAutoGenerated';

export class F0200_UnlimitedLiabilityPartnerValidator extends RecordValidator<F0200_UnlimitedLiabilityPartner> {
    constructor() {
        super();

        this.ruleFor(m => m.subject).setValidator(new SubjectFLEBaseValidator());
        this.ruleFor(m => m.address).setValidator(new SimpleAddressValidator());
    }

    public validateInternal(obj: F0200_UnlimitedLiabilityPartner): boolean {

        let isValid = super.validateInternal(obj);                

        if (ValidatorHelpers.areAllFieldsEmpty(obj.subject.name, obj.subject.indent, obj.subject.isForeignTrader)) {
            ////Попълнете име и идентификатор. Ако юридическото лице е чуждестранно, попълнете наименование и маркирайте "Чуждестранно юридическо лице".
            obj.subject.addError(this.getMessage('CR_APP_00016_Е'));
            isValid = false;
        }

        return isValid;
    }
}