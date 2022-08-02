import { IApplicationFormValidationContext } from ".";
import { PersonTypes, Person, DomainModelHepler, IndentValidationMode } from "../..";
import { EPZEUBaseValidator } from "EPZEU.Core";
import { ObjectHelper } from "Cnsys.Core";


export interface ISubjectValidationContext extends IApplicationFormValidationContext {
    subjectType: PersonTypes;
}

export class SubjectValidator extends EPZEUBaseValidator<Person, ISubjectValidationContext> {
    constructor() {
        super();

        this.ruleFor(m => m.indent).matches('^[0-9]{6,10}$').withMessage(this.getMessage('GL_INVALID_IDENTIFIER_E')).when(m => !ObjectHelper.isStringNullOrEmpty(m.indent) && !m.isForeignTrader); //допускат се само цифри. 
    }
    public validate(obj: Person): boolean {
        obj.clearErrors(); 

        let isValid = super.validate(obj);

        let idType = DomainModelHepler.getIdentType(obj.indent);

        //Грешката се визуализира когато е попълнена невалидна стойност в поле идентификатор
        if (!ObjectHelper.isStringNullOrEmpty(obj.indent) && !obj.isForeignTrader && !DomainModelHepler.isValidIdentType(IndentValidationMode.All, idType)) {
            obj.addError('indent', this.getMessage('GL_INVALID_IDENTIFIER_E'))
            isValid = false;
        }

        return isValid;
    }
}