import { moduleContext } from '../ModuleContext';
import { TypeSystem } from 'Cnsys.Core';


export enum ApplicationFormTypes {
  ApplicationForCertificateForPerson = 43,
  ApplicationForCertificateForProperty = 73,
  ApplicationForCertificateForPeriodForPerson = 74,
  ApplicationForCertificateForPeriodForProperty = 77,
  ApplicationForCertifiedCopy = 75,
  ApplicationForNotCertifiedCopy = 76,
  ApplicationForDeclarationOfUpcomingDealWithProperty = 78,
  RequestForReportForDocument = 44,
  RequestForReportForAccountProperty = 45,
  RequestForReportForPerson = 46,
  RequestForReportForProperty = 62,
  RequestForReportForPersonInAllRegistryOffices = 81
}

TypeSystem.registerEnumInfo(ApplicationFormTypes, 'ApplicationFormTypes', moduleContext.moduleName);
