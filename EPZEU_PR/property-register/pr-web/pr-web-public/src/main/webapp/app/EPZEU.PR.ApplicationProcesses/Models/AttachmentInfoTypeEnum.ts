import { moduleContext } from '../ModuleContext';
import { TypeSystem } from 'Cnsys.Core';

export enum AttachmentInfoTypeEnum {
  FILE = 1,
  JUDGE_RESOLUTION_TEXT = 2,
  REMARK_TEXT = 3,
  REFUSAL_TEXT = 4
}
TypeSystem.registerEnumInfo(AttachmentInfoTypeEnum, 'AttachmentInfoTypeEnum', moduleContext.moduleName)
