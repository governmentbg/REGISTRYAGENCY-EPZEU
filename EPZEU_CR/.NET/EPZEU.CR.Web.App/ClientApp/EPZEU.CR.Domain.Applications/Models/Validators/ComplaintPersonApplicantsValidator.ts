﻿import { ErrorLevels, ObjectHelper } from 'Cnsys.Core';
import { EPZEUBaseValidator } from 'EPZEU.Core';
import { DomainModelHepler, IApplicationFormValidationContext, IndentTypes, IndentValidationMode, Person, SimpleAddressValidator, ValidatorHelpers } from 'EPZEU.CR.Domain';
import { ComplaintPerson, ComplaintPersons } from '../ModelsAutoGenerated';

export class ComplaintPersonApplicantsValidator extends EPZEUBaseValidator<ComplaintPersons, IApplicationFormValidationContext> {

    constructor() {
        super();

        this.ruleFor(m => m.complaintPersonsList).setCollectionValidator(new ComplaintPersonApplicantValidator());
    }

    public validate(obj: ComplaintPersons): boolean {

        let isValid = true;
        let isBaseValid = super.validate(obj);

        if (obj.complaintPersonsList.length > 1) {
            for (var i = 0; i < obj.complaintPersonsList.length; i++) {

                if (DomainModelHepler.isObjectEmpty(obj.complaintPersonsList[i])) {
                    obj.complaintPersonsList[i].clearErrors(true);
                    obj.complaintPersonsList[i].addError(this.getMessage('CR_APP_00063_E'), ErrorLevels.Error);
                    isValid = false;
                }
            }
        }

        isValid = isValid && isBaseValid;

        return isValid;
    }
}

class ComplaintPersonApplicantValidator extends EPZEUBaseValidator<ComplaintPerson, IApplicationFormValidationContext> {

    constructor() {
        super();

        this.ruleFor(m => m.person).setValidator(new ComplaintPersonValidator());
    }

    public validate(obj: ComplaintPerson): boolean {

        let isValid = super.validate(obj);

        obj.person.setAllErrorsLevel(ErrorLevels.Error);

        if (ObjectHelper.isStringNullOrEmpty(obj.person.name)) {
            //Грешката се визуализира при невъведено име на физическо лице 
            obj.person.addError('name', this.getMessage('GL_INPUT_PERSON_NAME_E'), ErrorLevels.Error);
            isValid = false;
        }

        if (ObjectHelper.isStringNullOrEmpty(obj.person.indent)) {
            //Грешката трябва да се визуализира при непопълнена стойност в полето ЕГН/ЛНЧ/Дата на раждане            
            obj.person.addError('indent', this.getMessage('GL_INPUT_PERSON_ID_BIRTHDATE_E'), ErrorLevels.Error);
            isValid = false;
        }

        let idType = DomainModelHepler.getIdentType(obj.person.indent);

        obj.address.clearErrors();
        if (idType == IndentTypes.BirthDate) {

            if (ObjectHelper.isStringNullOrEmpty(obj.birthPlace) || ObjectHelper.isStringNullOrEmpty(obj.birthCountry)) {
                obj.addError(this.getMessage('GL_INPUT_BIRTHPLACE_E'), ErrorLevels.Error);

                isValid = false;
            } else {
                let isValidAddress = new SimpleAddressValidator();
                isValidAddress.setValidationContext(this.getValidationContext());

                if (!isValidAddress.validate(obj.address, true)) {
                    obj.address.addError(this.getMessage('GL_ADDRESS_ERROR_E'), ErrorLevels.Error);

                    isValid = false;
                }
            }
        }

        return isValid;
    }
}

class ComplaintPersonValidator extends EPZEUBaseValidator<Person, IApplicationFormValidationContext> {

    constructor() {
        super();

        this.ruleFor(m => m.indent).matches('^[0-9]{6,10}$').withMessage(this.getMessage('GL_INVALID_IDENTIFIER_E')).when(m => !ObjectHelper.isStringNullOrEmpty(m.indent) && !m.isForeignTrader); //допускат се само цифри. 
        this.ruleFor(m => m.name).matches('^[А-Яа-яA-Za-z-\' ]+$').withMessage(this.getMessage('GL_INPUT_CORRECT_NAME_E'));
    }

    public validate(obj: Person): boolean {

        let isValid = super.validate(obj);
        let idType = DomainModelHepler.getIdentType(obj.indent);
        obj.clearErrors(true);

        if (!ObjectHelper.isStringNullOrEmpty(obj.indent)) {
            if (idType == IndentTypes.Undefined || !DomainModelHepler.isValidIdentType(IndentValidationMode.EgnLnchBd, idType)) {
                //Грешката се визуализира когато е попълнена невалидна стойност в поле идентификатор (различна от ЕГН/ЛНЧ/Дата на раждане)
                obj.addError('indent', this.getMessage('GL_INVALID_IDENTIFIER_E'))
                isValid = false;
            }
        }

        // Грешката се визуализира когато въведеното име на физическо лице не отговаря на Валидация за попълване на име на физическо лице
        if (!ValidatorHelpers.isValidPersonName(obj.name)) {
            obj.addError('name', this.getMessage('GL_INPUT_CORRECT_NAME_E'));
            isValid = false;
        }

        return isValid;
    }
}