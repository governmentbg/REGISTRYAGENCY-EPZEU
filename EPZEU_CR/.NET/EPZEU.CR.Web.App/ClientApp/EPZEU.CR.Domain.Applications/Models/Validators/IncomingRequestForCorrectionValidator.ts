﻿import { ErrorLevels } from 'Cnsys.Core';
import { ApplicantExchangeValidator, ApplicantInfoValidator, ApplicationFormBaseValidator, IApplicationFormValidationContext } from 'EPZEU.CR.Domain';
import { IncomingRequestForCorrection } from '../ModelsAutoGenerated';
import { RequestForCorrectionValidator } from './RequestForCorrectionValidator';

export class IncomingRequestForCorrectionValidator extends ApplicationFormBaseValidator<IncomingRequestForCorrection> {

    possibleRequestAttachedDocuments: any = null;

    constructor() {
        super();

        this.ruleFor(m => m.applicantInfo).setValidator(new ApplicantInfoValidator());
        this.ruleFor(m => m.applicantExchange).setValidator(new ApplicantExchangeValidator());
        this.ruleFor(m => m.requestForCorrection).setValidator(new RequestForCorrectionValidator());
    }

    setValidationContext(validationContext: IApplicationFormValidationContext): void {
        super.setValidationContext(validationContext);

        this.getValidationContext().applicationManager.getPossibleAttachedDocumentTypes()
            .bind(this).then(s => {
                this.possibleRequestAttachedDocuments = s.filter(s => s.minOccurs == 1 && s.maxOccurs == 1);
            })
    }

    public validate(obj: IncomingRequestForCorrection): boolean {
        let isValid = super.validate(obj);
        let that = this;
        if (obj.documents == null || obj.documents.length == 0) {
            obj.addError('documents', that.getMessage('GL_NOATTACHED_DOCUMENTS_E')); // Няма приложени документи.
            isValid = false;
        }
        else {
            if (this.possibleRequestAttachedDocuments != null) {
                this.possibleRequestAttachedDocuments.forEach(function (possibleDoc: any) {
                    let possibleActDocCount: number = obj.documents.filter(d => d.documentTypeID == possibleDoc.documentTypeID).length;
                    if (possibleActDocCount < possibleDoc.minOccurs || possibleActDocCount > possibleDoc.maxOccurs) {
                        obj.addError('documents', that.getMessage('GL_NOATTACHED_DOCUMENTS_E')); // Няма приложени документи.
                        isValid = false;
                    }
                });
            }
        }

        obj.setAllErrorsLevel(ErrorLevels.Error);

        return isValid;
    }
}