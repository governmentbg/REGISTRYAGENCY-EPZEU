import { EPZEUBaseValidator } from 'EPZEU.Core';
import { PlaceNomenclaturePR } from 'EPZEU.PR.Core';
import { IApplicationFormValidationContext } from 'EPZEU.PR.ApplicationBase';

export class SettlementValidator extends EPZEUBaseValidator<PlaceNomenclaturePR, IApplicationFormValidationContext> {

  constructor() {
    super();

    this.ruleFor(model => model.name).notNull().withMessage(this.getMessage('PR_APP_00040_E'));
    this.ruleFor(model => model.placeId).notNull().withMessage(this.getMessage('PR_APP_00040_E')).when(m => m.name!=null);
  }
}
