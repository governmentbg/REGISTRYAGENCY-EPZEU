import { ApplicationFormBaseManager } from 'EPZEU.CR.Domain'
import { B4 } from '../Models/ApplicationForms/ApplicationFormsB'
import { ApplicationFormBBaseManager } from './ApplicationFormBBaseManager';

export class B4FormManager extends ApplicationFormBBaseManager<B4> {

    protected createApplication(obj: any): B4 {
        return new B4(obj);
    }
}