import { ApplicationFormBaseManager } from 'EPZEU.CR.Domain'
import { B3 } from '../Models/ApplicationForms/ApplicationFormsB'
import { ApplicationFormBBaseManager } from './ApplicationFormBBaseManager';

export class B3FormManager extends ApplicationFormBBaseManager<B3> {

    protected createApplication(obj: any): B3 {
        return new B3(obj);
    }
}