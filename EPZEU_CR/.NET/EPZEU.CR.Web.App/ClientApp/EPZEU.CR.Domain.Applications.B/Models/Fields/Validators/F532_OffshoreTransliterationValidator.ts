﻿import { RecordValidator } from 'EPZEU.CR.Domain';
import { F532_OffshoreTransliteration } from '../ModelsAutoGenerated';

export class F532_OffshoreTransliterationValidator extends RecordValidator<F532_OffshoreTransliteration> {
    constructor() {
        super();
    }

    public validateInternal(obj: F532_OffshoreTransliteration): boolean {
        let isValid = super.validateInternal(obj);

        return isValid;
    }
}