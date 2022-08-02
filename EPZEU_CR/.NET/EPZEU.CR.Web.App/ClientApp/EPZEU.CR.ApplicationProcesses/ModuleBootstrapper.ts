import { BaseModuleInitializaitonContext } from 'Cnsys.Core';
import * as crDomain from 'EPZEU.CR.Domain';
import { moduleContext } from './ModuleContext';
import { ModuleManager } from 'EPZEU.Core';

export function registerModule(initContext: BaseModuleInitializaitonContext): Promise<void> {

    moduleContext.initializeContext(initContext);

    return ModuleManager.registerModule(crDomain);
}