import { TypedModuleContext, BaseModuleInitializaitonContext } from 'Cnsys.Core'

class ModuleContext extends TypedModuleContext<BaseModuleInitializaitonContext, any, any> {
    public get moduleName(): string {
        return 'EPZEU.CR.Domain';
    }
}

export const moduleContext = new ModuleContext();