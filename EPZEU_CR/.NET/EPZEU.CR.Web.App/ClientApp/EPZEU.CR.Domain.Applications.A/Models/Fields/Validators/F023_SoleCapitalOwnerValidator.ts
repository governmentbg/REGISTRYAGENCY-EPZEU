﻿import { ObjectHelper } from 'Cnsys.Core';
import { ProcessStates, RecordValidator, SubjectFLEWithCountyValidator } from 'EPZEU.CR.Domain';
import { F023_SoleCapitalOwner } from '../ModelsAutoGenerated';

export class F023_SoleCapitalOwnerValidator extends RecordValidator<F023_SoleCapitalOwner> {

    constructor() {
        super();

        this.ruleFor(m => m.subject).setValidator(new SubjectFLEWithCountyValidator());
    }

    public validateInternal(obj: F023_SoleCapitalOwner): boolean {      

        let isValid = super.validateInternal(obj);
        let valCtx = this.getValidationContext();

        if (isValid && valCtx.processStates == ProcessStates.ForChange && valCtx.isRecordDirty(obj) 
            && ObjectHelper.isStringNullOrEmpty(obj.subject.name) && ObjectHelper.isStringNullOrEmpty(obj.subject.indent)) {

            isValid = false;
            obj.subject.addError(this.getMessage('CR_APP_00016_Е'))
        }

        return isValid;
    }
}