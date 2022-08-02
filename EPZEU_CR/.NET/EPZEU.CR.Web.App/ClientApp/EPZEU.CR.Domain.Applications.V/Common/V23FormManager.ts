import { IApplicationWithFieldsFormManager } from 'EPZEU.CR.Domain';
import { V23 } from '../Models/ApplicationForms/ApplicationFormsV';
import { ApplicationFormVBaseManager } from './ApplicationFormVBaseManager';

export class V23FormManager extends ApplicationFormVBaseManager<V23> implements IApplicationWithFieldsFormManager {

    protected createApplication(obj: any): V23 {
        return new V23(obj);
    }
}