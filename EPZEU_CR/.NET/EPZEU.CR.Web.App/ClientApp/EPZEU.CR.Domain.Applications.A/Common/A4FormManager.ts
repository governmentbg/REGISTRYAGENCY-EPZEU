import { DocumentTemplateFields } from 'EPZEU.Core';
import { A4 } from '../Models/ApplicationForms/ApplicationFormsA';
import { ApplicationFormABaseManager } from './ApplicationFormABaseManager';

export class A4FormManager extends ApplicationFormABaseManager<A4> {

    protected createApplication(obj: any): A4 {
        return new A4(obj);
    }

    public getTemplateFieldData(templateFields: DocumentTemplateFields): string {

        switch (templateFields) {
            case DocumentTemplateFields.PARTNER_NАМЕ:
            case DocumentTemplateFields.FOUNDER_NAME: {
                return this.application.fields.partners && this.application.fields.partners.partnersList && this.application.fields.partners.partnersList.length > 0 && this.application.fields.partners.partnersList[0].subject ?
                    this.application.fields.partners.partnersList[0].subject.name : null;
            }
            case DocumentTemplateFields.MNG_PERSON_NAME: {
                return this.application.fields.managers && this.application.fields.managers.managersList && this.application.fields.managers.managersList.length > 0 && this.application.fields.managers.managersList[0].person ?
                    this.application.fields.managers.managersList[0].person.name : null;
            }
            case DocumentTemplateFields.NRA_CORRESPONDENCE_ADDRESS:
                if(this.application.fields.seatForCorrespondence && this.application.fields.seatForCorrespondence.address) {
                return this.convertAddressToString(this.application.fields.seatForCorrespondence.address);
            }
        }


        return super.getTemplateFieldData(templateFields);
    }
}