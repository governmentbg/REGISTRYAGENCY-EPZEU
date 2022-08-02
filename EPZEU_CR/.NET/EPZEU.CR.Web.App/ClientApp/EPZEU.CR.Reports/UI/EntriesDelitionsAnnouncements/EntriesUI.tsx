import * as React from "react";
import { observer } from "mobx-react";
import { observable, runInAction, action } from "mobx";
import * as moment from 'moment';
import { ObjectHelper, UrlHelper, appConfig } from "Cnsys.Core";
import { EPZEUBaseComponent, EPZEUPagination, IDataServiceProviderProps, withDataServiceProvider } from "EPZEU.Core";
import { withAsyncFrame, AsyncUIProps, BaseRouteProps, BaseRoutePropsExt, withRouter } from "Cnsys.UI.React";
import { EntriesSearchCriteria, EntriesSearchCriteriaValidator, EntriesResult, ApplicationsService } from 'EPZEU.CR.Core'
import { EntriesSearchUI } from "./EntriesSearchUI";
import { EntriesResultUI } from "../EntriesResultUI";

interface EntriesUIProps extends BaseRouteProps<any>, AsyncUIProps, BaseRoutePropsExt, IDataServiceProviderProps {
}

@observer class EntriesUIImpl extends EPZEUBaseComponent<EntriesUIProps, null> {
    private searchCriteriaValidator: EntriesSearchCriteriaValidator;

    @observable private currentSearchCriteria: EntriesSearchCriteria;
    @observable private searchCriteria: EntriesSearchCriteria;
    @observable private data: EntriesResult;
    @observable private isAlreadySearched: boolean;

    constructor(props: EntriesUIProps) {
        super(props);

        this.isAlreadySearched = false;
        this.searchCriteriaValidator = new EntriesSearchCriteriaValidator();
        this.currentSearchCriteria = undefined;

        this.searchInternal = this.searchInternal.bind(this);
        this.onSearchResult = this.onSearchResult.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.convertSearchCriteriaToUrlParams = this.convertSearchCriteriaToUrlParams.bind(this);

        if (ObjectHelper.isStringNullOrEmpty(this.props.location.search)) {
            this.searchCriteria = new EntriesSearchCriteria();
            this.searchCriteria.page = 1;
            this.searchCriteria.pageSize = appConfig.defaultPageSize;
            this.searchCriteria.dateFrom = moment().startOf('day');
            this.searchCriteria.dateTo = moment().endOf('day');
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
                {/* Вписвания, заличавания и обявявания */}
                <EntriesSearchUI onSearchCallback={this.onSearchResult} {...this.bind(this.searchCriteria, 'searchCriteria', [this.searchCriteriaValidator])} />
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

    @action private searchInternal(criteria: EntriesSearchCriteria, newSearch: boolean = true): Promise<void> {
        let that = this;
        let srv = this.props.dataSrvProvider.getDataService<ApplicationsService>(ApplicationsService);

        if (this.searchCriteriaValidator.validate(criteria)) {
            return srv.getEntries(criteria).then(res => {
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

    private getSearchCriteriaFromUrl(): EntriesSearchCriteria {
        let searchCriteria = new EntriesSearchCriteria();

        let page = UrlHelper.getUrlParameter('page');
        searchCriteria.page = !ObjectHelper.isStringNullOrEmpty(page) ? Number(page) : undefined;

        let count = UrlHelper.getUrlParameter('count');
        searchCriteria.count = !ObjectHelper.isStringNullOrEmpty(count) ? Number(count) : undefined;

        let fromDate = UrlHelper.getUrlParameter('dateFrom');
        searchCriteria.dateFrom = !ObjectHelper.isStringNullOrEmpty(fromDate) ? moment(new Date(fromDate)) : undefined;

        let toDate = UrlHelper.getUrlParameter('dateTo');
        searchCriteria.dateTo = !ObjectHelper.isStringNullOrEmpty(toDate) ? moment(new Date(toDate)) : undefined;

        return searchCriteria;
    }

    private convertSearchCriteriaToUrlParams(): any {
        let urlParams: any = {};

        urlParams['page'] = this.currentSearchCriteria.page.toString();
        urlParams['pageSize'] = this.currentSearchCriteria.pageSize.toString();
        urlParams['count'] = this.currentSearchCriteria.count.toString();
        urlParams['dateFrom'] = JSON.parse(JSON.stringify(this.currentSearchCriteria.dateFrom));
        urlParams['dateTo'] = JSON.parse(JSON.stringify(this.currentSearchCriteria.dateTo));

        return urlParams;
    }
}

export const EntriesUI = withRouter(withDataServiceProvider(withAsyncFrame(EntriesUIImpl)));