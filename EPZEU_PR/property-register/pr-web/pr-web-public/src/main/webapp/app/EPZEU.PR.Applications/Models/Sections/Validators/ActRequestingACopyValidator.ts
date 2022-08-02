import { EPZEUBaseValidator } from 'EPZEU.Core';
import { IApplicationFormValidationContext } from 'EPZEU.PR.ApplicationBase';
import { ActRequestingACopy } from '../ActRequestingACopy';
import { RegistryOfficeValidator } from './RegistryOfficeValidator';
import { ActOldDataValidator } from './ActOldDataValidator';
import { ActDataValidator } from './ActDataValidator';

export class ActRequestingACopyValidator extends EPZEUBaseValidator<ActRequestingACopy, IApplicationFormValidationContext> {

  constructor() {
    super();
    this.ruleFor(m => m.copyReason).notEmpty().withMessage(this.getMessage('PR_APP_00097_E')); // Поле "Основание за преписа" е задължително за попълване.
    this.ruleFor(m => m.registryOffice).setValidator(new RegistryOfficeValidator());
    this.ruleFor(m => m.actOldData).setValidator(new ActOldDataValidator()).when(m => m.isBeforeStartDate);
    this.ruleFor(m => m.actData).setValidator(new ActDataValidator()).when(m => m.isBeforeStartDate === false);
  }

  public validate(obj: ActRequestingACopy): boolean {
    let isValid = super.validate(obj);

    if (obj.isBeforeStartDate)
      obj.actData.clearErrors();
    else
      obj.actOldData.clearErrors();

    if (((obj.isBeforeStartDate !== null) && (obj.isBeforeStartDate !== undefined)) == false) {
      isValid = false;
      obj.addError('isBeforeStartDate', this.getMessage('PR_APP_00089_E'));// Моля, посочете периода на вписване на акт в имотния регистър
    }

    return isValid;
  }
}
