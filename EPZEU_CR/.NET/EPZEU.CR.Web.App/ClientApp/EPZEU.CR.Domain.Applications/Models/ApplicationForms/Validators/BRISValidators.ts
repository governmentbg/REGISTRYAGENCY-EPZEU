import { ErrorLevels } from 'Cnsys.Core';
import { ApplicationFormBaseValidator, ApplicationFormFieldsBaseValidator } from 'EPZEU.CR.Domain';
import { BRISFields } from '../../BRISModels';
import { BRISCrossborderMergeReceptionMessage, BRISBranchDisclosureReceptionMessage, BRISChangeCompanyEUIDReceptionMessage } from '../BRISApplicationForms'


export class BRISFieldsValidator extends ApplicationFormFieldsBaseValidator<BRISFields>{
    constructor() {
        super();
    }

    public validate(obj: BRISFields): boolean {
        let isValid = super.validate(obj);

        obj.setAllErrorsLevel(ErrorLevels.Error);

        return isValid;
    }
}

export class BRISCrossborderMergeReceptionMessageValidator extends ApplicationFormBaseValidator<BRISCrossborderMergeReceptionMessage> {
    constructor() {
        super();

        this.ruleFor(m => m.fields).setValidator(new BRISFieldsValidator());
    }

    public validate(obj: BRISCrossborderMergeReceptionMessage): boolean {
        let isValid = super.validate(obj);

        if (obj.documents == null || obj.documents.length == 0) {
            obj.addError('documents', this.getMessage('GL_NOATTACHED_DOCUMENTS_E'));
            isValid = false;
        }

        return isValid;
    }
}

export class BRISBranchDisclosureReceptionMessageValidator extends ApplicationFormBaseValidator<BRISBranchDisclosureReceptionMessage> {
    constructor() {
        super();

        this.ruleFor(m => m.fields).setValidator(new BRISFieldsValidator());
    }

    public validate(obj: BRISBranchDisclosureReceptionMessage): boolean {
        let isValid = super.validate(obj);

        if (obj.documents == null || obj.documents.length == 0) {
            obj.addError('documents', this.getMessage('GL_NOATTACHED_DOCUMENTS_E'));
            isValid = false;
        }

        return isValid;
    }
}

export class BRISChangeCompanyEUIDReceptionMessageValidator extends ApplicationFormBaseValidator<BRISChangeCompanyEUIDReceptionMessage> {
    constructor() {
        super();

        this.ruleFor(m => m.fields).setValidator(new BRISFieldsValidator());
    }

    public validate(obj: BRISChangeCompanyEUIDReceptionMessage): boolean {
        let isValid = super.validate(obj);

        if (obj.documents == null || obj.documents.length == 0) {
            obj.addError('documents', this.getMessage('GL_NOATTACHED_DOCUMENTS_E'));
            isValid = false;
        }

        return isValid;
    }
}