import { A11 } from '../Models/ApplicationForms/ApplicationFormsA';
import { ApplicationFormABaseManager } from './ApplicationFormABaseManager';
import { DocumentTemplateFields } from 'EPZEU.Core';

export class A11FormManager extends ApplicationFormABaseManager<A11> {

    protected createApplication(obj: any): A11 {
        return new A11(obj);
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