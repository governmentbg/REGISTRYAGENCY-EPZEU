﻿import { ObjectHelper } from 'Cnsys.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { RecordOperations, RecordValidator } from 'EPZEU.CR.Domain';
import { F006b_Objectives } from '../ModelsAutoGenerated';

export class F006b_ObjectivesValidator extends RecordValidator<F006b_Objectives> {
    constructor() {
        super();

        var that = this;
        //Полето е задължително за попълване в заявления А15 и А16
        this.ruleFor(m => m.text).must(m => {
            if (ObjectHelper.isStringNullOrEmpty(m.text)
                && m.recordOperation != RecordOperations.Erase
                && (that.validationContext.appType == ApplicationFormTypes.A15 ||
                    that.validationContext.appType == ApplicationFormTypes.A16)) {
                return false;
            }

            return true;
        }).withMessage(this.getMessage('GL_INPUT_FIELD_MUST_E'));

    }

    public validateInternal(obj: F006b_Objectives): boolean {
        let isValid = super.validateInternal(obj);

        if (this.validationContext.appType == ApplicationFormTypes.A18) {
            //Полето е задължително за попълване в заявления А18, тъй като е съставно, трябва да бъде попълнена поне една от двете стойности на полето.
            if (ObjectHelper.isStringNullOrEmpty(obj.text)
                && ObjectHelper.isStringNullOrEmpty(obj.textExt)
                && obj.recordOperation != RecordOperations.Erase) {
                obj.addError(this.getMessage('GL_INPUT_FIELD_MUST_E'));

                return false;
            }
        }

        return isValid;
    }
}