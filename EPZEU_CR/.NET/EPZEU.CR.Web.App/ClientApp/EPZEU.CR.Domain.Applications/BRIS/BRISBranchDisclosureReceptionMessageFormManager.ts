import { ApplicationWithFieldsFormBaseManager } from 'EPZEU.CR.Domain'
import { BRISBranchDisclosureReceptionMessage } from '../Models/ApplicationForms/BRISApplicationForms';

export class BRISBranchDisclosureReceptionMessageProviderFormManager extends ApplicationWithFieldsFormBaseManager<BRISBranchDisclosureReceptionMessage> {

    protected createApplication(obj: any): BRISBranchDisclosureReceptionMessage {
        return new BRISBranchDisclosureReceptionMessage(obj);
    }
}