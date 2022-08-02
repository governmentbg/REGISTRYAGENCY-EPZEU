import { IApplicationWithFieldsFormManager } from 'EPZEU.CR.Domain';
import { V24 } from '../Models/ApplicationForms/ApplicationFormsV';
import { ApplicationFormVBaseManager } from './ApplicationFormVBaseManager';

export interface IV24FormManager extends IApplicationWithFieldsFormManager {
}

export class V24FormManager extends ApplicationFormVBaseManager<V24> implements IV24FormManager {

    constructor() {
        super();

    }

    protected createApplication(obj: any): V24 {
        return new V24(obj);
    }
}