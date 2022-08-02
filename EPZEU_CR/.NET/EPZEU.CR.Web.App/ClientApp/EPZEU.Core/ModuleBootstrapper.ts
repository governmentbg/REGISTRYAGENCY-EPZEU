import { BaseModuleInitializaitonContext } from 'Cnsys.Core'
import { moduleContext } from './ModuleContext'

export function registerModule(initContext: BaseModuleInitializaitonContext): Promise<void> {
    moduleContext.initializeContext(initContext);

    //TODO: не работи да се види
    //return resourceManager.loadResourcesByPrefixes([
    //    'EP_FRM', //– глобален ресурс в обсега на Електронният Портал
    //]);

    return Promise.resolve();
}