import { ObjectHelper } from 'Cnsys.Core';
import { EPZEUBaseValidator } from 'EPZEU.Core';
import { ApplicationStatusCheck } from '../ApplicationStatusCheck';
import * as moment from 'moment';

export class ApplicationStatusCheckValidator extends EPZEUBaseValidator<ApplicationStatusCheck, any> {

  constructor() {
    super();
    this.ruleFor(m => m.regNumber).matches('^[0-9]*$').when(m => (!m.isSearchByApplicationNumberSelected && !ObjectHelper.isStringNullOrEmpty(m.regNumber))).withMessage(this.getMessage('PR_APP_INVLD_INCOMING_NMBR_E')); // Въведете валиден входящ номер на заявление
    this.ruleFor(m => m.registrationDate).isValidDate().when(m => !m.isSearchByApplicationNumberSelected).withMessage(this.getMessage('PR_APP_INVALID_DATE_E'));
    this.ruleFor(m => m.registrationDate)
      .must(function (model, v) { return moment.isMoment(model.registrationDate) ? model.registrationDate <= moment().endOf('day') : true; })
      .when(m => !m.isSearchByApplicationNumberSelected)
      .withMessage(this.getMessage('PR_APP_INVALID_DATE_E'));
    //this.ruleFor(m => m.applicationNumber).notNull().when(m => m.isSearchByApplicationNumberSelected).withMessage(this.getMessage('PR_INVALID_APPL_ID_E')); // Въведете валиден № на заявление
    // проверява дали след ИР- има 4 цифрри (за година), после 01-12 за месец, после 01-31 за ден, после "-" и n на брой сифри.
    this.ruleFor(m => m.applicationNumber).matches('^ИР-[0-9]{4}((0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))-[0-9]+$', 'i').when(m => (m.isSearchByApplicationNumberSelected && !ObjectHelper.isStringNullOrEmpty(m.applicationNumber))).withMessage(this.getMessage('PR_INVALID_APPL_ID_E')); // Въведете валиден № на заявление
  }

  public validate(obj: ApplicationStatusCheck): boolean {
    let isValid = super.validate(obj);

    if (ObjectHelper.isStringNullOrEmpty(obj.applicationNumber)  && (ObjectHelper.isStringNullOrEmpty(obj.regNumber)
      || (obj.registrationDate == null)
      || ObjectHelper.isStringNullOrEmpty(obj.registerId)
      || !obj.registryOffice
      || ObjectHelper.isStringNullOrEmpty(obj.registryOffice.id))) {
      isValid = false;
      obj.addError(this.getMessage('PR_APP_MNDTRY_FIELDS_E')); // Задължително е попълването на всичките четири полета за входяща регистрация на заявление в имотен регистър или полето № на заявление в Портала на имотен регистър
    }

    return isValid;
  }
}
