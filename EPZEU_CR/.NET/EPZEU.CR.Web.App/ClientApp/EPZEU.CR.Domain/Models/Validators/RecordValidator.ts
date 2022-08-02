﻿import { ErrorLevels } from 'Cnsys.Core';
import { EPZEUBaseValidator } from 'EPZEU.Core';
import { ProcessStates, Record, RecordOperations } from '../ModelsAutoGenerated';
import { IApplicationFormValidationContext } from './ApplicationFormValidationContext';

export class RecordValidator<TRecord extends Record> extends EPZEUBaseValidator<TRecord, IApplicationFormValidationContext> {
    constructor() {
        super();
    }

    public validate(obj: TRecord): boolean {

        let valCtx = this.getValidationContext();

        //ако полето е маркирано за изтриване но изтриването му не в позволено
        if (obj.recordOperation == RecordOperations.Erase && !(!valCtx.isRecordNew(obj) && !valCtx.isRecordEmpty(obj) && !valCtx.isRecordDirty(obj))) {
            obj.clearErrors(true);
            obj.addError(this.getMessage('CR_APP_00045_E'), ErrorLevels.Error);
            return false;
        }

        if (valCtx.processStates == ProcessStates.ForChange && (obj.recordOperation == RecordOperations.Current || obj.recordOperation == RecordOperations.Erase)) {
            //Ако заявлението е за промяна на обстоятелства и рекард операцията е Current - не се валидира.

            obj.clearErrors(true);
            return true;
        }

        //ако полето не е ново и е празно не може да бъде записано
        if (!valCtx.isRecordNew(obj) && valCtx.isRecordEmpty(obj)) {
            obj.clearErrors(true);
            obj.addError(this.getMessage('CR_APP_00021_E'), ErrorLevels.Error);
            return false;
        }

        return this.validateInternal(obj);
    }

    protected validateInternal(obj: TRecord): boolean {

        let isValid = super.validate(obj);

        return isValid;
    }
}