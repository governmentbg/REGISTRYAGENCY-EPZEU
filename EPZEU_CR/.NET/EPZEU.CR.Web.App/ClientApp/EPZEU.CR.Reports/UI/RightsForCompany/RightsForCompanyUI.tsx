import * as React from "react";
import { observer } from "mobx-react";
import { observable, runInAction, action } from "mobx";
import { ObjectHelper, UrlHelper, appConfig } from "Cnsys.Core";
import { EPZEUBaseComponent, EPZEUPagination, IDataServiceProviderProps, withDataServiceProvider } from "EPZEU.Core";
import { withAsyncFrame, AsyncUIProps, BaseRouteProps, BaseRoutePropsExt, withRouter } from "Cnsys.UI.React";
import { DeedsDataService } from '../../Services/DeedsDataService';
import { RightsForCompanySearchValidator } from "../../Models/Validation/RightsForCompanySearchValidator";
import { RightsForCompanySearch } from "../../Models/RightsForCompanySearch";
import { RightsForCompanyResult } from "../../Models/RightsForCompanyResult";
import { RightsForCompanySearchUI } from "./RightsForCompanySearchUI";
import { RightsForCompanyResultUI } from "./RightsForCompanyResultUI";

interface RightsForCompanyUIProps extends BaseRouteProps<any>, AsyncUIProps, BaseRoutePropsExt, IDataServiceProviderProps {
}

@observer class RightsForCompanyUIImpl extends EPZEUBaseComponent<RightsForCompanyUIProps, null> {
    private isAlreadySearched: boolean;
    private searchCriteriaValidator: RightsForCompanySearchValidator;
    @observable private currentSearchCriteria: RightsForCompanySearch;
    @observable private searchCriteria: RightsForCompanySearch;
    @observable private data: RightsForCompanyResult;

    constructor(props: RightsForCompanyUIProps) {
        super(props);

        this.isAlreadySearched = false;
        this.searchCriteriaValidator = new RightsForCompanySearchValidator();
        this.currentSearchCriteria = undefined;

        this.searchInternal = this.searchInternal.bind(this);
        this.onSearchResult = this.onSearchResult.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.convertSearchCriteriaToUrlParams = this.convertSearchCriteriaToUrlParams.bind(this);

        if (ObjectHelper.isStringNullOrEmpty(this.props.location.search)) {
            this.searchCriteria = new RightsForCompanySearch();
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
                        <RightsForCompanyResultUI {...this.bind(this.data, 'data')} />
                        <EPZEUPagination activePage={this.currentSearchCriteria.page} count={this.currentSearchCriteria.count} pagesCount={this.currentSearchCriteria.getPagesCount()} maxVisiblePage={10} size="sm" onSelect={this.onPageChange} />
                    </>);
            }
        }

        return (
            <>
                <RightsForCompanySearchUI onSearchCallback={this.onSearchResult} {...this.bind(this.searchCriteria, 'searchCriteria', [this.searchCriteriaValidator])} />
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

    @action private searchInternal(criteria: RightsForCompanySearch, newSearch: boolean = true): Promise<void> {
        let that = this;

        if (this.searchCriteriaValidator.validate(criteria)) {
            let reportsDataService = this.props.dataSrvProvider.getDataService<DeedsDataService>(DeedsDataService);

            return reportsDataService.getProtectedRightsCompanies(criteria).then(res => {
                runInAction(() => {
                    that.isAlreadySearched = true;
                    if (newSearch) {
                        that.currentSearchCriteria = criteria.clone();
                    }

                    if (res && res.length > 0) {
                        that.data = new RightsForCompanyResult();
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

    private getSearchCriteriaFromUrl(): RightsForCompanySearch {
        let searchCriteria = new RightsForCompanySearch();

        let page = UrlHelper.getUrlParameter('page');
        searchCriteria.page = !ObjectHelper.isStringNullOrEmpty(page) ? Number(page) : undefined;

        let count = UrlHelper.getUrlParameter('count');
        searchCriteria.count = !ObjectHelper.isStringNullOrEmpty(count) ? Number(count) : undefined;

        searchCriteria.name = UrlHelper.getUrlParameter('name');

        return searchCriteria;
    }

    private convertSearchCriteriaToUrlParams(): any {
        let urlParams: any = {};

        urlParams['page'] = this.currentSearchCriteria.page.toString();
        urlParams['pageSize'] = this.currentSearchCriteria.pageSize.toString();
        urlParams['count'] = this.currentSearchCriteria.count.toString();
        urlParams['name'] = this.currentSearchCriteria.name;

        return urlParams;
    }
}

export const RightsForCompanyUI = withRouter(withDataServiceProvider(withAsyncFrame(RightsForCompanyUIImpl)));