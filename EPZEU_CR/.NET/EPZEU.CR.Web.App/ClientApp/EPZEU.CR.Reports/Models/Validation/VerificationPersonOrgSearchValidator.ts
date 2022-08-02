import { EPZEUBaseValidator, EPZEUValidationHelper } from 'EPZEU.Core';
import { VerificationPersonOrgSearch } from '../VerificationPersonOrgSearch';
import { VerificationPersonOrgResultFilters } from '../Enums';
import { ObjectHelper, ValidationHelper } from 'Cnsys.Core';

export class VerificationPersonOrgSearchValidator extends EPZEUBaseValidator<VerificationPersonOrgSearch, any> {
    constructor() {
        super();

        //Позволени символи са малки и големи букви на кирилица или латиница, интервал, ‘ (апостроф) и – (тире).
        this.ruleFor(m => m.name).matches('^[А-Яа-яA-Za-z-\' ]+$').when(m => m.selectedSearchFilter == VerificationPersonOrgResultFilters.PhysicalForm).withMessage(this.getMessage('GL_INPUT_CORRECT_NAME_E'));
        this.ruleFor(m => m.name).must((obj) => {
            return EPZEUValidationHelper.hasAnyCharNotInSpecialCharCodes(obj.name, obj.selectedSearchFilter == VerificationPersonOrgResultFilters.PhysicalForm);
        }).when(x => !ObjectHelper.isStringNullOrEmpty(x.name)).withMessage(this.getMessage('GL_NOSELECT_SEARCH_CRITERIA_E'));

        this.ruleFor(m => m.ident).matches('^[0-9]{6}$').when(m => m.selectedSearchFilter == VerificationPersonOrgResultFilters.PhysicalForm && m.ident && m.ident.length <= 6).withMessage(this.getMessage('GL_INVALID_IDENTIFIER_E'));
        this.ruleFor(m => m.ident).must((obj) => {
            return ValidationHelper.isValidEGNLNCh(obj.ident);
        })
        .when(m => m.selectedSearchFilter == VerificationPersonOrgResultFilters.PhysicalForm && m.ident && m.ident.length > 6)
        .withMessage(this.getMessage('GL_INVALID_IDENTIFIER_E'));
        this.ruleFor(m => m.ident).isValidBULSTAT().when(m => m.selectedSearchFilter == VerificationPersonOrgResultFilters.CompanyForm).withMessage(this.getMessage('GL_INVALID_IDENTIFIER_E'));
    }

    public validate(obj: VerificationPersonOrgSearch): boolean {
        let isValid = super.validate(obj);

        if (ObjectHelper.isStringNullOrEmpty(obj.ident)
            && ObjectHelper.isStringNullOrEmpty(obj.name)) {
            obj.addError(this.getMessage('GL_NOSELECT_SEARCH_CRITERIA_E')); //Не сте посочили критерии за търсене.
            return false;
        }

        if (obj.selectedSearchFilter == VerificationPersonOrgResultFilters.PhysicalForm
            && !ObjectHelper.isStringNullOrEmpty(obj.ident)) {

            if (obj.ident.length == 6 && !EPZEUValidationHelper.validateBirthDate(obj.ident, false)) {
                obj.addError("ident", this.getMessage('GL_INVALID_IDENTIFIER_E'));
                return false;
            }
        }

        return isValid;
    }
}