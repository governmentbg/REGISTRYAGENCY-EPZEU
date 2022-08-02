import { EPZEUBaseValidator } from "EPZEU.Core";
import { IApplicationFormValidationContext } from "EPZEU.PR.ApplicationBase";
import { ServiceRecipient } from "../ServiceRecipient";
import { PersonValidator } from "../../Validators/PersonValidator";

export class ServiceRecipientValidator extends  EPZEUBaseValidator<ServiceRecipient,IApplicationFormValidationContext>{

  constructor() {
    super();

    this.ruleFor(m => m.person).setValidator(new PersonValidator());
  }
}
