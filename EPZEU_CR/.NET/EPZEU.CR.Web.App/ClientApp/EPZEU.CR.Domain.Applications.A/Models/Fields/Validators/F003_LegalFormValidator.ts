import { ApplicationFormTypes, LegalForms } from 'EPZEU.CR.Core';
import { F003_LegalForm, RecordValidator } from 'EPZEU.CR.Domain';

export class F003_LegalFormValidator extends RecordValidator<F003_LegalForm> {
    constructor() {
        super();
    }

    public validateInternal(obj: F003_LegalForm): boolean {
        let isValid = super.validateInternal(obj);
        
        if (this.validationContext.appType == ApplicationFormTypes.A9) {
            //Полето е задължително за попълване за заявление А9
            if (+obj.code != LegalForms.TPPD && +obj.code != LegalForms.TPPO) {

                obj.addError(this.getMessage('GL_INPUT_FIELD_MUST_E'));
                return false
            }

        }         
        else if (this.validationContext.appType == ApplicationFormTypes.A13) {
            // За заявление А13 трябва да бъде избрано едно от двете опции:
            // - Eвропейско кооперативно дружество 
            // - Eвропейско кооперативно дружество с ограничена отговорност 
            if (+obj.code != LegalForms.EKD && +obj.code != LegalForms.LEKD) {

                obj.addError(this.getMessage('GL_INPUT_FIELD_MUST_E'));
                return false
            }
        }

        return isValid;
    }
}