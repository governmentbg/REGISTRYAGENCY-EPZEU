import { BaseModuleInitializaitonContext } from 'Cnsys.Core'
import { breadcrumb, Nomenclatures, ModuleManager } from 'EPZEU.Core';
import { Constants } from 'EPZEU.PR.Core';
import * as epzeuPRAppBase from 'EPZEU.PR.ApplicationBase';
import { ApplicationFormTypes } from 'EPZEU.PR.Core';
import { moduleContext } from './ModuleContext';

export function registerModule(initContext: BaseModuleInitializaitonContext): Promise<void> {
  moduleContext.initializeContext(initContext);
  initializeBreadcrumb();

  return ModuleManager.registerModule(epzeuPRAppBase);
}

function initializeBreadcrumb() {
  breadcrumb.addBreadcrumbNodes([
    {
      pathPattern: Constants.PATHS.APPLICATION_PROCESSES,
      text: (pathParams) => {
        return Nomenclatures.getApplicationTypes(at => at.appType == ApplicationFormTypes[pathParams.applicationType].toString()).then(ats => {
          return ats && ats.length > 0 ? ats[0].name : null
        })
      },
      showMainNodeOnly: true
    },
  ]);
}

