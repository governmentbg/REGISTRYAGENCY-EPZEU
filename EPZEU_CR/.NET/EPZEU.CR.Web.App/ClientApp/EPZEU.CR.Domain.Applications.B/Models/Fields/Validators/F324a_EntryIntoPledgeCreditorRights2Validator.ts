﻿import { EPZEUBaseValidator } from 'EPZEU.Core';
import { IApplicationFormValidationContext, IndentTypes, RecordOperations, RecordValidator, SimpleAddressValidator, SubjectBaseValidator, ValidatorHelpers } from 'EPZEU.CR.Domain';
import { F32410_EntryIntoPledgeCreditorRight2, F324a_EntryIntoPledgeCreditorRights2 } from '../ModelsAutoGenerated';

export class F32410_EntryIntoPledgeCreditorRight2Validator extends RecordValidator<F32410_EntryIntoPledgeCreditorRight2> {

    constructor() {
        super();

        this.ruleFor(m => m.subject).setValidator(new SubjectBaseValidator());
    }

    public validateInternal(obj: F32410_EntryIntoPledgeCreditorRight2): boolean {
        let isValid = super.validateInternal(obj);

        obj.address.clearErrors(true);

        if ((obj.subject.indentType == IndentTypes.EGN || obj.subject.indentType == IndentTypes.LNCH || obj.subject.indentType == IndentTypes.BirthDate)) {

            let isValidAddress = new SimpleAddressValidator();
            isValidAddress.setValidationContext(this.getValidationContext());

            if (!isValidAddress.validate(obj.address))
                isValid = false;
        }

        return isValid;
    }
}

export class F324a_EntryIntoPledgeCreditorRights2Validator extends EPZEUBaseValidator<F324a_EntryIntoPledgeCreditorRights2, IApplicationFormValidationContext> {

    constructor() {
        super();

        this.ruleFor(m => m.entryIntoPledgeCreditorRight2List).setCollectionValidator(new F32410_EntryIntoPledgeCreditorRight2Validator());
    }

    public validate(obj: F324a_EntryIntoPledgeCreditorRights2): boolean {
        let isValid = super.validate(obj);

        if (obj.entryIntoPledgeCreditorRight2List.length > 1) {
            for (var i = 0; i < obj.entryIntoPledgeCreditorRight2List.length; i++) {
                if (this.validationContext.isRecordEmpty(obj.entryIntoPledgeCreditorRight2List[i]) && obj.entryIntoPledgeCreditorRight2List[i].recordOperation != RecordOperations.Erase) {

                    obj.entryIntoPledgeCreditorRight2List[i].subject.clearErrors();
                    obj.entryIntoPledgeCreditorRight2List[i].address.clearErrors();
                    obj.entryIntoPledgeCreditorRight2List[i].addError(this.getMessage('CR_APP_00063_E'));// Попълнете данните за полето или го изтрийте.

                    isValid = false;
                }
            }

            //Грешката се визуалзира при добавяне на второ и следващо лице със същия идентификатор като на вече добавено лице
            if (ValidatorHelpers.isExistDublicateIndents(obj.entryIntoPledgeCreditorRight2List, false, "CR_APP_00133_E")) // Има друг залогодател със същия идентификатор (ЕГН/ЛНЧ/ЕИК/БУЛСТАТ).
                isValid = false;
        }

        return isValid;
    }
}