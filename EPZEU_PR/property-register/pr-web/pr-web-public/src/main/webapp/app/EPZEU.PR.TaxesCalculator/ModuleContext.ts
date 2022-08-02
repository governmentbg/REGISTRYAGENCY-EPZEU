import { TypedModuleContext, BaseModuleInitializaitonContext } from 'Cnsys.Core'

class ModuleContext extends TypedModuleContext<BaseModuleInitializaitonContext, any, any> {
    public get moduleName(): string {
      return 'EPZEU.PR.TaxesCalculator';
    }
}

export const moduleContext = new ModuleContext();
