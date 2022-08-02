import { AjaxHelper, UrlHelper, ObjectHelper, TypeSystem } from '../Common';
import { ClientError, ApiError } from '../Models';
import { authenticationService } from './AuthenticationService';
import { moduleContext } from '../ModuleContext';
import { appConfig } from '../Common/ApplicationConfig';

export abstract class BaseDataService {

    protected baseUrl(): string {
        return UrlHelper.generateContentUrl("~/api/");
    }

    public get<T>(url: string, type: any, data?: any | string, headers?: any): Promise<T> {
        var settings: JQueryAjaxSettings;

        settings = { method: "GET", type: "GET", url: this.getFullUrl(url), data: data ? JSON.parse(JSON.stringify(data)) : null, headers: headers }

        return this.ajax<T>(settings, type);
    }

    public post<T>(url: string, type: any, data?: any | string): Promise<T> {
        var settings: JQueryAjaxSettings;

        settings = { method: "POST", type: "POST", url: this.getFullUrl(url), data: JSON.stringify(data) }

        return this.ajax<T>(settings, type);
    }

    public put<T>(url: string, type: any, data?: any | string): Promise<T> {
        var settings: JQueryAjaxSettings;

        settings = { method: "PUT", type: "PUT", url: this.getFullUrl(url), data: JSON.stringify(data) }

        return this.ajax<T>(settings, type);
    }

    public delete<T>(url: string, type: any, data?: any | string): Promise<T> {
        var settings: JQueryAjaxSettings;

        settings = { method: "DELETE", type: "DELETE", url: this.getFullUrl(url), data: JSON.stringify(data) }

        return this.ajax<T>(settings, type);
    }

    public ajax<T>(settings: JQueryAjaxSettings, type: any): Promise<T> {

        var promiseBind = {};

        /*Не се използват arrow функции, за да имаме достъп до this.*/
        var result = this.prepareAjaxSettings(settings).bind(promiseBind).then(function (setts) {
            var promiseBind = this;

            if (type) {
                var constructor = TypeSystem.getTypeInfo(type).ctor;

                return AjaxHelper.ajax<any>(settings).then(function (result) {

                    /*препредаваме данните от this, на ресултата. */
                    ObjectHelper.assign(promiseBind, this);

                    if (Array.isArray(result)) {
                        var elems = <any[]>result;
                        return elems.map(elem => new constructor(elem))
                    }
                    else {
                        if (result) {
                            return new constructor(result);
                        }
                        else {
                            return null;
                        }
                    }
                });
            }
            else {
                return AjaxHelper.ajax<T>(settings).then(function (result) {

                    /*препредаваме данните от this, на ресултата. */
                    ObjectHelper.assign(promiseBind, this);

                    return result;
                });
            }
        });

        result = result.catch((ex: any): any => {
            var error: ApiError;
            var xhr: JQueryXHR = ex;

            //Ако услугата връща 404 NotFound web методите връщат null
            if (xhr.status == 404) {
                /*препредаваме данните от xhr, на ресултата. */
                ObjectHelper.assign(promiseBind, { jqXHR: xhr });

                return null;
            } else if (xhr.status == 429) {
                error = new ApiError(moduleContext.resourceManager.getResourceByKey('GL_TOO_MANY_REQUESTS_E'), xhr.status);
                error.treatAsWarning = true;
            } else if (ex.responseJSON && ex.responseText) {
                error = new ApiError(xhr.responseJSON);
                error.httpStatusCode = xhr.status;
            } else if (ex.readyState == 0 && ex.statusText == "error") {
                error = new ApiError(moduleContext.resourceManager.getResourceByKey('GL_ERROR_L'), 500);

            } else {
                throw new ClientError(ex);
            }

            throw error;
        });

        return result;
    }

    protected getFullUrl(url: string): string {
        if (!url)
            return this.baseUrl();

        if (url[0] == "/") {
            return this.baseUrl() + url;

        } else if (url.indexOf("http") == 0)
            return url;

        return this.baseUrl() + "/" + url;
    }

    protected prepareAjaxSettings(settings: JQueryAjaxSettings): Promise<JQueryAjaxSettings> {

        if (!settings.headers) {
            settings.headers = {};
        }

        if (!settings.headers["Content-Type"] && !settings.headers["encType"]) {
            settings.headers["Content-Type"] = "application/json; charset=utf-8";
        }

        //Поставяме езика на клиента в хедъра
        settings.headers["Accept-Language"] = appConfig.clientLanguage;

        return this.GetHttpAuthorizationHeader().then(header => {

            if (header) {
                settings.headers["Authorization"] = header;
            }
            return settings;
        });
    }

    protected GetHttpAuthorizationHeader(): Promise<string> {

        return authenticationService.GetUserAccessToken().then((token: string) => {

            if (token) {
                return "Bearer " + token;
            }
            return null;
        });
    }
}