import { ObjectHelper } from 'Cnsys.Core';
import { EPZEUBaseValidator } from 'EPZEU.Core';
import { IApplicationFormValidationContext } from 'EPZEU.PR.ApplicationBase';
import { ActData } from '../../ActData';
import { DataForRegistrationOfDocumentInDoubleIncomingRegister } from "../../DataForRegistrationOfDocumentInDoubleIncomingRegister";
import { DataForRegistrationOfDocumentInIncomingRegister } from "../../DataForRegistrationOfDocumentInIncomingRegister";
import { DocumentInBookValidator } from './DocumentInBookValidator';
import { DocumentInDoubleIncomingRegValidator } from './DocumentInDoubleIncomingRegValidator';
import { DocumentInIncomingRegValidator } from './DocumentInIncomingRegValidator';

export class ActDataValidator extends EPZEUBaseValidator<ActData, IApplicationFormValidationContext> {

  constructor() {
    super();
    this.ruleFor(m => m.dataForRegistrationOfDocumentInBook).setValidator(new DocumentInBookValidator());
    this.ruleFor(m => m.dataForRegistrationOfDocumentInIncomingRegister).setValidator(new DocumentInIncomingRegValidator());
    this.ruleFor(m => m.dataForRegistrationOfDocumentInDoubleIncomingRegister).setValidator(new DocumentInDoubleIncomingRegValidator());
  }

  public validate(obj: ActData): boolean {
    let isValid = super.validate(obj);

    if (ObjectHelper.isStringNullOrEmpty(obj.dataForRegistrationOfDocumentInBook.actNumber)
        || ObjectHelper.isStringNullOrEmpty(obj.dataForRegistrationOfDocumentInBook.volume)
        || ObjectHelper.isStringNullOrEmpty(obj.dataForRegistrationOfDocumentInBook.book.id)
        || ObjectHelper.isStringNullOrEmpty(obj.dataForRegistrationOfDocumentInBook.year)
    ) {
      isValid = false;
      obj.addError('dataForRegistrationOfDocumentInBook', this.getMessage('PR_APP_00039_E')); // Задължително е попълването на книга, номер на акт, том и година на вписване на акта в имотния регистър
    }

    if ((this.isInRegisterDataEmpty(obj.dataForRegistrationOfDocumentInIncomingRegister) == false)
      &&
      (ObjectHelper.isStringNullOrEmpty(obj.dataForRegistrationOfDocumentInIncomingRegister.incomingRegisterNumber)
        || ObjectHelper.isStringNullOrEmpty(obj.dataForRegistrationOfDocumentInIncomingRegister.registrationDate))
    ) {
      isValid = false;
      obj.addError('dataForRegistrationOfDocumentInIncomingRegister', this.getMessage('PR_APP_00069_E')); // Задължително е попълването на номер и дата на регистриране на акта във входящия регистър на СВ.
    }

    if ((this.isInDoubleRegisterDataEmpty(obj.dataForRegistrationOfDocumentInDoubleIncomingRegister) == false)
      &&
      (ObjectHelper.isStringNullOrEmpty(obj.dataForRegistrationOfDocumentInDoubleIncomingRegister.doubleIncomingRegisterNumber)
      || ObjectHelper.isStringNullOrEmpty(obj.dataForRegistrationOfDocumentInDoubleIncomingRegister.year))
    ) {
      isValid = false;
      obj.addError('dataForRegistrationOfDocumentInDoubleIncomingRegister', this.getMessage('PR_APP_00068_E')); // Задължително е попълването на номер и година на регистриране на акта в двойно-входящия регистър на СВ.
    }

    return isValid;
  }

  private isInRegisterDataEmpty(inRegisterData: DataForRegistrationOfDocumentInIncomingRegister): boolean {
    let res = ObjectHelper.isStringNullOrEmpty(inRegisterData.incomingRegisterNumber)
      && ObjectHelper.isStringNullOrEmpty(inRegisterData.registrationDate)

    return res;
  }

  private isInDoubleRegisterDataEmpty(inDoubleRegisterData: DataForRegistrationOfDocumentInDoubleIncomingRegister): boolean {
    let res = ObjectHelper.isStringNullOrEmpty(inDoubleRegisterData.doubleIncomingRegisterNumber)
      && ObjectHelper.isStringNullOrEmpty(inDoubleRegisterData.year)

    return res;
  }
}
