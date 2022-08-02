import { BaseLocalizationResources, BaseErrorLocalizationResources } from './Common'

export interface LocalizationResources extends BaseLocalizationResources {
    /**дни*/
    Days: string;
    /**часове*/
    Hours: string;
    /**минути*/
    Minutes: string;
    /**секунди*/
    Seconds: string;
    /**Затвори*/
    Close: string;
    /** Днешна дата */
    dateNow: string;
}

export interface LocalizationErorrs extends BaseErrorLocalizationResources {
    /**test*/
    test: string;

    /**Възникна грешка!*/
    Error: string;

    /** Грешка при зареждане на Xml-а. */
    XmlParseError: string;
}
