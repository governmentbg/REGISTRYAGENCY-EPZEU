import { BaseModuleInitializaitonContext } from 'Cnsys.Core';
import { breadcrumb, resourceManager } from 'EPZEU.Core';
import { Constants } from "EPZEU.PR.Core";
import { moduleContext } from './ModuleContext';

export function registerModule(initContext: BaseModuleInitializaitonContext): Promise<void> {
  moduleContext.initializeContext(initContext);
  initializeBreadcrumb();

  return resourceManager.loadResourcesByPrefixes(['PR']);
}
function initializeBreadcrumb() {
  breadcrumb.addBreadcrumbNodes([
    {
      pathPattern: Constants.PATHS.TAXES_CALCULATOR,
      text: resourceManager.getResourceByKey("PR_STATE FEE CALCULATOR_L"),
    }
  ]);
}
