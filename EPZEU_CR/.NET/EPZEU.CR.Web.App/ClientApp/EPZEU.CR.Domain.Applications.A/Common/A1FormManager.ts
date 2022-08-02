import { IApplicationFormAManager, ApplicationFormABaseManager } from './ApplicationFormABaseManager'
import { A1 } from '../Models/ApplicationForms/ApplicationFormsA'
import { DocumentTemplateFields } from 'EPZEU.Core';

export class A1FormManager extends ApplicationFormABaseManager<A1> {

    protected createApplication(obj: any): A1 {
        return new A1(obj);
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