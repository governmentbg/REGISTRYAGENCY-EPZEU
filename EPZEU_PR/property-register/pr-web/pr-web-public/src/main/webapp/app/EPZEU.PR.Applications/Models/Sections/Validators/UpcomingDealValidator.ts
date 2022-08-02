import { EPZEUBaseValidator } from 'EPZEU.Core';
import { IApplicationFormValidationContext } from 'EPZEU.PR.ApplicationBase';
import { UpcomingDeal } from '../UpcomingDeal';
import * as moment from 'moment';

export class UpcomingDealValidator extends EPZEUBaseValidator<UpcomingDeal, IApplicationFormValidationContext> {

  constructor() {
    super();
    this.ruleFor(m => m.propertyDealType).notNull().withMessage(this.getMessage('PR_MISSING_TRANSACT_TYPE_E')); // Попълването на вид на сделката е задължително
    this.ruleFor(m => m.propertyDealDate).notNull().withMessage(this.getMessage('PR_INVALID_TRANSCT_DATE_E')); // Моля, въведете дата на сделката не по-ранна от днешната във формат "ДД.ММ.ГГГГ".
    this.ruleFor(m => m.propertyDealDate)
      .must(function (model, v) {
        return moment.isMoment(model.propertyDealDate) ? model.propertyDealDate >= moment().startOf('day') : true;
      })
      .withMessage(this.getMessage('PR_INVALID_TRANSCT_DATE_E'));

    this.ruleFor(m => m.propertyDealDate)
      .must(function (model, v)
      {
        return moment.isMoment(model.propertyDealDate) ? model.propertyDealDate <= moment().add(30, 'days').endOf('day') : true;
      })
      .withMessage(this.getMessage('PR_TRANSCT_DATE_NO_LATER_THAN_E') + ' ' + moment().add(30, 'days').format("l") + ' ' + this.getMessage('GL_YEAR_ABBREVIATION_L'));
  }

  public validate(obj: UpcomingDeal): boolean {
    let isValid = super.validate(obj);

    if (!obj.cadastralIds || obj.cadastralIds.length == 0) {
      isValid = false;
      obj.addError('cadastralIds', this.getMessage('PR_EMPTY_PROP_LIST_E')); // Списъкът е празен. Добавете поне един имот, за който искате да декларирате предстояща сделка.
    }

    return isValid;
  }
}
