//Modelules Bootstrappers
import * as core from 'Cnsys.Core';
import { ErrorLevels, handleErrorLog, Logging, setDefaultErrorLevel } from 'Cnsys.Core';
import * as epzeuCore from 'EPZEU.Core';
import { appConfig, breadcrumb, CMS, ModuleManager, PageTypes, Registers, resourceManager } from 'EPZEU.Core';
import * as epzeuCRCore from 'EPZEU.CR.Core';
import { ApplicationFormTypes, Constants } from 'EPZEU.CR.Core';
import * as portal from 'EPZEU.CR.Portal';
import * as moment from "moment";
import * as numeral from 'numeral';
import * as oidc from 'oidc-client';


export class ApplicationBootstrapper {
    public static run(): Promise<boolean> {
        this.initializeLogging();

        var resourcesPromise = this.initResources();
        var modulesPromise = this.bootstrapperModules();

        setDefaultErrorLevel(ErrorLevels.Information);

        return Promise.all([resourcesPromise, modulesPromise]).bind(this).then(args => {
            this.initializeBreadcrumb();
            return true;
        });
    }

    private static initResources(): Promise<void> {
        // Логването в oidc ползва Array.from, което е от EcmaScript 6 и не се поддържа от IE. Затова го изключваме.
        oidc.Log.level = oidc.Log.NONE;

        //Динамично зареждане на локалите.
        if (appConfig.clientLanguage == 'bg') {
            numeral.locale(appConfig.clientLanguage);
            moment.locale(appConfig.clientLanguage);

            return resourceManager.loadResourcesByPrefixes([
                'GL', //- глобален ресурс за целия сайт
                'EP_GL', //– глобален ресурс в обсега на Електронният Портал
                'EP_SIGN', //– глобален ресурс за е-подписване.
                'CR_GL', //– глобален ресурс в обсега на Търговския портал
            ]);
        } else {
            let momentLocaleCode = this.getMomentLocale(appConfig.clientLanguage);
            let numeralLocaleCode = this.getNumeralLocale(appConfig.clientLanguage);

            return import(
                /* webpackInclude: /\.js$/ */
                /* webpackExclude: /\bg.js$/ */
                /* webpackChunkName: "moment-locales" */
                /* webpackMode: "lazy-once" */
                `moment/locale/${momentLocaleCode}.js`
            ).then(() => {
                numeral.locale(numeralLocaleCode);
                moment.locale(momentLocaleCode);

                return resourceManager.loadResourcesByPrefixes([
                    'GL', //- глобален ресурс за целия сайт
                    'EP_GL', //– глобален ресурс в обсега на Електронният Портал
                    'EP_SIGN', //– глобален ресурс за е-подписване.
                    'CR_GL', //– глобален ресурс в обсега на Търговския портал
                ]);
            }).catch((err) => {
                //Това се прави за локализация по подразбиране когато не е намерената такава в локалите на момента.
                numeral.locale('bg');
                moment.locale('bg');

                return resourceManager.loadResourcesByPrefixes([
                    'GL', //- глобален ресурс за целия сайт
                    'EP_GL', //– глобален ресурс в обсега на Електронният Портал
                    'EP_SIGN', //– глобален ресурс за е-подписване.
                    'CR_GL', //– глобален ресурс в обсега на Търговския портал
                ]);
            });
        }
    }

    private static bootstrapperModules(): Promise<void> {

        var corePromise = ModuleManager.registerModule(core);
        var epzeuCorePromise = ModuleManager.registerModule(epzeuCore);
        var epzeuCRCorePromise = ModuleManager.registerModule(epzeuCRCore);
        var portalPromise = ModuleManager.registerModule(portal);

        return Promise.all([corePromise, epzeuCorePromise, epzeuCRCorePromise, portalPromise]).then(args => { return Promise.resolve(); });
    }

    private static initializeLogging() {
        /*Init logging infrastructure*/
        Logging.clearAppenders();

        Logging.loadAppender("consoleLogAppender", Logging.BaseAppenderModules.consoleLogAppenderModule);

        Logging.addAppender(Logging.appenders.consoleLogAppender({ type: 'consoleLogAppender', category: 'cnsys' }));

        /*Set default global error handler*/
        window.onerror = function (message: string, filename?: string, lineno?: number, colno?: number, error?: Error) {
            handleErrorLog(error);
            return true;
        };
    }

    private static initializeBreadcrumb() {
        breadcrumb.rootItems.push({
            path: appConfig.epzeuPublicUIUrl,
            text: resourceManager.getResourceByKey("GL_HOME_L"),
            isInternal: false
        });

        breadcrumb.rootItems.push({
            path: appConfig.epzeuPublicUIUrl + 'commercial-register', //TODO: Изчитаме commercial-register от номенклатурата на адресите
            text: resourceManager.getResourceByKey("GL_CR_REG_NAME_L_SHORT_L"),
            isInternal: false
        });

        breadcrumb.addBreadcrumbNodes([
            {
                pathPattern: Constants.PATHS.REPORTS,
                text: resourceManager.getResourceByKey("GL_REPORTS_L")
            },
            {
                pathPattern: appConfig.paths.services,
                text: (pathParams) => {
                    return CMS.getPages(x => x.type == PageTypes.Service && x.parentID == null && x.registerID == Registers.CR).then(pages => {
                        return pages && pages.length == 1 ? pages[0].title : null
                    })
                },
            },
            {
                pathPattern: appConfig.paths.applications,
                text: (pathParams) => {
                    return CMS.getPages(x => x.type == PageTypes.Application && x.parentID == null && x.registerID == Registers.CR).then(pages => {
                        return pages && pages.length == 1 ? pages[0].title : null
                    })
                },
            },
            {
                pathPattern: Constants.PATHS.APPLICATION_PROCESSES,
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
                pathPattern: Constants.PATHS.INCOMING_DOCUMENTS,
                text: resourceManager.getResourceByKey("GL_VIEW_APPLICATION_L"),
                showMainNodeOnly: true
            },
            {
                pathPattern: Constants.PATHS.APPLICATION_DRAFT_PREVIEW,
                text: resourceManager.getResourceByKey("GL_VIEW_APPLICATION_L"),
                showMainNodeOnly: true
            }
        ]);
    }

    /**
     * Карта за връзка между двубуквения код на езиците в номенклатурата ни и имената на локалите на момента.
     * @param locale string
     */
    private static getMomentLocale(clientLang: string): string {
        if (!clientLang) return 'bg';

        switch (clientLang) {
            case ('en'): return 'en-gb';
            case ('hy'): return 'hy-am';
            case ('pa'): return 'pa-in';
            case ('tl'): return 'tl-ph';
            case ('zh'): return 'zh-cn';
            case ('pt'): return 'pt-pt';
            default: return clientLang;
        }
    }

    /**
     * Карта за връзка между двубуквения код на езиците в номенклатурата ни и имената на локалите на numeral.
     * @param locale string
     */
    private static getNumeralLocale(clientLang: string): string {
        if (!clientLang) return 'bg';

        switch (clientLang) {
            case ('en'): return 'en-gb';
            case ('da'): return 'da-dk';
            case ('nl'): return 'nl-nl';
            case ('zh'): return 'chs';
            case ('nb'): return 'no';
            case ('uk'): return 'uk-ua';
            default: return clientLang;
        }
    }
}