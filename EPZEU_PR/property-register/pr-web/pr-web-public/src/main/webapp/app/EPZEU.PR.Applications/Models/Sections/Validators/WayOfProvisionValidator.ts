import { EPZEUBaseValidator } from 'EPZEU.Core';
import { IApplicationFormValidationContext  } from 'EPZEU.PR.ApplicationBase';
import { WayOfProvision } from '../WayOfProvision';
import { IssuingAuthorityValidator } from "../../Validators/IssuingAuthorityValidator";
import { ReceivingOfficeValidator } from "../../Validators/ReceivingOfficeValidator";

export class WayOfProvisionValidator extends EPZEUBaseValidator<WayOfProvision, IApplicationFormValidationContext> {

  constructor() {
    super();

    this.ruleFor(m => m.issuingAuthority).setValidator(new IssuingAuthorityValidator());
    this.ruleFor(m => m.receivingOffice).setValidator(new ReceivingOfficeValidator()).when(m => m.selectedOnCornerDeliveryMethod == true);
  }

  public validate(obj: WayOfProvision): boolean {
    let isValid = super.validate(obj);

    if (!obj.selectedOnCornerDeliveryMethod && !obj.selectedElectronicImageDeliveryMethod) {
      obj.addError(this.getMessage('PR_APP_00088_E'));
      isValid = false;
    }

    return isValid;
  }
}
