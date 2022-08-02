import { ApplicationWithFieldsFormBaseManager } from 'EPZEU.CR.Domain'
import { BRISCrossborderMergeReceptionMessage } from '../Models/ApplicationForms/BRISApplicationForms';

export class BRISCrossborderMergeReceptionMessageFormManager extends ApplicationWithFieldsFormBaseManager<BRISCrossborderMergeReceptionMessage> {

    protected createApplication(obj: any): BRISCrossborderMergeReceptionMessage {
        return new BRISCrossborderMergeReceptionMessage(obj);
    }
}