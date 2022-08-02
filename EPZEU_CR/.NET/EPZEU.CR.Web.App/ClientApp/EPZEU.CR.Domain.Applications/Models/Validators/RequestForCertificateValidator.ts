import { ErrorLevels, ObjectHelper } from 'Cnsys.Core';
import { EPZEUBaseValidator } from 'EPZEU.Core';
import { IApplicationFormValidationContext, ValidatorHelpers } from 'EPZEU.CR.Domain';
import * as moment from 'moment';
import { RequestForCertificate } from '../RequestForCertificate';
import { RequestForCertificateBase } from '../RequestForCertificateBase';

export class RequestForCertificateValidator extends EPZEUBaseValidator<RequestForCertificate, IApplicationFormValidationContext> {

    public validate(obj: RequestForCertificate): boolean {

        let isValid = super.validate(obj);

        return isValid;
    }
}

export class ActualDateBaseValidator extends EPZEUBaseValidator<RequestForCertificateBase, IApplicationFormValidationContext> {

    constructor() {
        super();

        this.ruleFor(m => m.certificate).setValidator(new ActualDateValidator());
    }

    public validate(obj: RequestForCertificateBase): boolean {
        let isValid = super.validate(obj);

        return isValid;
    }
}

export class DefineDatePeriodBaseValidator extends EPZEUBaseValidator<RequestForCertificateBase, IApplicationFormValidationContext> {

    constructor() {
        super();

        this.ruleFor(m => m.certificate).setValidator(new DefineDatePeriodValidator());
    }

    public validate(obj: RequestForCertificateBase): boolean {

        let isValid = super.validate(obj);

        return isValid;
    }
}

export class EmailForReceivingBaseValidator extends EPZEUBaseValidator<RequestForCertificateBase, IApplicationFormValidationContext> {

    constructor() {
        super();

        this.ruleFor(m => m.certificate).setValidator(new EmailForReceivingValidator());
    }

    public validate(obj: RequestForCertificateBase): boolean {
        let isValid = super.validate(obj);

        return isValid;
    }
}

export class FieldIdentsBaseValidator extends EPZEUBaseValidator<RequestForCertificateBase, IApplicationFormValidationContext> {

    constructor(notSelectedFieldErrorKey?: string, resultsNotFoundErrorKey?: string, checkFieldIdentsMatch: boolean = true) {
        super();

        this.ruleFor(m => m.certificate).setValidator(new FieldIdentsValidator(notSelectedFieldErrorKey, resultsNotFoundErrorKey, checkFieldIdentsMatch));
    }

    public validate(obj: RequestForCertificateBase): boolean {
        let isValid = super.validate(obj);

        return isValid;
    }
}

//#region Sub Validators 

class ActualDateValidator extends EPZEUBaseValidator<RequestForCertificate, IApplicationFormValidationContext> {

    public validate(obj: RequestForCertificate): boolean {
        var isValid = true;
        obj.removeError("dateTo");

        if (!ValidatorHelpers.isValidDate(obj.dateTo)) {
            obj.addError("dateTo", this.getMessage('GL_INPUT_DATE_E'), ErrorLevels.Error)
            isValid = false;
        }

        if (obj.dateTo > moment().endOf('day')) {
            obj.addError("dateTo", this.getMessage('CR_APP_00228_E'), ErrorLevels.Error);
            isValid = false;
        }

        return isValid;
    }
}

class DefineDatePeriodValidator extends EPZEUBaseValidator<RequestForCertificate, IApplicationFormValidationContext> {

    public validate(obj: RequestForCertificate): boolean {

        var isValid = true;
        obj.removeError("dateTo");
        obj.removeError("dateFrom");

        if (!ValidatorHelpers.isValidDate(obj.dateTo)) {
            obj.addError("dateTo", this.getMessage('GL_INPUT_DATE_E'), ErrorLevels.Error)
            isValid = false;
        }

        if (obj.dateTo > moment().endOf('day')) {
            obj.addError("dateTo", this.getMessage('CR_APP_00228_E'), ErrorLevels.Error);
            isValid = false;
        }

        if (!ValidatorHelpers.isValidDate(obj.dateFrom)) {
            obj.addError("dateFrom", this.getMessage('GL_INPUT_DATE_E'), ErrorLevels.Error)
            isValid = false;
        }

        if (obj.dateFrom > obj.dateTo) {
            obj.addError("dateFrom", this.getMessage('GL_PERIOD_START_DATE_MUST_LESS_E'), ErrorLevels.Error);
            isValid = false;
        }

        return isValid;
    }
}

class EmailForReceivingValidator extends EPZEUBaseValidator<RequestForCertificate, IApplicationFormValidationContext> {

    public validate(obj: RequestForCertificate): boolean {

        obj.removeError("email");

        if (ObjectHelper.isStringNullOrEmpty(obj.email)) {
            obj.addError("email", this.getMessage('GL_INPUT_VALID_EMAIL_E'), ErrorLevels.Error)
            return false;
        }

        if (!ValidatorHelpers.isValidEmailAddress(obj.email)) {
            obj.addError("email", this.getMessage('GL_INVALID_EMAIL_E'), ErrorLevels.Error)
            return false;
        }

        return true;
    }
}

class FieldIdentsValidator extends EPZEUBaseValidator<RequestForCertificate, IApplicationFormValidationContext> {
    private _notSelectedFieldErrorKey: string;
    private _resultsNotFoundErrorKey: string;
    private _checkFieldIdentsMatch: boolean;

    constructor(notSelectedFieldErrorKey?: string, resultsNotFoundErrorKey?: string, checkFieldIdentsMatch: boolean = true) {
        super();

        this._notSelectedFieldErrorKey = ObjectHelper.isStringNullOrEmpty(notSelectedFieldErrorKey) ? "CR_GL_SELECT_SECTION_GROUP_FIELD_E" : notSelectedFieldErrorKey;
        this._resultsNotFoundErrorKey = ObjectHelper.isStringNullOrEmpty(resultsNotFoundErrorKey) ? "CR_GL_NO_RESULTS_E" : resultsNotFoundErrorKey;
        this._checkFieldIdentsMatch = checkFieldIdentsMatch
    }

    public validate(obj: RequestForCertificate): boolean {
        var isValid = true;
        obj.removeError("fieldIdents");

        if (!obj.fieldIdents || obj.fieldIdents.length == 0) {
            obj.addError("fieldIdents", this.getMessage(this._notSelectedFieldErrorKey), ErrorLevels.Error);
            isValid = false;
        } else {

            if (this._checkFieldIdentsMatch) {

                var hasMatch = false;

                if (obj.draftFieldIdents && obj.draftFieldIdents.length > 0) {
                    for (var i = 0; i < obj.fieldIdents.length; i++) {

                        for (var j = 0; j < obj.draftFieldIdents.length; j++) {

                            if (obj.fieldIdents[i] === obj.draftFieldIdents[j].toString()) {
                                hasMatch = true;
                                break;
                            }
                        }

                        if (hasMatch)
                            break;
                    }
                }

                if (!hasMatch) {
                    obj.addError("fieldIdents", this.getMessage(this._resultsNotFoundErrorKey), ErrorLevels.Error);
                    isValid = false;
                }
            }
        }

        return isValid;
    }
}

//#endregion