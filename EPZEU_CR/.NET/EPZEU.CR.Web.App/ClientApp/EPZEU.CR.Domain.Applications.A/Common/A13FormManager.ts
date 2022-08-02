import { IApplicationFormAManager, ApplicationFormABaseManager } from './ApplicationFormABaseManager'
import { A13 } from '../Models/ApplicationForms/ApplicationFormsA'
import { DocumentTemplateFields } from 'EPZEU.Core';

export class A13FormManager extends ApplicationFormABaseManager<A13> {

    protected createApplication(obj: any): A13 {
        return new A13(obj);
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