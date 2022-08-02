import { BaseModuleInitializaitonContext, TypedModuleContext } from 'Cnsys.Core';

class ModuleContext extends TypedModuleContext<BaseModuleInitializaitonContext, any, any> {
  public get moduleName(): string {
    return 'EPZEU.PR.ApplicationProcesses';
  }
}

export const moduleContext = new ModuleContext();
