﻿import { ObjectHelper } from 'Cnsys.Core';
import { EPZEUBaseValidator } from 'EPZEU.Core';
import { IApplicationFormValidationContext, IndentTypes, PersonWithCountyValidator, RecordOperations, RecordValidator, SubjectFLEWithCountyValidator, ValidatorHelpers } from 'EPZEU.CR.Domain';
import { F5340_OffshoreRepresentative, F534_OffshoreRepresentatives } from '../ModelsAutoGenerated';

export class F534_OffshoreRepresentativesValidator extends EPZEUBaseValidator<F534_OffshoreRepresentatives, IApplicationFormValidationContext> {
    constructor() {
        super();

        this.ruleFor(m => m.offshoreRepresentativesList).setCollectionValidator(new F5340_OffshoreRepresentativeValidator());
    }

    public validate(obj: F534_OffshoreRepresentatives): boolean {
        let isValid = super.validate(obj);

        if (obj.offshoreRepresentativesList.length > 1) {

            for (var i = 0; i < obj.offshoreRepresentativesList.length; i++) {

                if ((ValidatorHelpers.isEmptyBasePerson(obj.offshoreRepresentativesList[i].subject.name, obj.offshoreRepresentativesList[i].subject.indent, obj.offshoreRepresentativesList[i].subject.countryID, obj.offshoreRepresentativesList[i].subject.isForeignTrader) &&
                    ValidatorHelpers.isEmptyBasePerson(obj.offshoreRepresentativesList[i].person.name, obj.offshoreRepresentativesList[i].person.indent, obj.offshoreRepresentativesList[i].person.countryID, obj.offshoreRepresentativesList[i].person.isForeignTrader))
                    && obj.offshoreRepresentativesList[i].recordOperation != RecordOperations.Erase) {
                    obj.offshoreRepresentativesList[i].clearErrors(true);
                    obj.offshoreRepresentativesList[i].addError(this.getMessage('CR_APP_00063_E'));// Попълнете данните за полето или го изтрийте.
                    isValid = false;
                }
            }

            //Грешката се визуалзира при добавяне на второ и следващо лице със същия идентификатор като на вече добавено лице             
            if (ValidatorHelpers.isExistDublicateIndents(obj.offshoreRepresentativesList, false, "CR_APP_00111_E"))
                isValid = false;
        }

        return isValid;
    }
}

export class F5340_OffshoreRepresentativeValidator extends RecordValidator<F5340_OffshoreRepresentative> {
    constructor() {
        super();

        this.ruleFor(m => m.subject).setValidator(new SubjectFLEWithCountyValidator());
    }

    public validateInternal(obj: F5340_OffshoreRepresentative): boolean {

        obj.person.clearErrors(true);

        let isValid = super.validateInternal(obj);

        if (!ValidatorHelpers.isObjectWithPersonEmpty(obj, "subject")) {

            if (obj.subject.isForeignTrader || obj.subject.indentType == IndentTypes.UIC) {

                if (ValidatorHelpers.isEmptyBasePerson(obj.person.name, obj.person.indent, obj.person.countryID, obj.person.isForeignTrader)) {

                    obj.person.addError(this.getMessage('CR_APP_00054_E'));// Попълнете "Представляващ ЮЛ"!
                    isValid = false;
                }
                else {
                    let personValidator = new PersonWithCountyValidator();
                    if (!personValidator.validate(obj.person)) {
                        if (ObjectHelper.isStringNullOrEmpty(obj.person.name) || ObjectHelper.isStringNullOrEmpty(obj.person.indent)) {
                            obj.person.clearErrors();
                            obj.person.addError(this.getMessage('CR_APP_00054_E'));// Попълнете "Представляващ ЮЛ"!  
                        }

                        isValid = false;
                    }
                }
            }
        }

        return isValid;
    }
}