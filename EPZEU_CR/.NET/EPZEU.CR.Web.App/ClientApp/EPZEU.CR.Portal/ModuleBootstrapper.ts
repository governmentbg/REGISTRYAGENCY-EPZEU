import { BaseModuleInitializaitonContext } from 'Cnsys.Core';
import { appConfig, breadcrumb, CMS, Constants, epzeuAuthenticationService, Nomenclatures, PageTypes, Registers } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.CR.Core';
import { moduleContext } from './ModuleContext';

export function registerModule(initContext: BaseModuleInitializaitonContext): Promise<void> {
    moduleContext.initializeContext(initContext);
    initializeBreadcrumb();

    return epzeuAuthenticationService.init().then(r => {
        return Promise.resolve();
    });
}

function initializeBreadcrumb() {
    breadcrumb.addBreadcrumbNodes([
        {
            pathPattern: Constants.PATHS.SRV_APPLICATION_PROCESSES,
            text: (pathParams) => {
                return CMS.getPages(x => x.type == PageTypes.Application
                    && x.applicationType != null
                    && x.applicationType.appType == ApplicationFormTypes[pathParams.applicationType].toString()
                    && x.registerID == Registers.CR).then(pages => {
                        if (pages && pages.length == 1 && pages[0].applicationType) {
                            let applicationTypeCodeStr = pages[0].applicationType.appCode ? pages[0].applicationType.appCode + " " : "";
                            return applicationTypeCodeStr + pages[0].applicationType.name;
                        }
                        else {
                            return null;
                        }
                    })
            }
        },
        {
            pathPattern: appConfig.paths.service,
            text: (pathParams) => {
                return Nomenclatures.getServices(s => s.serviceID == +pathParams.serviceID).then(services => {
                    if (services && services.length == 1) {
                        let codeStr = services[0].serviceNumber ? services[0].serviceNumber + " " : "";
                        return codeStr + services[0].name;
                    }
                    else {
                        return null;
                    }
                })
            }
        }
    ]);
}