import { moduleContext } from '../ModuleContext';
import { TypeSystem } from 'Cnsys.Core';

export enum ApplicantType {
  PersonalQuality = 1,
  Attorney = 2,
  LegalRepresentative = 3,
  OfficialPerson = 4
}
TypeSystem.registerEnumInfo(ApplicantType, 'ApplicantType', moduleContext.moduleName)
