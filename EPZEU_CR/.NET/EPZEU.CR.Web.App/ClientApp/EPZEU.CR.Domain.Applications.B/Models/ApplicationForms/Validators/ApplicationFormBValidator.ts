﻿import { ErrorLevels, ObjectHelper } from 'Cnsys.Core';
import { ApplicationFormBaseValidator, ApplicationFormFieldsBaseValidator, ProcessStates } from 'EPZEU.CR.Domain';
import { ApplicationFormBBase } from '../../ApplicationForms/ApplicationFormsB';
import { ApplicationFormBFieldsBase } from '../../ApplicationForms/ModelsAutoGenerated';
    
export class ApplicationFormBValidator<TApplication extends ApplicationFormBBase<ApplicationFormBFieldsBase>> extends ApplicationFormBaseValidator<TApplication> {
    constructor() {
        super();
    }

    public validate(obj: TApplication): boolean {
        let isValid = super.validate(obj);
       
        if (obj.documents == null || obj.documents.length == 0) {
            obj.addError('documents', this.getMessage('GL_NOATTACHED_DOCUMENTS_E'), ErrorLevels.Error);
            isValid = false;
        }

        // По принцип тук не би трябвало да влиза в if-a, защото нямаме UI за edit на ЕИК и без ЕИК не може да започне заявление за промяна или пререгистрация,
        // но понеже е много важно да не допускаме такова заявление без ЕИК, правим тази проверка (в случай, че някъде в кода погрешно се пипа ЕИК-а).
        if (((this.validationContext.processStates == ProcessStates.ForChange) || (this.validationContext.processStates == ProcessStates.Preregistration))
            && ObjectHelper.isStringNullOrEmpty(obj.fields.uic)) {
            obj.addError(this.getMessage('GL_INPUT_VALID_ID_E'), ErrorLevels.Error); // Въведете валиден идентификатор
            isValid = false;
        }

        return isValid;
    }
}

export class ApplicationFormBFieldsBaseValidator<TFields extends ApplicationFormBFieldsBase> extends ApplicationFormFieldsBaseValidator<TFields> {
    constructor() {
        super();
    }

    public validate(obj: TFields): boolean {
        let isValid = super.validate(obj);

        return isValid;
    }
}