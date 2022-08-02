import { BaseModuleInitializaitonContext } from 'Cnsys.Core'
import { breadcrumb, resourceManager } from 'EPZEU.Core';
import { Constants } from "EPZEU.PR.Core";
import { moduleContext } from './ModuleContext'

export function registerModule(initContext: BaseModuleInitializaitonContext): Promise<void> {
  moduleContext.initializeContext(initContext);
  initializeBreadcrumb();

  return resourceManager.loadResourcesByPrefixes(['PR']);
}
function initializeBreadcrumb() {
  breadcrumb.addBreadcrumbNodes([
    {
      pathPattern: Constants.PATHS.REPORTS + "/ApplicationsWithoutMovement",
      text: resourceManager.getResourceByKey("PR_GL_APPLICATIONS_TO_BE_CORRECTED_L"),
    },
    // {
    //   pathPattern: Constants.PATHS.REPORTS + "/UpcomingDealCheck",
    //   text: resourceManager.getResourceByKey("PR_GL_UPCOMING_DEAL_CHECK_L"),
    // },
    {
      pathPattern: Constants.PATHS.REPORTS + "/ApplicationStatusCheck",
      text: resourceManager.getResourceByKey("PR_GL_STATUS_CHECK_L"),
    },
    {
      pathPattern: Constants.PATHS.REPORTS + "/RegistryOfficeSearch",
      text: resourceManager.getResourceByKey("PR_GL_SEARCHING_FOR_REGISTRY_OFFICE_L"),
    },
  ]);
}
