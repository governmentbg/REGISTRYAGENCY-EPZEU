import { IApplicationFormAManager, ApplicationFormABaseManager } from './ApplicationFormABaseManager'
import { A3 } from '../Models/ApplicationForms/ApplicationFormsA'
import { DocumentTemplateFields } from 'EPZEU.Core';

export class A3FormManager extends ApplicationFormABaseManager<A3> {

    protected createApplication(obj: any): A3 {
        return new A3(obj);
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