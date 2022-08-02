import { ObjectHelper } from 'Cnsys.Core';
import { EPZEUBaseValidator, BG_COUNTRY_ID } from 'EPZEU.Core';
import { DomainModelHepler, IApplicationFormValidationContext, IndentTypes, IndentValidationMode, Person, PersonTypes } from '../../';
import { ValidatorHelpers } from './ValidatorHelpers';

export interface IPersonValidationContext extends IApplicationFormValidationContext {
    personType: PersonTypes;
}
 
//базова контрола за физическо лице - име + идентификатор
//1. Дали са попълнени и двете полета; 2. Дали идентификатора е валиден; 3. Дали името е валидно за физическо лице
export class PersonBaseValidator extends EPZEUBaseValidator<Person, IPersonValidationContext> {
    constructor() {
        super();

        this.ruleFor(m => m.indent).matches('^[0-9]{6,10}$').withMessage(this.getMessage('GL_INVALID_IDENTIFIER_E')).when(m => !ObjectHelper.isStringNullOrEmpty(m.indent) && !m.isForeignTrader); //допускат се само цифри. 
        this.ruleFor(m => m.name).matches('^[А-Яа-яA-Za-z-\' ]+$').withMessage(this.getMessage('GL_INPUT_CORRECT_NAME_E'));
    }

    public validate(obj: Person): boolean {

        let isValid = super.validate(obj);
        let idType = DomainModelHepler.getIdentType(obj.indent);
        obj.clearErrors(true);

        //Грешката се визуализира когато има непопълнено поле Име на физическо лице и/или ЕГН/ЛНЧ/Дата на раждане 
        if (ValidatorHelpers.isNameOrIndentRequired(obj.name, obj.indent, obj.isForeignTrader)) {
            //Попълнете име и идентификатор
            obj.addError(this.getMessage('GL_INPUT_NAME_ID_E'));
            isValid = false;
        }

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

//контрола за физическо лице - име + идентификатор + държава
//1. Дали е избрана държава; 2. Ако е въведено валидно Егн, дали държавата е БГ
export class PersonWithCountyValidator extends PersonBaseValidator {
    constructor() {
        super();
        
    }

    public validate(obj: Person): boolean {        

        let isValid = super.validate(obj);       

        //Грешката се визуализира когато няма избрана държава
        if (ObjectHelper.isNullOrUndefined(obj.countryID)) {
            obj.addError('countryName', this.getMessage('CR_APP_00031_E'));
            isValid = false;
        }
        else {
            //Грешката се визуализира при избрана държава различна от България и в полето за идентификация е попълнено валиден идентификатор (ЕГН). 
            if (ValidatorHelpers.isCountryBGRequired(obj.countryID, obj.indentType, null, true)) {
                obj.addError('countryName', this.getMessage('CR_APP_00047_E'));
                isValid = false;
            }
            //Грешката се визуализира, когато е избрана държава различна от България, но нищо друго не е попълнено
            if (isValid && obj.countryID != BG_COUNTRY_ID && ObjectHelper.isStringNullOrEmpty(obj.name) && ObjectHelper.isStringNullOrEmpty(obj.indent)) {
                //Попълнете име и идентификатор
                obj.addError(this.getMessage('GL_INPUT_NAME_ID_E'));
                isValid = false;
            }
        }
       
        return isValid;
    }
} 

//базова контрола за юридическо лице - име + идентификатор
//1. Дали са попълнени и двете полета; 2. Дали идентификатора е валиден; 
export class SubjectBaseValidator extends EPZEUBaseValidator<Person, IPersonValidationContext> {
    constructor() {
        super();

        this.ruleFor(m => m.indent).matches('^[0-9]{6,10}$').withMessage(this.getMessage('GL_INVALID_IDENTIFIER_E')).when(m => !ObjectHelper.isStringNullOrEmpty(m.indent) && !m.isForeignTrader); //допускат се само цифри. 
    }

    public validate(obj: Person): boolean {

        let isValid = super.validate(obj);
        let idType = DomainModelHepler.getIdentType(obj.indent);
        obj.clearErrors(true);

        //Грешката се визуализира когато има непопълнено поле Име или идентификатор
        if (ValidatorHelpers.isNameOrIndentRequired(obj.name, obj.indent, obj.isForeignTrader)) {
            obj.addError(this.getMessage('GL_INPUT_NAME_ID_E'));
            isValid = false;
        }

        if (!ObjectHelper.isStringNullOrEmpty(obj.indent)) {
            if (idType == IndentTypes.Undefined || !DomainModelHepler.isValidIdentType(IndentValidationMode.All, idType)) {
                //Грешката се визуализира когато е попълнена невалидна стойност в поле идентификатор (различна от ЕГН/ЛНЧ/ЕИК/БУЛСТАТ/Дата на раждане)
                obj.addError('indent', this.getMessage('GL_INVALID_IDENTIFIER_E'))
                isValid = false;
            }
        }
        
        return isValid;
    }
}

//контрола за за юридическо лице - име + идентификатор + опция за това дали е ЧЮЛ
//1. Дали са попълнени полетата за име и идентификатор или име и ЧЮЛ; 2. Дали идентификатора е валиден когато не е ЧЮЛ;
export class SubjectFLEBaseValidator extends EPZEUBaseValidator<Person, IPersonValidationContext> {
    constructor() {
        super();

        this.ruleFor(m => m.indent).matches('^[0-9]{6,10}$').withMessage(this.getMessage('GL_INVALID_IDENTIFIER_E')).when(m => !ObjectHelper.isStringNullOrEmpty(m.indent) && !m.isForeignTrader); //допускат се само цифри. 
    }

    public validate(obj: Person): boolean {

        let isValid = super.validate(obj);
        let idType = DomainModelHepler.getIdentType(obj.indent);
        obj.clearErrors(true);

        //Грешката се визуалзира в случай, че е попълнено само едно от полетата Име или идентификатор или Чуждестранно юридическо лице:
        if (ValidatorHelpers.isNameOrIndentRequired(obj.name, obj.indent, obj.isForeignTrader)) {
            ////Попълнете име и идентификатор. Ако юридическото лице е чуждестранно, попълнете наименование и маркирайте "Чуждестранно юридическо лице".
            obj.addError(this.getMessage('CR_APP_00016_Е'));
            isValid = false;
        }

        if (!obj.isForeignTrader && !ObjectHelper.isStringNullOrEmpty(obj.indent) && idType == IndentTypes.Undefined) {
            //Грешката се визуализира когато е попълнена невалидна стойност в поле идентификатор
            obj.addError('indent', this.getMessage('GL_INVALID_IDENTIFIER_E')); //Невалиден идентификатор.
            isValid = false;
        }        

        return isValid;
    }
}

//контрола за юридическо лице - име + идентификатор + опция за това дали е ЧЮЛ + държава
//1. Дали е избрана държава; 2. Ако е въведен идентификатор ЕГН/ЕИК/БУЛСТАТ и не е избран ЧЮЛ, дали държавата е БГ
export class SubjectFLEWithCountyValidator extends SubjectFLEBaseValidator {
    constructor() {
        super();

    }

    public validate(obj: Person): boolean {

        let isValid = super.validate(obj);

        //Грешката се визуализира когато няма избрана държава
        if (ObjectHelper.isNullOrUndefined(obj.countryID)) {
            obj.addError('countryName', this.getMessage('CR_APP_00031_E'));
            isValid = false;
        }
        else {           
            if (ValidatorHelpers.isCountryBGRequired(obj.countryID, obj.indentType, obj.isForeignTrader, false)) {
                //Грешката се визуализира при избрана държава различна от България и в полето за идентификация е попълнено валиден идентификатор (ЕГН/ЕИК/БУЛСТАТ).
                //В случай, че е маркирана опцията "Чуждестранно юридическо лице" или за идентификатор е попълнена валидна Дата на раждане грешката не се визуализира.
                obj.addError('countryName', this.getMessage('CR_APP_00047_E'));
                isValid = false;
            }
            //Грешката се визуализира, когато е избрана държава различна от България, но нищо друго не е попълнено
            if (isValid && obj.countryID != BG_COUNTRY_ID && ObjectHelper.isStringNullOrEmpty(obj.name) && ObjectHelper.isStringNullOrEmpty(obj.indent)) {
                ////Попълнете име и идентификатор. Ако юридическото лице е чуждестранно, попълнете наименование и маркирайте "Чуждестранно юридическо лице".
                obj.addError(this.getMessage('CR_APP_00016_Е'));
                isValid = false;
            }
        }

        return isValid;
    }
}