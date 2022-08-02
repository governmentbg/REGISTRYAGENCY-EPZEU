﻿import { ObjectHelper } from 'Cnsys.Core';
import { RecordValidator } from 'EPZEU.CR.Domain';
import { F802a0_CoOperative2 } from '../ModelsAutoGenerated';
import { F7020aF8020aCompanyValidator } from './F7020aF8020aCompanyValidator';

export class F8020a_ReorganizeCoOperativeValidator extends RecordValidator<F802a0_CoOperative2> {
    constructor() {
        super();

        this.ruleFor(m => m.subject).setValidator(new F7020aF8020aCompanyValidator());
    }

    public validateInternal(obj: F802a0_CoOperative2): boolean {
        let isValid = super.validateInternal(obj);

        let isOnlyNameOrOnlyIndentFilled = ((obj.subject.indent && !obj.subject.name) || (!obj.subject.indent && obj.subject.name));
        if (!obj.subject.isForeignTrader && isOnlyNameOrOnlyIndentFilled) {
            obj.addError(this.getMessage('CR_APP_00016_Е')); //Попълнете име и идентификатор. Ако юридическото лице е чуждестранно, попълнете наименование и маркирайте "Чуждестранно юридическо лице"
            isValid = false;
        }

        if (obj.subject.isForeignTrader) {
            // Ако за избраната държава няма намерени регистри или е избран "Друг", въведеният регистър се запаметява в competentAuthorityForRegistration
            // А ако има - в foreignRegister;
            let foreignComRegisters = this.getValidationContext().foreignCommercialRegisters;
            let selectedCountryRegisters = foreignComRegisters.filter(register => obj.subject.countryCodeBRIS == register.countryCode)
            let shouldValidateForeignRegister = selectedCountryRegisters.length != 0;

            if (shouldValidateForeignRegister) {
                if (ObjectHelper.isStringNullOrEmpty(obj.subject.foreignRegister)) {
                    obj.addError(this.getMessage('CR_APP_INPUT_REGISTER_E')); //Попълнете поле регистър.
                    isValid = false;
                }
            } else {
                if (ObjectHelper.isStringNullOrEmpty(obj.subject.competentAuthorityForRegistration)) {
                    obj.addError(this.getMessage('CR_APP_INPUT_REGISTER_E')); //Попълнете поле регистър.
                    isValid = false;
                }
            }

            if (obj.subject.foreignRegisterCode) {
                let isOtherRegisterSelected = foreignComRegisters.filter(foreignComRegister => foreignComRegister.code == obj.subject.foreignRegisterCode)[0].isOther;
                if (isOtherRegisterSelected && ObjectHelper.isStringNullOrEmpty(obj.subject.competentAuthorityForRegistration)) {
                    obj.addError(this.getMessage('CR_APP_INPUT_REGISTER_E')); //Попълнете поле регистър.
                    isValid = false;
                }
            }

            // Ако за избраната държава няма намерени правни форми или е избрана "Друга", въведената правна форма се запазва в legalForm;
            // А ако има - в foreignLegalForm;
            let legalForms = this.getValidationContext().legalForms;
            let selectedCountryLegalForms = legalForms.filter(legalForm => legalForm.code == obj.subject.foreignLegalFormCode)
            let shouldValidateForeignLegalForm = selectedCountryLegalForms.length != 0;

            if (shouldValidateForeignLegalForm) {
                if (ObjectHelper.isStringNullOrEmpty(obj.subject.foreignLegalForm)) {
                    obj.addError(this.getMessage('CR_APP_00032_E')); // Полето "Правна форма" е задължително!
                    isValid = false;
                }
            } else {
                if (ObjectHelper.isStringNullOrEmpty(obj.subject.legalForm)) {
                    obj.addError(this.getMessage('CR_APP_00032_E')); // Полето "Правна форма" е задължително!
                    isValid = false;
                }
            }

            if (obj.subject.foreignLegalFormCode) {
                let isOtherLegalFormSelected = legalForms.filter(legalForm => legalForm.code == obj.subject.foreignLegalFormCode)[0].isOther;
                if (isOtherLegalFormSelected && ObjectHelper.isStringNullOrEmpty(obj.subject.legalForm)) {
                    obj.addError(this.getMessage('CR_APP_00032_E')); // Полето "Правна форма" е задължително!
                    isValid = false;
                }
            }
        }

        return isValid;
    }
}