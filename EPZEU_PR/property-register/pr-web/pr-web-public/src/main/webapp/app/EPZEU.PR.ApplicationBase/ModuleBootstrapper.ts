import {BaseModuleInitializaitonContext} from 'Cnsys.Core'
import {moduleContext} from './ModuleContext'

export function registerModule(initContext: BaseModuleInitializaitonContext): Promise<void> {
  moduleContext.initializeContext(initContext);

  return Promise.resolve();
}
