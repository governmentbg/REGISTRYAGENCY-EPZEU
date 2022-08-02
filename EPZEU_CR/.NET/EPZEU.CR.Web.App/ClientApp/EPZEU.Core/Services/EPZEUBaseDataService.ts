import { BaseDataService, ObjectHelper } from 'Cnsys.Core';
import { IRequestLimiterContext } from './IRequestLimiterContext';

export abstract class EPZEUBaseDataService extends BaseDataService {
    protected limiterContext: IRequestLimiterContext;

    constructor(limiterContext: IRequestLimiterContext) {
        super();

        this.limiterContext = limiterContext;
    }
  
    public get<T>(url: string, type: any, data?: any | string, headers?: any): Promise<T> {
        let that = this;

        if (!ObjectHelper.isStringNullOrEmpty(this.limiterContext.headerValue)) {

            if (!headers) headers = {};

            headers[this.limiterContext.headerKey] = this.limiterContext.headerValue;
        }

        return super.get<T>(url, type, data, headers).then(function (value) {

            var contextLimiterToken = this.jqXHR.getResponseHeader(that.limiterContext.headerKey);

            if (contextLimiterToken)
                that.limiterContext.headerValue = contextLimiterToken;

            return value;
        });
    }
}