import { DocumentTemplateFields } from 'EPZEU.Core';
import { ApplicantCapacityType } from 'EPZEU.CR.Domain';
import { A16 } from '../Models/ApplicationForms/ApplicationFormsA';
import { ApplicationFormABaseManager } from './ApplicationFormABaseManager';

export class A16FormManager extends ApplicationFormABaseManager<A16> {

    protected createApplication(obj: any): A16 {
        return new A16(obj);
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