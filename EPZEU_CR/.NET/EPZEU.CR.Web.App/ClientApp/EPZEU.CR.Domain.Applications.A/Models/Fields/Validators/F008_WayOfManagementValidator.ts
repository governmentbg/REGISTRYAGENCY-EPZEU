﻿import { RecordValidator } from 'EPZEU.CR.Domain';
import { F008_WayOfManagement } from '../ModelsAutoGenerated';

export class F008_WayOfManagementValidator extends RecordValidator<F008_WayOfManagement> {
    constructor() {
        super();
        //Когато е избран друг начин на управление трябва да се попълни описателното поле. 
        this.ruleFor(m => m.text).notEmpty().when(m => m.otherWay).withMessage(this.getMessage('CR_APP_00153_E'));
    }

    public validateInternal(obj: F008_WayOfManagement): boolean {
        let isValid = super.validateInternal(obj);

        return isValid;
    }
}