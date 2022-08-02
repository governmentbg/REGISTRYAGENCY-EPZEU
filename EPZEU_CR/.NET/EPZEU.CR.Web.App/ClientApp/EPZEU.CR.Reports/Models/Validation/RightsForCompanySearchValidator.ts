import { EPZEUBaseValidator, EPZEUValidationHelper } from 'EPZEU.Core';
import { ObjectHelper  } from 'Cnsys.Core';
import { RightsForCompanySearch } from '../RightsForCompanySearch';


export class RightsForCompanySearchValidator extends EPZEUBaseValidator<RightsForCompanySearch, any> {
    constructor() {
        super();

        this.ruleFor(m => m.name).notEmpty().withMessage(this.getMessage('GL_INPUT_FIELD_MUST_E'));
        this.ruleFor(m => m.name).must((obj) => {
            return EPZEUValidationHelper.hasAnyCharNotInSpecialCharCodes(obj.name);
        }).when(x => !ObjectHelper.isStringNullOrEmpty(x.name)).withMessage(this.getMessage('GL_NOSELECT_SEARCH_CRITERIA_E'));
    }
}