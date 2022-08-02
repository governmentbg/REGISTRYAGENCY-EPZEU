import { TypedModuleContext, BaseModuleInitializaitonContext } from './Contexts/BaseModuleContext'
import { LocalizationResources, LocalizationErorrs } from './LocalizationResources'

class ModuleContext extends TypedModuleContext<BaseModuleInitializaitonContext, LocalizationResources, LocalizationErorrs> {    
    public get moduleName(): string {
        return 'Cnsys.Core';
    }    
}

export const moduleContext = new ModuleContext();