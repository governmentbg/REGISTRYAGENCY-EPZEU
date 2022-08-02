import { V1 } from '../Models/ApplicationForms/ApplicationFormsV';
import { ApplicationFormVBaseManager } from './ApplicationFormVBaseManager';

export class V1FormManager extends ApplicationFormVBaseManager<V1> {

    protected createApplication(obj: any): V1 {
        return new V1(obj);
    }
}