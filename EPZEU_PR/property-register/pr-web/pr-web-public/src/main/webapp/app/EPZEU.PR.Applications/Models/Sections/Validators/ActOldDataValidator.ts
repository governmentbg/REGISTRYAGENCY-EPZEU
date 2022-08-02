import { ObjectHelper, Helper } from 'Cnsys.Core';
import { EPZEUBaseValidator } from 'EPZEU.Core';
import { IApplicationFormValidationContext } from 'EPZEU.PR.ApplicationBase';
import { ActOldData } from '../../ActOldData';

export class ActOldDataValidator extends EPZEUBaseValidator<ActOldData, IApplicationFormValidationContext> {

  constructor() {
    super();
    this.ruleFor(m => m.year).matches('[0-9]{4}').when(m => ObjectHelper.isStringNullOrEmpty(m.year) == false).withMessage(this.getMessage('GL_INPUT_YEAR_VALUE_E')); // Моля, въведете година във формат "гггг"
  }

  public validate(obj: ActOldData): boolean {
    let isValid = super.validate(obj);

    if (ObjectHelper.isStringNullOrEmpty(obj.actOldNumber)
      || ObjectHelper.isStringNullOrEmpty(obj.volumeOld)
      || ObjectHelper.isStringNullOrEmpty(obj.year)
      || ObjectHelper.isStringNullOrEmpty(obj.actAdditionalData)) {
      isValid = false;
      obj.addError(this.getMessage('PR_APP_00094_E')); // Моля, въведете данни за акта, от който искате препис
    }

    return isValid;
  }
}
