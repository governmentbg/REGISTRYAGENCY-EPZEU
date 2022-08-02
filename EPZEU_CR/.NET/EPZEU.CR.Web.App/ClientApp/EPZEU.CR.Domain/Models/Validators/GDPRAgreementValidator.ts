﻿import { ErrorLevels } from 'Cnsys.Core';
import { EPZEUBaseValidator } from 'EPZEU.Core';
import { GDPRAgreement } from '../ModelsAutoGenerated';
import { IApplicationFormValidationContext } from './ApplicationFormValidationContext';

export class GDPRAgreementValidator extends EPZEUBaseValidator<GDPRAgreement, IApplicationFormValidationContext> {
    constructor() {
        super();

    }

    public validate(obj: GDPRAgreement): boolean {
        let isValid = super.validate(obj);


        if (!obj.isGDPRAgreementAccepted) {
            obj.addError('isGDPRAgreementAccepted', this.getMessage('GL_APP_GDPR_GIVING_CONSENT_E'), ErrorLevels.Error);

            isValid = false;
        }

        return isValid;
    }
}