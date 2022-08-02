import { appConfig } from "./ApplicationConfig";

export const BG_COUNTRY_ID: number = 1;

export const Constants = {
      /**BGR*/
    BG_COUNTRY_CODE: "BGR",
    CYRILLIC_LETTERS: ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ь', 'Ю', 'Я'],
    DIGITS: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    /**1000000*/
    MAX_PAGE_SIZE: 1000000,
    PATHS: {
        SRV_APPLICATION_PROCESSES: `/${appConfig.paths.service}/${appConfig.paths.applicationProcesses}/:applicationType/:applicationOrder?`.replace("//", "/").replace("//", "/")
    }
}