import { ApplicationFormBaseManager } from 'EPZEU.CR.Domain'
import { B1 } from '../Models/ApplicationForms/ApplicationFormsB'
import { ApplicationFormBBaseManager } from './ApplicationFormBBaseManager';

export class B1FormManager extends ApplicationFormBBaseManager<B1> {

    protected createApplication(obj: any): B1 {
        return new B1(obj);
    }
}