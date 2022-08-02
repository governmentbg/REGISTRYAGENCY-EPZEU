import { ObjectHelper, UrlHelper, appConfig } from "Cnsys.Core";
import { AsyncUIProps, BaseRouteProps, BaseRoutePropsExt, withAsyncFrame, withRouter } from "Cnsys.UI.React";
import { EPZEUBaseComponent, EPZEUPagination, IDataServiceProviderProps, withDataServiceProvider } from "EPZEU.Core";
import { action, observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { VerificationPersonOrgResultFilters } from "../../Models/Enums";
import { VerificationPersonOrgSearchValidator } from "../../Models/Validation/VerificationPersonOrgSearchValidator";
import { VerificationPersonOrgResult } from "../../Models/VerificationPersonOrgResult";
import { VerificationPersonOrgSearch } from "../../Models/VerificationPersonOrgSearch";
import { DeedsDataService } from '../../Services/DeedsDataService';
import { VerificationPersonOrgResultUI } from "./VerificationPersonOrgResultUI";
import { VerificationPersonOrgSearchUI } from "./VerificationPersonOrgSearchUI";

interface VerificationPersonOrgUIProps extends BaseRouteProps<any>, AsyncUIProps, BaseRoutePropsExt, IDataServiceProviderProps {
}

@observer class VerificationPersonOrgUIImpl extends EPZEUBaseComponent<VerificationPersonOrgUIProps, null> {
    @observable private isAlreadySearched: boolean;
    @observable private currentSearchCriteria: VerificationPersonOrgSearch;
    @observable private searchCriteria: VerificationPersonOrgSearch;
    @observable private data: VerificationPersonOrgResult;

    constructor(props: VerificationPersonOrgUIProps) {
        super(props);

        //Bind
        this.searchInternal = this.searchInternal.bind(this);
        this.onSearchResult = this.onSearchResult.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.convertSearchCriteriaToUrlParams = this.convertSearchCriteriaToUrlParams.bind(this);

        //Init
        this.isAlreadySearched = false;
        this.currentSearchCriteria = undefined;

        if (ObjectHelper.isStringNullOrEmpty(this.props.location.search)) {
            this.searchCriteria = new VerificationPersonOrgSearch();
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
                        <br />
                        <EPZEUPagination activePage={this.currentSearchCriteria.page} count={this.currentSearchCriteria.count} pagesCount={this.currentSearchCriteria.getPagesCount()} maxVisiblePage={10} size="sm" onSelect={this.onPageChange} aditionalCssClass="pagination-container--page-top" />
                        <VerificationPersonOrgResultUI {...this.bind(this.data, 'deed')} includeHistory={this.currentSearchCriteria.includeHistory} />
                        <EPZEUPagination activePage={this.currentSearchCriteria.page} count={this.currentSearchCriteria.count} pagesCount={this.currentSearchCriteria.getPagesCount()} maxVisiblePage={10} size="sm" onSelect={this.onPageChange} />
                    </>);
            }
        }

        return (
            <>
                {/*Справка по физическо или юридическо лице */}
                <VerificationPersonOrgSearchUI onSearchCallback={this.onSearchResult} {...this.bind(this.searchCriteria, 'searchCriteria', [new VerificationPersonOrgSearchValidator()])} />
                {dataResult}
            </>);
    }

    @action private onSearchResult(): void {
        this.searchCriteria.page = 1;
        this.props.registerAsyncOperation(this.searchInternal(this.searchCriteria));
    }

    @action private onPageChange(page: any): void {
        this.currentSearchCriteria.page = page;
        this.props.registerAsyncOperation(this.searchInternal(this.currentSearchCriteria, false));
    }

    @action private searchInternal(criteria: VerificationPersonOrgSearch, newSearch: boolean = true): Promise<void> {
        let that = this;

        if ((new VerificationPersonOrgSearchValidator()).validate(criteria)) {
            let dataSrv: DeedsDataService = this.props.dataSrvProvider.getDataService<DeedsDataService>(DeedsDataService);

            return dataSrv.getVerificationPersonOrg(criteria).then(res => {
                runInAction(() => {
                    that.isAlreadySearched = true;
                    if (newSearch) {
                        that.currentSearchCriteria = criteria.clone();
                    }

                    if (res && res.length > 0) {
                        that.data = new VerificationPersonOrgResult();
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

    private getSearchCriteriaFromUrl(): VerificationPersonOrgSearch {
        let searchCriteria = new VerificationPersonOrgSearch();

        let page = UrlHelper.getUrlParameter('page');
        searchCriteria.page = !ObjectHelper.isStringNullOrEmpty(page) ? Number(page) : undefined;

        let count = UrlHelper.getUrlParameter('count');
        searchCriteria.count = !ObjectHelper.isStringNullOrEmpty(count) ? Number(count) : undefined;

        let pageSize = UrlHelper.getUrlParameter('pageSize');
        searchCriteria.pageSize = !ObjectHelper.isStringNullOrEmpty(pageSize) ? Number(pageSize) : undefined;

        searchCriteria.name = UrlHelper.getUrlParameter('name');
        searchCriteria.ident = UrlHelper.getUrlParameter('ident');

        let includeHistory = UrlHelper.getUrlParameter('includeHistory');
        searchCriteria.includeHistory = (includeHistory && includeHistory.toLowerCase() === 'true') ? true : false;

        let filter = UrlHelper.getUrlParameter('selectedSearchFilter');
        searchCriteria.selectedSearchFilter = ObjectHelper.isStringNullOrEmpty(filter) ? VerificationPersonOrgResultFilters.PhysicalForm : Number(filter);

        return searchCriteria;
    }

    private convertSearchCriteriaToUrlParams(): any {
        let urlParams: any = {};

        urlParams['page'] = this.currentSearchCriteria.page.toString();
        urlParams['pageSize'] = this.currentSearchCriteria.pageSize.toString();
        urlParams['count'] = this.currentSearchCriteria.count.toString();
        urlParams['name'] = this.currentSearchCriteria.name;
        urlParams['ident'] = this.currentSearchCriteria.ident;
        urlParams['includeHistory'] = this.currentSearchCriteria.includeHistory;
        urlParams['selectedSearchFilter'] = this.currentSearchCriteria.selectedSearchFilter.toString();

        return urlParams;
    }
}

export const VerificationPersonOrgUI = withRouter(withAsyncFrame(withDataServiceProvider(VerificationPersonOrgUIImpl)));