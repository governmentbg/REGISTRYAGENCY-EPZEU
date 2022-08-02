//Modelules Bootstrappers
import { ErrorLevels, handleErrorLog, Logging, setDefaultErrorLevel } from 'Cnsys.Core';
import { appConfig, breadcrumb, CMS, ModuleManager, PageTypes, Registers, resourceManager } from 'EPZEU.Core';
import { Constants } from "EPZEU.PR.Core";

import * as moment from 'moment';
import * as numeral from 'numeral';
import * as oidc from 'oidc-client';

import * as core from 'Cnsys.Core';
import * as epzeuCore from 'EPZEU.Core';
import * as epzeuPRCore from 'EPZEU.PR.Core';
import * as portal from 'EPZEU.PR.Portal';


export class ApplicationBootstrapper {
  public static run(): Promise<boolean> {
    this.initializeLogging();

    var resourcesPromise = this.initResources();
    var modulesPromise = this.bootstrapperModules();

    setDefaultErrorLevel(ErrorLevels.Information);

    return Promise.all([resourcesPromise, modulesPromise]).then(args => {
      this.initializeBreadcrumb();
      return true;
    });
  }

  private static initResources(): Promise<void> {
    // //Когато се поддържа многоезична версия, тук трябва да слагаме езика на браузъра, ако го поддържаме.
    // moment.locale("bg");
    // numeral.locale("bg");

    // Логването в oidc ползва Array.from, което е от EcmaScript 6 и не се поддържа от IE. Затова го изключваме.
    oidc.Log.level = oidc.Log.NONE;


    //Динамично зареждане на локалите.
    if (appConfig.clientLanguage == 'bg') {
      numeral.locale(appConfig.clientLanguage);
      moment.locale(appConfig.clientLanguage);

      return resourceManager.loadResourcesByPrefixes([
        'GL', //- глобален ресурс за целия сайт
        'EP_GL', //– глобален ресурс в обсега на Електронният Портал
        'EP_SIGN', //- ресурси свързани с модула за подписване
        'PR',
        'EP_USR_EXTRENAL_USER_KIND_L', // в заявление за заверен препис - БА решиха да остане с тази представка и да се зарежда така
        'EP_DATE_APPLICATION_RECEPTION_L', // в справка за заявления без движения - БА решиха да остане с тази представка и да се зарежда така
        'EP_USR_AUTHENTICATION_KIND_L',
        'EP_APPL_SUBMISS_PERIOD_L' // Период на подаване на заявление
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
          'EP_SIGN', //- ресурси свързани с модула за подписване
          'PR',
          'EP_USR_EXTRENAL_USER_KIND_L', // в заявление за заверен препис - БА решиха да остане с тази представка и да се зарежда така
          'EP_USR_AUTHENTICATION_KIND_L',
          'EP_DATE_APPLICATION_RECEPTION_L' // в справка за заявления без движения - БА решиха да остане с тази представка и да се зарежда така
        ]);
      }).catch((err) => {
        //Това се прави за локализация по подразбиране когато не е намерената такава в локалите на момента.
        numeral.locale('bg');
        moment.locale('bg');

        return resourceManager.loadResourcesByPrefixes([
          'GL', //- глобален ресурс за целия сайт
          'EP_GL', //– глобален ресурс в обсега на Електронният Портал
          'EP_SIGN', //- ресурси свързани с модула за подписване
          'PR',
          'EP_USR_EXTRENAL_USER_KIND_L', // в заявление за заверен препис - БА решиха да остане с тази представка и да се зарежда така
          'EP_USR_AUTHENTICATION_KIND_L',
          'EP_DATE_APPLICATION_RECEPTION_L' // в справка за заявления без движения - БА решиха да остане с тази представка и да се зарежда така
        ]);
      });
    }

    return null;
  }

  private static bootstrapperModules(): Promise<void> {

    var corePromise = ModuleManager.registerModule(core);
    var epzeuCorePromise = ModuleManager.registerModule(epzeuCore);
    var epzeuPRCorePromise = ModuleManager.registerModule(epzeuPRCore);
    var portalPromise = ModuleManager.registerModule(portal);

    return Promise.all([corePromise, epzeuCorePromise, epzeuPRCorePromise, portalPromise])
      .then(args => { return Promise.resolve(); });
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

  //TODO do we need this
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

  //TODO do we need this
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

  private static initializeBreadcrumb() {
    breadcrumb.rootItems.push({
      path: appConfig.epzeuPublicUIUrl,
      text: resourceManager.getResourceByKey("GL_HOME_L"),
      isInternal: false
    });

    breadcrumb.rootItems.push({
      path: appConfig.epzeuPublicUIUrl + Constants.PATHS.PROPERTY_REGISTER,
      text: resourceManager.getResourceByKey("GL_PR_REG_NAME_L"),
      isInternal: false
    });

    breadcrumb.addBreadcrumbNodes([
      {
        pathPattern: Constants.PATHS.REPORTS,
        text: resourceManager.getResourceByKey("GL_REPORTS_L")
      },
      {
        pathPattern: Constants.PATHS.INCOMING_DOCUMENTS,
        text: resourceManager.getResourceByKey("GL_VIEW_APPLICATION_L"),
        showMainNodeOnly: true
      },
      {
        pathPattern: Constants.PATHS.APPLICATION_PREVIEW,
        text: resourceManager.getResourceByKey("GL_VIEW_APPLICATION_L"),
      }
    ]);

  }
}
