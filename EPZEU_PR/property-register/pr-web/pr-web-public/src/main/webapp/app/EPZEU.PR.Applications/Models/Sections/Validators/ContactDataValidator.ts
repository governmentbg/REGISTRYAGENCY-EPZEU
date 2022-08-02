import { EPZEUBaseValidator } from 'EPZEU.Core';
import { IApplicationFormValidationContext } from 'EPZEU.PR.ApplicationBase';
import { ContactData } from "../ContactData";
import { AddressValidator } from "../../Validators/AddressValidator";

export class ContactDataValidator extends EPZEUBaseValidator<ContactData, IApplicationFormValidationContext> {

  constructor() {
    super();

    this.ruleFor(m => m.appEmailAddress).notEmpty().withMessage(this.getMessage('GL_INPUT_VALID_EMAIL_E'));
    this.ruleFor(m => m.appEmailAddress).matches('^([0-9a-zA-Z]([-.\\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\\w]*[0-9a-zA-Z]\\.)+[a-zA-Z]{2,9})$').withMessage(this.getMessage('GL_INPUT_VALID_EMAIL_E'));
    this.ruleFor(m => m.phone).notEmpty().withMessage(this.getMessage('PR_INPUT_PHONE_NUMBER_E'));
    this.ruleFor(model => model.address).setValidator(new AddressValidator());
  }
}
