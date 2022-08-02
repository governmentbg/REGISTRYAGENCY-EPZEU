import { ApplicationWithFieldsFormBaseManager } from 'EPZEU.CR.Domain'
import { BRISChangeCompanyEUIDReceptionMessage } from '../Models/ApplicationForms/BRISApplicationForms';

export class BRISChangeCompanyEUIDReceptionMessageFormManager extends ApplicationWithFieldsFormBaseManager<BRISChangeCompanyEUIDReceptionMessage> {

    protected createApplication(obj: any): BRISChangeCompanyEUIDReceptionMessage {
        return new BRISChangeCompanyEUIDReceptionMessage(obj);
    }
}