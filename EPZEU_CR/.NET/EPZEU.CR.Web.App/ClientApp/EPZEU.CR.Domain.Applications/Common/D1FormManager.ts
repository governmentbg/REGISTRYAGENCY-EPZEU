import { ApplicationWithFieldsFormBaseManager } from 'EPZEU.CR.Domain'
import { D1 } from '../Models/ApplicationForms/ApplicationForms';
import { ClientError } from 'Cnsys.Core';

export class D1FormManager extends ApplicationWithFieldsFormBaseManager<D1> {

    protected createApplication(obj: any): D1 {
        return new D1(obj);
    }
}