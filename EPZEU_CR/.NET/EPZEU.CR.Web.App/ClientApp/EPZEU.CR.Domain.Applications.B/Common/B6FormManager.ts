import { ApplicationFormBaseManager } from 'EPZEU.CR.Domain'
import { B6 } from '../Models/ApplicationForms/ApplicationFormsB'
import { ApplicationFormBBaseManager } from './ApplicationFormBBaseManager';

export class B6FormManager extends ApplicationFormBBaseManager<B6> {

    protected createApplication(obj: any): B6 {
        return new B6(obj);
    }
}