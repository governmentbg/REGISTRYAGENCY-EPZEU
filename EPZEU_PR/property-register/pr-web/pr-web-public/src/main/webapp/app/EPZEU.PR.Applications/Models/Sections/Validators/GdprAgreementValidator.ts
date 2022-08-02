import { ErrorLevels } from 'Cnsys.Core';
import { EPZEUBaseValidator } from 'EPZEU.Core';
import {GdprAgreement} from "../GdprAgreement";
import { IApplicationFormValidationContext  } from 'EPZEU.PR.ApplicationBase';

export class GDPRAgreementValidator extends EPZEUBaseValidator<GdprAgreement, IApplicationFormValidationContext> {
  constructor() {
    super();
  }

  public validate(obj: GdprAgreement): boolean {
    let isValid = super.validate(obj);

    if (!obj.gdprAgreementAcceptance) {
      obj.addError('isGDPRAgreementAccepted', this.getMessage('GL_APP_GDPR_GIVING_CONSENT_E'), ErrorLevels.Error);

      isValid = false;
    }

    return isValid;
  }
}
