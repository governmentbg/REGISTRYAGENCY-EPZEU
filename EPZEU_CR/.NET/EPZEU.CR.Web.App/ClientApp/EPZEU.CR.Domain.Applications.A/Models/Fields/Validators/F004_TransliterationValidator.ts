import { F004_Transliteration, RecordValidator } from 'EPZEU.CR.Domain';

export class F004_TransliterationValidator extends RecordValidator<F004_Transliteration> {
    constructor() {
        super();
    }

    public validateInternal(obj: F004_Transliteration): boolean {
        let isValid = super.validateInternal(obj);

        return isValid;
    }
}