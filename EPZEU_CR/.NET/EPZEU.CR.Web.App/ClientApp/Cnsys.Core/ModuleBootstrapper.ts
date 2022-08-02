import { BaseModuleInitializaitonContext } from './Contexts/BaseModuleContext'
import { moduleContext } from './ModuleContext'

export function registerModule(initContext: BaseModuleInitializaitonContext): Promise<void> {
    if (initContext && initContext.validatorRegistry) {
        //add validators to validatorRegistry hear
        //Example: initParams.validatorRegistry.addValidator('fullModelName', new TestValidator())           
    }

    moduleContext.initializeContext(initContext);

    return Promise.resolve();
}