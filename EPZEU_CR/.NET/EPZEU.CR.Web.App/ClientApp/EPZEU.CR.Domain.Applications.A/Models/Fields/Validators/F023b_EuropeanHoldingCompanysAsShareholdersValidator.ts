﻿import { ObjectHelper } from 'Cnsys.Core';
import { EPZEUBaseValidator } from 'EPZEU.Core';
import { DomainModelHepler, IApplicationFormValidationContext, IndentValidationMode, RecordOperations, RecordValidator, SimpleAddressValidator, ValidatorHelpers } from 'EPZEU.CR.Domain';
import { F02320_EuropeanHoldingCompanyAsShareholder, F023b_EuropeanHoldingCompanysAsShareholders } from '../ModelsAutoGenerated';

export class F02320_EuropeanHoldingCompanyAsShareholderValidator extends RecordValidator<F02320_EuropeanHoldingCompanyAsShareholder> {

    constructor() {
        super();
    }

    public validateInternal(obj: F02320_EuropeanHoldingCompanyAsShareholder): boolean {
        obj.clearErrors(true);
        let isValid = super.validateInternal(obj);

        if (!this.validationContext.isRecordEmpty(obj)) {

            if (ValidatorHelpers.isNameOrIndentRequired(obj.subject.name, obj.subject.indent, obj.subject.isForeignTrader)) {

                obj.addError(this.getMessage('CR_APP_00016_Е')); //Попълнете име и идентификатор. Ако юридическото лице е чуждестранно, попълнете наименование и маркирайте "Чуждестранно юридическо лице".

                isValid = false;
            }

            if (!ObjectHelper.isStringNullOrEmpty(obj.subject.indent) && !DomainModelHepler.isValidIdentType(IndentValidationMode.UIC, obj.subject.indentType)) {
                obj.subject.clearErrors();
                obj.subject.addError('indent', this.getMessage('GL_INVALID_IDENTIFIER_E')); //Невалиден идентификатор.
                isValid = false;
            }

            if (obj.subject.isForeignTrader) {

                if (ObjectHelper.isStringNullOrEmpty(obj.subject.competentAuthorityForRegistration) || ObjectHelper.isStringNullOrEmpty(obj.subject.registrationNumber)) {
                    obj.addError(this.getMessage('CR_APP_00059_E')); //Попълнете компетентен орган по регистрацията, номер на регистрацията и адрес по предходната регистрация.
                    isValid = false;
                }

                let isValidAddress = new SimpleAddressValidator();
                isValidAddress.setValidationContext(this.getValidationContext());

                if (!isValidAddress.validate(obj.address, true)) {
                    obj.address.addError(this.getMessage('CR_APP_00005_E'));
                    isValid = false;
                }
            }
        }

        return isValid;
    }
}

export class F023b_EuropeanHoldingCompanysAsShareholdersValidator extends EPZEUBaseValidator<F023b_EuropeanHoldingCompanysAsShareholders, IApplicationFormValidationContext> {
    constructor() {
        super();

        this.ruleFor(m => m.europeanHoldingCompanyAsShareholderList).setCollectionValidator(new F02320_EuropeanHoldingCompanyAsShareholderValidator());
    }

    public validate(obj: F023b_EuropeanHoldingCompanysAsShareholders): boolean {
        let isValid = super.validate(obj);

        if (obj.europeanHoldingCompanyAsShareholderList.length > 1) {
            for (var i = 0; i < obj.europeanHoldingCompanyAsShareholderList.length; i++) {

                if (ValidatorHelpers.isEmptyBasePerson(obj.europeanHoldingCompanyAsShareholderList[i].subject.name,
                    obj.europeanHoldingCompanyAsShareholderList[i].subject.indent,
                    obj.europeanHoldingCompanyAsShareholderList[i].subject.countryID,
                    obj.europeanHoldingCompanyAsShareholderList[i].subject.isForeignTrader)
                    && obj.europeanHoldingCompanyAsShareholderList[i].recordOperation != RecordOperations.Erase) {

                    obj.europeanHoldingCompanyAsShareholderList[i].addError(this.getMessage('CR_APP_00063_E'));// Попълнете данните за полето или го изтрийте.

                    isValid = false;
                }
            }
        }

        return isValid;
    }
}