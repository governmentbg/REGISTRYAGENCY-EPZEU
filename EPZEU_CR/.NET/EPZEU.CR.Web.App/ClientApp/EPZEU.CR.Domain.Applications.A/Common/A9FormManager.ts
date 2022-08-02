import { DocumentTemplateFields } from 'EPZEU.Core';
import { RecordOperations } from 'EPZEU.CR.Domain';
import { A9 } from '../Models/ApplicationForms/ApplicationFormsA';
import { ApplicationFormABaseManager } from './ApplicationFormABaseManager';

export class A9FormManager extends ApplicationFormABaseManager<A9> {

    protected createApplication(obj: any): A9 {
        return new A9(obj);
    }

    public getTemplateFieldData(templateFields: DocumentTemplateFields): string {
        if (templateFields == DocumentTemplateFields.MNG_PERSON_NAME) {
            return this.application.fields.managers && this.application.fields.managers.managersList && this.application.fields.managers.managersList.length > 0 && this.application.fields.managers.managersList[0].person ?
                this.application.fields.managers.managersList[0].person.name : null;
        }

        if (templateFields == DocumentTemplateFields.NRA_CORRESPONDENCE_ADDRESS) {
            if (this.application.fields.seatForCorrespondence && this.application.fields.seatForCorrespondence.address) {
                return this.convertAddressToString(this.application.fields.seatForCorrespondence.address);
            }
        }

        return super.getTemplateFieldData(templateFields);
    }

}