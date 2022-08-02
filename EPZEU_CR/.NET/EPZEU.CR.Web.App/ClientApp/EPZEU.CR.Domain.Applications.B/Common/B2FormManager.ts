import { ApplicationFormBaseManager } from 'EPZEU.CR.Domain'
import { B2 } from '../Models/ApplicationForms/ApplicationFormsB'
import { ApplicationFormBBaseManager } from './ApplicationFormBBaseManager';

export class B2FormManager extends ApplicationFormBBaseManager<B2> {

    protected createApplication(obj: any): B2 {
        return new B2(obj);
    }
}