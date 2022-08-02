import { IApplicationFormAManager, ApplicationFormABaseManager } from './ApplicationFormABaseManager'
import { A12 } from '../Models/ApplicationForms/ApplicationFormsA'
import { DocumentTemplateFields } from 'EPZEU.Core';

export class A12FormManager extends ApplicationFormABaseManager<A12> {

    protected createApplication(obj: any): A12 {
        return new A12(obj);
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