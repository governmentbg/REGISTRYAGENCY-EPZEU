import { ApplicationFormBaseManager } from 'EPZEU.CR.Domain'
import { B5 } from '../Models/ApplicationForms/ApplicationFormsB'
import { ApplicationFormBBaseManager } from './ApplicationFormBBaseManager';

export class B5FormManager extends ApplicationFormBBaseManager<B5> {

    protected createApplication(obj: any): B5 {
        return new B5(obj);
    }
}