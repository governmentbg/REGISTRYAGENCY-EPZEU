import { moduleContext } from '../ModuleContext';
import { TypeSystem } from 'Cnsys.Core';

export enum ProcessStatuses {
  /**В процес на подаване*/
  InProcess = 1,

  /**Впреоцес на подписване*/
  Signing = 2,

  /**С грешка при подписване*/
  ErrorInSignature = 3,

  /**Чака приключване на пререгистрация*/
  WaitPreregistrationCompletion = 4,

  /**Готово за изпращане*/
  ReadyForSending = 5,

  /**Изпраща се*/
  Sending = 6,

  /**Прието*/
  Accepted = 7,

  /**Грешка при приемане*/
  ErrorInAccepting = 8,

  /**Приключен*/
  Completed = 9,
}
TypeSystem.registerEnumInfo(ProcessStatuses , 'ProcessStatuses' , moduleContext.moduleName);
