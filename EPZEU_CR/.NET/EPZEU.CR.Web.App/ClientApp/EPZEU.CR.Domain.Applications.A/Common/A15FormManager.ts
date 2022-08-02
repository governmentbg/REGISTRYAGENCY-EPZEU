import { DocumentTemplateFields } from 'EPZEU.Core';
import { A15 } from '../Models/ApplicationForms/ApplicationFormsA';
import { ApplicationFormABaseManager } from './ApplicationFormABaseManager';

export class A15FormManager extends ApplicationFormABaseManager<A15> {

    protected createApplication(obj: any): A15 {
        return new A15(obj);
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