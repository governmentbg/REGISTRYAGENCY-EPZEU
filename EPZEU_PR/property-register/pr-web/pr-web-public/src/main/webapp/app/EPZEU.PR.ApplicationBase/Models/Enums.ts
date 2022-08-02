import { TypeSystem } from 'Cnsys.Core'
import { moduleContext } from '../ModuleContext'

export enum ServiceTypes {

  GL_SERVICE_TYPE_ORDINARY_L = 1,

  GL_SERVICE_TYPE_FAST_L = 2,

  GL_SERVICE_TYPE_EXPRESS_L = 3
}
TypeSystem.registerEnumInfo(ServiceTypes, 'ServiceTypes', moduleContext.moduleName);


export enum PersonType {
  INDIVIDUAL = 1,
  LEGAL_ENTITY = 2,
}

TypeSystem.registerEnumInfo(PersonType, 'PersonType', moduleContext.moduleName);

export enum IndentTypes {

  Undefined = 0,

  EGN = 1,

  LNCH = 2,

  BirthDate = 3,
}

TypeSystem.registerEnumInfo(IndentTypes, 'IndentTypes', moduleContext.moduleName);

export enum DocumentTypeLabels {
  //In typescript to get enum pairs by string it works only for keys
  //that means to get label via id, id have to be key and label is value
  //example let docTypeLabel = DocumentTypeLabels[docTypeId];

  "20001100000000000001" = "PR_SCANNED_ACT_L",
  "20001100000000002005" = "PR_CERTIFICATE_L",
  "20001100000000002006" = "PR_JUDGE_RESOLUTION_L"
}
TypeSystem.registerEnumInfo(DocumentTypeLabels, 'DocumentTypeLabels', moduleContext.moduleName);
