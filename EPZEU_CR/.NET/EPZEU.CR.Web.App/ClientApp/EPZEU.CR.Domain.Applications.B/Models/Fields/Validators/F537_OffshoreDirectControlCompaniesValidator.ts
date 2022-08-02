﻿import { EPZEUBaseValidator } from 'EPZEU.Core';
import { ContactsAddressValidator, IApplicationFormValidationContext, RecordValidator, SimpleAddressValidator } from 'EPZEU.CR.Domain';
import { F53702_OffshoreDirectControlCompanyLegalForm, F53703_OffshoreDirectControlCompanyTransliteration, F53704_OffshoreDirectControlCompanyNumberInRegister, F53705_OffshoreDirectControlCompanyAddress, F53707_OffshoreDirectControlCompanyWayOfRepresentation, F5370_OffshoreDirectControlCompany, F537_OffshoreDirectControlCompanies } from '../ModelsAutoGenerated';
import { ObjectHelper } from 'Cnsys.Core';

export class F537_OffshoreDirectControlCompaniesValidator extends EPZEUBaseValidator<F537_OffshoreDirectControlCompanies, IApplicationFormValidationContext> {
    constructor() {
        super();

        this.ruleFor(m => m.offshoreDirectControlCompany).setValidator(new F5370_OffshoreDirectControlCompanyValidator());
        this.ruleFor(m => m.offshoreDirectControlCompanyLegalForm).setValidator(new F53702_OffshoreDirectControlCompanyLegalFormValidator());
        this.ruleFor(m => m.offshoreDirectControlCompanyTransliteration).setValidator(new F53703_OffshoreDirectControlCompanyTransliterationValidator());
        this.ruleFor(m => m.offshoreDirectControlCompanyNumberInRegister).setValidator(new F53704_OffshoreDirectControlCompanyNumberInRegisterValidator());
        this.ruleFor(m => m.offshoreDirectControlCompanyAddress).setValidator(new F53705_OffshoreDirectControlCompanyAddressValidator());
        this.ruleFor(m => m.offshoreDirectControlCompanyWayOfRepresentation).setValidator(new F53707_OffshoreDirectControlCompanyWayOfRepresentationValidator());
    }

    public validate(obj: F537_OffshoreDirectControlCompanies): boolean {
        let isValid = super.validate(obj);


        return isValid;
    }
}

class F5370_OffshoreDirectControlCompanyValidator extends RecordValidator<F5370_OffshoreDirectControlCompany> {
    constructor() {
        super();
    }

    public validateInternal(obj: F5370_OffshoreDirectControlCompany): boolean {
        let isValid = super.validateInternal(obj);

        return isValid;
    }
}

class F53702_OffshoreDirectControlCompanyLegalFormValidator extends RecordValidator<F53702_OffshoreDirectControlCompanyLegalForm> {
    constructor() {
        super();
    }

    public validateInternal(obj: F53702_OffshoreDirectControlCompanyLegalForm): boolean {
        let isValid = super.validateInternal(obj);

        return isValid;
    }
}

class F53703_OffshoreDirectControlCompanyTransliterationValidator extends RecordValidator<F53703_OffshoreDirectControlCompanyTransliteration> {
    constructor() {
        super();
    }

    public validateInternal(obj: F53703_OffshoreDirectControlCompanyTransliteration): boolean {
        let isValid = super.validateInternal(obj);

        return isValid;
    }
}

class F53704_OffshoreDirectControlCompanyNumberInRegisterValidator extends RecordValidator<F53704_OffshoreDirectControlCompanyNumberInRegister> {
    constructor() {
        super();
    }

    public validateInternal(obj: F53704_OffshoreDirectControlCompanyNumberInRegister): boolean {
        let isValid = super.validateInternal(obj);

        return isValid;
    }
}

class F53705_OffshoreDirectControlCompanyAddressValidator extends RecordValidator<F53705_OffshoreDirectControlCompanyAddress> {
    constructor() {
        super();

        this.ruleFor(m => m.contacts).setValidator(new ContactsAddressValidator());
    }

    public validateInternal(obj: F53705_OffshoreDirectControlCompanyAddress): boolean {
        let isValid = super.validateInternal(obj);

        obj.address.clearErrors();
        if (!this.validationContext.isRecordEmpty(obj)) {

            let isValidAddress = new SimpleAddressValidator();
            isValidAddress.setValidationContext(this.getValidationContext());

            if (!isValidAddress.validate(obj.address))
                isValid = false;
        }

        return isValid;
    }
}

class F53707_OffshoreDirectControlCompanyWayOfRepresentationValidator extends RecordValidator<F53707_OffshoreDirectControlCompanyWayOfRepresentation> {
    constructor() {
        super();

    }

    public validateInternal(obj: F53707_OffshoreDirectControlCompanyWayOfRepresentation): boolean {
        let isValid = super.validateInternal(obj);

        //Когато е избран друг начин на представляване трябва да се попълни описателното поле.
        if (obj.otherWay == true && ObjectHelper.isStringNullOrEmpty(obj.text)) {
            obj.addError('text',this.getMessage('CR_APP_00046_E'));
            isValid = false;
        }

        return isValid;
    }
}