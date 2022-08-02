import * as React from "react";
import { observer } from "mobx-react";
import { observable, runInAction, action } from "mobx";
import * as moment from 'moment';
import { ObjectHelper, UrlHelper, appConfig } from "Cnsys.Core";
import { EPZEUBaseComponent, EPZEUPagination, IDataServiceProviderProps, withDataServiceProvider } from "EPZEU.Core";
import { withAsyncFrame, AsyncUIProps, BaseRouteProps, BaseRoutePropsExt, withRouter } from "Cnsys.UI.React";
import { LiquidationSearchCriteria, LiquidationSearchCriteriaValidator, ApplicationsService, EntriesResult } from 'EPZEU.CR.Core'
import { LiquidationSearchUI } from "./LiquidationSearchUI";
import { EntriesResultUI } from "../EntriesResultUI";

interface LiquidationUIProps extends BaseRouteProps<any>, AsyncUIProps, BaseRoutePropsExt, IDataServiceProviderProps {
}

@observer class LiquidationUIImpl extends EPZEUBaseComponent<LiquidationUIProps, null> {
    private isAlreadySearched: boolean;
    private searchCriteriaValidator: LiquidationSearchCriteriaValidator;
    private currentSearchCriteria: LiquidationSearchCriteria;
    private searchCriteria: LiquidationSearchCriteria;
    @observable private data: EntriesResult;

    constructor(props: LiquidationUIProps) {
        super(props);

        this.isAlreadySearched = false;
        this.searchCriteriaValidator = new LiquidationSearchCriteriaValidator();
        this.currentSearchCriteria = undefined;

        this.searchInternal = this.searchInternal.bind(this);
        this.onSearchResult = this.onSearchResult.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.convertSearchCriteriaToUrlParams = this.convertSearchCriteriaToUrlParams.bind(this);

        if (ObjectHelper.isStringNullOrEmpty(this.props.location.search)) {
            this.searchCriteria = new LiquidationSearchCriteria();
            this.searchCriteria.page = 1;
            this.searchCriteria.pageSize = appConfig.defaultPageSize;
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
                        <EntriesResultUI {...this.bind(this.data, 'deed')} />
                        <EPZEUPagination activePage={this.currentSearchCriteria.page} count={this.currentSearchCriteria.count} pagesCount={this.currentSearchCriteria.getPagesCount()} maxVisiblePage={10} size="sm" onSelect={this.onPageChange} />
                    </>);
            }
        }

        return (
            <>
                {/* Търговци/ЮЛНЦ в ликвидация */}
                <LiquidationSearchUI onSearchCallback={this.onSearchResult} {...this.bind(this.searchCriteria, 'searchCriteria', [this.searchCriteriaValidator])} />
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

    @action private searchInternal(criteria: LiquidationSearchCriteria, newSearch: boolean = true): Promise<void> {
        let that = this;

        if (this.searchCriteriaValidator.validate(criteria)) {
            let srv = this.props.dataSrvProvider.getDataService<ApplicationsService>(ApplicationsService);

            return srv.getLiquidations(criteria).then(res => {
                runInAction(() => {
                    that.isAlreadySearched = true;
                    if (newSearch) {
                        that.currentSearchCriteria = criteria.clone();
                    }

                    if (res && res.length > 0) {
                        that.data = new EntriesResult();
                        that.data.items = res;
                    } else {
                        that.data = undefined;
                    }

                    let urlParams = that.convertSearchCriteriaToUrlParams();
                    that.props.routerExt.changeParams(urlParams);
                });
            })
        }

        return Promise.resolve();
    }

    private getSearchCriteriaFromUrl(): LiquidationSearchCriteria {
        let searchCriteria = new LiquidationSearchCriteria();

        let page = UrlHelper.getUrlParameter('page');
        searchCriteria.page = !ObjectHelper.isStringNullOrEmpty(page) ? Number(page) : undefined;

        let count = UrlHelper.getUrlParameter('count');
        searchCriteria.count = !ObjectHelper.isStringNullOrEmpty(count) ? Number(count) : undefined;

        let fromDate = UrlHelper.getUrlParameter('dateFrom');
        searchCriteria.dateFrom = !ObjectHelper.isStringNullOrEmpty(fromDate) ? moment(new Date(fromDate)) : undefined;

        let toDate = UrlHelper.getUrlParameter('dateTo');
        searchCriteria.dateTo = !ObjectHelper.isStringNullOrEmpty(toDate) ? moment(new Date(toDate)) : undefined;

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
        urlParams['dateFrom'] = JSON.parse(JSON.stringify(this.currentSearchCriteria.dateFrom));
        urlParams['dateTo'] = JSON.parse(JSON.stringify(this.currentSearchCriteria.dateTo));
        urlParams['companyName'] = JSON.parse(JSON.stringify(this.currentSearchCriteria.companyName));
        urlParams['uic'] = JSON.parse(JSON.stringify(this.currentSearchCriteria.uic));

        return urlParams;
    }
}

export const LiquidationUI = withRouter(withDataServiceProvider(withAsyncFrame(LiquidationUIImpl)));