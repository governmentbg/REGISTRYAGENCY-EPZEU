import { EPZEUBaseValidator } from 'EPZEU.Core';
import { RequestForCorrectionForScanning } from '../RequestForCorrectionForScanning';
import { ApplicantValidator, ApplicantCapacityValidator } from 'EPZEU.CR.Domain';

export class RequestForCorrectionForScanningValidator extends EPZEUBaseValidator<RequestForCorrectionForScanning, any> {

    constructor() {
        super();

        this.ruleFor(m => m.applicant).setValidator(new ApplicantValidator());

        this.ruleFor(m => m.applicantCapacity).setValidator(new ApplicantCapacityValidator());

        this.ruleFor(m => m.communicationNote).notEmpty().withMessage(this.getMessage('GL_INPUT_FIELD_MUST_E')).setErrorLevelStrict();
    }
}