import { DocumentTemplateFields } from 'EPZEU.Core';
import { ApplicantCapacityType } from 'EPZEU.CR.Domain';
import { A17 } from '../Models/ApplicationForms/ApplicationFormsA';
import { ApplicationFormABaseManager } from './ApplicationFormABaseManager';

export class A17FormManager extends ApplicationFormABaseManager<A17> {

    protected createApplication(obj: any): A17 {
        return new A17(obj);
    }

    public getTemplateFieldData(templateFields: DocumentTemplateFields): string {
        if (templateFields == DocumentTemplateFields.MCC_PERSON_NAME) {
            return this.application.fields.verificationCommission15b && this.application.fields.verificationCommission15b.commissionMembers15bList && this.application.fields.verificationCommission15b.commissionMembers15bList.length > 0 && this.application.fields.verificationCommission15b.commissionMembers15bList[0].person ?
                this.application.fields.verificationCommission15b.commissionMembers15bList[0].person.name : null;
        }

        if (templateFields == DocumentTemplateFields.NRA_CORRESPONDENCE_ADDRESS) {
            if (this.application.fields.seatForCorrespondence && this.application.fields.seatForCorrespondence.address) {
                return this.convertAddressToString(this.application.fields.seatForCorrespondence.address);
            }
        }

        return super.getTemplateFieldData(templateFields);
    }
}