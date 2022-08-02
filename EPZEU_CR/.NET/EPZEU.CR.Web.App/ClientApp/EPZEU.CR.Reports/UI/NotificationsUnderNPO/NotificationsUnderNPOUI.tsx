import * as React from "react";
import { observer } from "mobx-react";
import { observable, runInAction, action } from "mobx";
import * as moment from 'moment';
import { ObjectHelper, UrlHelper, appConfig } from "Cnsys.Core";
import { EPZEUBaseComponent, EPZEUPagination, IDataServiceProviderProps, withDataServiceProvider } from "EPZEU.Core";
import { withAsyncFrame, AsyncUIProps, BaseRouteProps, BaseRoutePropsExt, withRouter } from "Cnsys.UI.React";
import { NotificationsUnderNPOSearchUI } from './NotificationsUnderNPOSearchUI';
import { NotificationsUnderNPOResultUI } from './NotificationsUnderNPOResultUI'
import { NotificationsUnderNPOSearchCriteria } from '../../Models/NotificationsUnderNPOSearchCriteria';
import { NotificationTypes } from '../../Models/Enums';
import { NotificationsUnderNPOSearchCriteriaValidator } from '../../Models/Validation/NotificationsUnderNPOSearchCriteriaValidator';
import { DeedsDataService } from '../../Services/DeedsDataService';
import { NotificationResult } from '../../Models/NotificationResult';

interface NotificationsUnderNPOUIProps extends BaseRouteProps<any>, AsyncUIProps, BaseRoutePropsExt, IDataServiceProviderProps {
}

@observer class NotificationsUnderNPOUIImpl extends EPZEUBaseComponent<NotificationsUnderNPOUIProps, null> {
    private isAlreadySearched: boolean;
    private searchCriteriaValidator: NotificationsUnderNPOSearchCriteriaValidator;
    private currentSearchCriteria: NotificationsUnderNPOSearchCriteria;
    private searchCriteria: NotificationsUnderNPOSearchCriteria;
    @observable private data: NotificationResult;

    constructor(props: NotificationsUnderNPOUIProps) {
        super(props);

        //Bind
        this.searchInternal = this.searchInternal.bind(this);
        this.onSearchResult = this.onSearchResult.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.convertSearchCriteriaToUrlParams = this.convertSearchCriteriaToUrlParams.bind(this);

        //Init
        this.isAlreadySearched = false;
        this.searchCriteriaValidator = new NotificationsUnderNPOSearchCriteriaValidator();
        this.currentSearchCriteria = undefined;

        if (ObjectHelper.isStringNullOrEmpty(this.props.location.search)) {
            this.searchCriteria = new NotificationsUnderNPOSearchCriteria();
            this.searchCriteria.page = 1;
            this.searchCriteria.pageSize = appConfig.defaultPageSize;
            this.searchCriteria.notificationType = NotificationTypes.NotificationsUnderNPO;
        } else {
            this.searchCriteria = this.getSearchCriteriaFromUrl();
            this.searchCriteria.page = this.searchCriteria.page ? this.searchCriteria.page : 1;
            this.searchCriteria.pageSize = appConfig.defaultPageSize;

            this.props.registerAsyncOperation(this.searchInternal(this.searchCriteria));
        }
    }

    render(): JSX.Element {
        let dataResult: any = null;

        if ((!this.props.asyncErrorMessages || this.props.asyncErrorMessages.length == 0)) {
            if (this.isAlreadySearched && !this.data) {
                dataResult = (<div className="alert alert-info">{this.getResource('GL_NOT_FOUND_RESULTS_E')}</div>);
            }

            if (this.data) {
                dataResult = (
                    <>
                        <EPZEUPagination activePage={this.currentSearchCriteria.page} count={this.currentSearchCriteria.count} pagesCount={this.currentSearchCriteria.getPagesCount()} maxVisiblePage={10} size="sm" onSelect={this.onPageChange} aditionalCssClass="pagination-container--page-top" />
                        <NotificationsUnderNPOResultUI {...this.bind(this.data, 'result')} />
                        <EPZEUPagination activePage={this.currentSearchCriteria.page} count={this.currentSearchCriteria.count} pagesCount={this.currentSearchCriteria.getPagesCount()} maxVisiblePage={10} size="sm" onSelect={this.onPageChange} />
                    </>);
            }
        }

        return (
            <>
                {/* Справка уведомления по чл. 44а от ЗЮЛНЦ */}
                <NotificationsUnderNPOSearchUI onSearchCallback={this.onSearchResult} {...this.bind(this.searchCriteria, 'searchCriteria', [this.searchCriteriaValidator])} />
                <br />
                {dataResult}
            </>);
    }

    @action private onSearchResult(): void {
        this.searchCriteria.page = 1;
        this.props.registerAsyncOperation(this.searchInternal(this.searchCriteria));
    }

    private onPageChange(page: any): void {
        this.currentSearchCriteria.page = page;
        this.props.registerAsyncOperation(this.searchInternal(this.currentSearchCriteria, false));
    }

    @action private searchInternal(criteria: NotificationsUnderNPOSearchCriteria, newSearch: boolean = true): Promise<void> {
        let that = this;

        if (this.searchCriteriaValidator.validate(criteria)) {
            let srv = this.props.dataSrvProvider.getDataService<DeedsDataService>(DeedsDataService);

            return srv.getNotificationsUnderNPO(criteria).then(res => {
                runInAction(() => {
                    that.isAlreadySearched = true;
                    if (newSearch) {
                        that.currentSearchCriteria = criteria.clone();
                    }

                    if (res && res.length > 0) {
                        that.data = new NotificationResult();
                        that.data.items = res;
                    } else {
                        that.data = undefined;
                    }

                    let urlParams = that.convertSearchCriteriaToUrlParams();
                    that.props.routerExt.changeParams(urlParams);
                });
            });
        }

        return Promise.resolve();
    }

    private getSearchCriteriaFromUrl(): NotificationsUnderNPOSearchCriteria {
        let searchCriteria = new NotificationsUnderNPOSearchCriteria();
        searchCriteria.notificationType = NotificationTypes.NotificationsUnderNPO;

        let page = UrlHelper.getUrlParameter('page');
        searchCriteria.page = !ObjectHelper.isStringNullOrEmpty(page) ? Number(page) : undefined;

        let count = UrlHelper.getUrlParameter('count');
        searchCriteria.count = !ObjectHelper.isStringNullOrEmpty(count) ? Number(count) : undefined;

        let fromDate = UrlHelper.getUrlParameter('entryDateFrom');
        searchCriteria.entryDateFrom = !ObjectHelper.isStringNullOrEmpty(fromDate) ? moment(new Date(fromDate)) : undefined;

        let toDate = UrlHelper.getUrlParameter('entryDateTo');
        searchCriteria.entryDateTo = !ObjectHelper.isStringNullOrEmpty(toDate) ? moment(new Date(toDate)) : undefined;

        let companyName = UrlHelper.getUrlParameter('companyName');
        searchCriteria.companyName = !ObjectHelper.isStringNullOrEmpty(companyName) ? companyName : undefined;

        let uic = UrlHelper.getUrlParameter('uic');
        searchCriteria.uic = !ObjectHelper.isStringNullOrEmpty(uic) ? uic : undefined;

        return searchCriteria;
    }

    private convertSearchCriteriaToUrlParams(): any {
        let urlParams: any = {};

        urlParams['page'] = this.currentSearchCriteria.page.toString();
        urlParams['pageSize'] = this.currentSearchCriteria.pageSize.toString();
        urlParams['count'] = this.currentSearchCriteria.count.toString();
        urlParams['entryDateFrom'] = JSON.parse(JSON.stringify(this.currentSearchCriteria.entryDateFrom));
        urlParams['entryDateTo'] = JSON.parse(JSON.stringify(this.currentSearchCriteria.entryDateTo));
        urlParams['companyName'] = JSON.parse(JSON.stringify(this.currentSearchCriteria.companyName));
        urlParams['uic'] = JSON.parse(JSON.stringify(this.currentSearchCriteria.uic));

        return urlParams;
    }
}

export const NotificationsUnderNPOUI = withRouter(withDataServiceProvider(withAsyncFrame(NotificationsUnderNPOUIImpl)));