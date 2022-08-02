import { ApplicationFormABaseManager } from './ApplicationFormABaseManager'
import { A7 } from '../Models/ApplicationForms/ApplicationFormsA'
import { DocumentTemplateFields } from 'EPZEU.Core';

export class A7FormManager extends ApplicationFormABaseManager<A7> {

    protected createApplication(obj: any): A7 {
        return new A7(obj);
    }

    public getTemplateFieldData(templateFields: DocumentTemplateFields): string {

        if (templateFields == DocumentTemplateFields.NRA_CORRESPONDENCE_ADDRESS) {
            if (this.application.fields.seatForCorrespondence && this.application.fields.seatForCorrespondence.address) {
                return this.convertAddressToString(this.application.fields.seatForCorrespondence.address);
            }
        }

        return super.getTemplateFieldData(templateFields);
    }
}