import { ApplicationConfig } from 'Cnsys.Core'


/**Базов интерфейс на EPZEU за конфигурация на статични параметри на приложението, конфигурират се в _Layout.cshtml*/
export interface ApplicationConfigEPZEU extends ApplicationConfig {
    /**Базов адрес на EPZEU Api-то*/
    epzeuApiRoot: string;

    /**Базов адрес на публичния портал.*/
    epzeuPublicUIUrl: string;

    /**Пероид на неактивност на потребителска сесия*/
    userInactivityTimeout: number;

    /**Период на запазване на черновата на потребителя */
    appSaveIntervalInMs: number;

    /**Домейн адрес за сетване в cookie */
    commonCookieDomain: string;

    /**Пътища до страници*/
    paths: {
        incomingDocuments: string,
        outgoingDocuments: string,
        instructions: string,
        applicationProcesses: string,
        applicationDraftPreview: string,
        services: string,
        service: string,
        applications: string
    }
}

declare var applicationConfig: ApplicationConfigEPZEU;

export var appConfig = applicationConfig;