import { appConfig } from "./ApplicationConfig";
import { EventDispatcher } from "./EventDispatcher";
import { Dictionary } from "typescript-collections";
import { ObjectHelper } from "./ObjectHelper";

export interface PropertyPathItem {
    name: string,
    isIndexer: boolean
}

export namespace Helper {

    export function getPropertyNameBySelector<T>(selector: (model: T) => any): string {
        let match = Helper.regex.match(selector.toString(), 'return\\s([a-zA-Z_$][\\[\\]a-zA-Z0-9_$]*\\.?)+');

        if (match) {
            match = match.replace('return ', '').trim();

            if (match.indexOf('.') != -1) {
                match = match.substring(match.indexOf('.') + 1);
            }
            else if (match.indexOf('[') != -1) {
                match = match.substring(match.indexOf('['));
            }
            else {
                match = "";
            }

            return match;
        }
        else
            throw new Error("");
    }

    export function getPropertyPath(propertyPath: string): PropertyPathItem[] {
        let ret: PropertyPathItem[] = [];

        if (propertyPath) {

            var propChunksByDot: string[] = propertyPath.split('.');

            for (var chunk of propChunksByDot) {
                let currentIndex = 0;

                while (currentIndex < chunk.length - 1) {
                    let startArrayIndex = chunk.indexOf("[", currentIndex);

                    if (startArrayIndex != -1) {
                        /*Има начало на адресация в масив.*/

                        /*има пропърти преди масива*/
                        if (startArrayIndex != currentIndex) {
                            ret.push({ name: chunk.substring(currentIndex, startArrayIndex), isIndexer: false });
                        }

                        let endOfArrayIndex = chunk.indexOf("]", startArrayIndex);

                        ret.push({ name: chunk.substring(startArrayIndex + 1, endOfArrayIndex), isIndexer: true });

                        currentIndex = endOfArrayIndex;
                    }
                    else {
                        ret.push({ name: chunk, isIndexer: false });
                        currentIndex = chunk.length;
                    }
                }
            }
        }

        return ret;
    }

    export function getPropertyParentModel<T>(selector: (model: T) => any, model: T): any {
        var result: any = model;
        var propertyName = getPropertyNameBySelector(selector);

        if (propertyName) {
            var propertyChain = propertyName.split(".");

            for (var i = 0; i < propertyChain.length - 1; i++) {
                result = result[propertyChain[i]];
            }
        }

        return result;
    }

    export var regex = {
        isMatch: function (input: string, pattern: string, flags?: string): boolean {
            var patt = new RegExp(pattern, flags);
            //console.log(str, patt.test(str));
            return patt.test(input);
        },

        match: function (input: string, pattern: string, flags?: string): string | undefined {
            var patt = new RegExp(pattern, flags),
                matches = patt.exec(input);

            return matches ? matches[0] : undefined;
        }
    };

    export function loadScript(url: string, callback: (event?: any) => void) {
        var item = loadedScripts.getValue(url);

        if (item) {
            if (item.isLoaded) {
                callback();
            }
            else {
                eventDispatcher.addEventListener(item.eventKey, callback);
            }
        }
        else {
            // Adding the script tag to the head as suggested before
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';

            let srcUrl = UrlHelper.generateContentUrl(url);
            if (srcUrl) {
                script.src = srcUrl as string;
            }

            item = {
                url: url,
                eventKey: ObjectHelper.newGuid(),
                isLoaded: false
            };

            loadedScripts.setValue(url, item);

            eventDispatcher.addEventListener(item.eventKey, callback);

            // Then bind the event to the callback function.
            // There are several events for cross browser compatibility.
            script.onload = (event: any) => {
                item.isLoaded = true;

                eventDispatcher.dispatchEvent(item.eventKey, event);
            };

            // Fire the loading
            head.appendChild(script);
        }
    }

    var loadedScripts: Dictionary<string, LoadedScriptItem> = new Dictionary<string, LoadedScriptItem>();

    var eventDispatcher: EventDispatcher = new EventDispatcher();

    export function checkIfBrowserIsCompatibleToApplet(): boolean {
        let validFirefoxVersion: boolean = false;
        let firefoxStringIndex: number = navigator.userAgent.indexOf('Firefox/');
        if (firefoxStringIndex > 0) {
            let version: number = Number(navigator.userAgent.substring(firefoxStringIndex + 'Firefox/'.length));
            if (version < 52) {
                validFirefoxVersion = true;
            }
        }

        if (validFirefoxVersion || navigator.userAgent.indexOf('MSIE 9') > 0 || navigator.userAgent.indexOf('MSIE 10') > 0 || navigator.appVersion.indexOf('Trident/') > 0) {
            return true;
        }
        return false;
    }
}

export namespace UIHelper {

    export function isBrowserCompatibleWithPositionSticky() {
        const testNode = document.createElement("div");

        if (
            ['', '-webkit-', '-moz-', '-ms-'].some(prefix => {
                try {
                    testNode.style.position = prefix + 'sticky';
                }
                catch (e) { }

                return testNode.style.position == '';
            }))
            return false;

        return true;
    }

  // fieldset with attribute 'disabled' doesn't work in IE
    export function enableElement(id: string): void {
        $('#' + id).find('input, textarea, select, button').removeAttr('disabled');
    }

  // fieldset with attribute 'disabled' doesn't work in IE
    export function disableElement(id: string): void {
        $('#' + id).find('input, textarea, select, button').attr('disabled', 'disabled');
    }
}

export namespace UrlHelper {

    //конкатенира url с относителен път без дублирани '/'
    export function urlJoin(url: string, path: string): string {
        {
            if (!url || !path) {
                return "";
            }

            let cleanUrl: string = url;
            let cleanPath: string = path;

            //изчистваме / от края на url
            while (cleanUrl.slice(-1) == "/") {
                cleanUrl = cleanUrl.slice(0, -1);
            }

            //изчистваме / от началото на path
            while (cleanPath.slice(0, 1) == "/") {
                cleanPath = cleanPath.slice(1);
            }

            //изчистваме / от края на path
            while (cleanPath.slice(-1) == "/") {
                cleanPath = cleanPath.slice(0, -1);
            }

            return cleanUrl + '/' + cleanPath;
        }
    }

    /**Генерира линк за достъп до приложението*/
    export function generateLinkUrl(url: string): string | undefined {
        if (url) {
            var baseUrl = appConfig.baseUrlName;

            if (baseUrl.lastIndexOf("/") != baseUrl.length - 1) {
                baseUrl += "/";
            }

            if (!ObjectHelper.isStringNullOrEmpty(appConfig.clientLanguage) && appConfig.clientLanguage != "bg") {
                baseUrl += appConfig.clientLanguage + "/";
            }

            return url.replace("~/", baseUrl);
        }

        return undefined;
    }

    /**Генерира линк за достъп на ресурс ot api контролер*/
    export function generateContentUrl(url: string): string | undefined {
        if (url) {
            var baseUrl = appConfig.baseUrlName;

            if (baseUrl.lastIndexOf("/") != baseUrl.length - 1) {
                baseUrl += "/";
            }

            return url.replace("~/", baseUrl);
        }

        return undefined;
    }

    export function getUrlParameter(sParam: string): string | undefined {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1];
            }
        }

        return undefined;
    };

    /**
     * Това се прави заради MVC bindinga на Array
     * @param obj
     */
    export function createUrlQueryByObject(obj: any): any {
        let data: any;
        if (!$.isPlainObject(obj))
            data = JSON.parse(JSON.stringify(obj));
        else
            data = obj;

        let urlParams: any = {};

        for (let p in data) {
            if ($.isArray(data[p])) {
                for (let i: number = 0; i < data[p].length; i++) {
                    let tmpArrayItemName = p + '[' + i + ']';
                    urlParams[tmpArrayItemName] = data[p][i];
                }
            } else {
                urlParams[p] = data[p];
            }
        }

        return urlParams;
    }

    /**
     * Отваря станица в нов таб.
     * @param url
     */
    export function openInNewTab(url: string) {
        var win = undefined;

        try {
            win = window.open(url, '_blank');
        } catch (e) {
            //Когато браузърът ползва външен add-on за pop-up blocker window.open хвърля грешка.
            console.log(e);
            return;
        }

        //Когато браузърът ползва неговия build-in pop-up blocker window.open връща null.
        if (win) {
            win.focus();
        }
    }
}

interface LoadedScriptItem {
    url: string;
    eventKey: string;
    isLoaded: boolean;
}

