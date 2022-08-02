import { TypeSystem } from "Cnsys.Core";
import { moduleContext } from "../ModuleContext";

export enum ApplicationStatusEnum {
  /**Прието*/
  ACCEPTED = 1,

  /**Чака регистриране*/
  WAITING_FOR_REGISTRATION = 2,

  /**Обработва се*/
  IN_PROCESS = 3,

  /**Чака плащане*/
  WAITING_FOR_PAYMENT = 4,

  /**Прекратено*/
  TERMINATED = 5,

  /**Изпълнено*/
  COMPLETED = 6,

  /**Прекратен процес*/
  PROCESS_TERMINATED = 8,

  //Certificate Statuses

  /**Регистрирано*/
  REGISTERED_CERTIFICATE = 301,

  /**Без движение*/
  WITHOUT_MOVEMENT = 305,

  /**Без движение - за преразглеждане*/
  WITHOUT_MOVEMENT_FOR_REVIEW = 306,

  /**Анулирано*/
  CANCELED = 304,

  /**В процес на издаване*/
  IN_PROCESS_OF_ISSUE = 302,

  /**Издадено*/
  ISSUED_CERTIFICATE = 303,

  /**Отказано*/
  REFUSAL_TO_ISSUE_CERTIFICATE = 307,
  //Certified and Not Certified Copies Statuses

  /**Регистриран*/
  REGISTERED_ACT = 501,

  /**Издаден*/
  ISSUED_ACT = 502,

  /**С постановен отказ*/
  WITH_A_REFUSAL = 503,

  /**Няма намерени данни*/
  NO_DATA_FOUND = 504,

  //Upcoming deal

  /**Регистрирана*/
  REGISTERED_DEAL = 7,

  /**Регистриран*/
  REGISTERED = 101,
}

TypeSystem.registerEnumInfo(ApplicationStatusEnum, 'ApplicationStatusEnum', moduleContext.moduleName)
