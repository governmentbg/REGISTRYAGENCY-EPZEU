import { ObjectHelper, UrlHelper, appConfig } from "Cnsys.Core";
import { AsyncUIProps, BaseRouteProps, BaseRoutePropsExt, withAsyncFrame, withRouter } from "Cnsys.UI.React";
import { EPZEUBaseComponent, EPZEUPagination, IDataServiceProviderProps, withDataServiceProvider } from "EPZEU.Core";
import { action, observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import * as moment from 'moment';
import * as React from "react";
import { SortColumnsWithOrder } from "../../Models/Enums";
import { PreservedCompaniesResult } from "../../Models/PreservedCompaniesResult";
import { PreservedCompaniesSearch } from '../../Models/PreservedCompaniesSearch';
import { PreservedCompaniesSearchValidator } from "../../Models/Validation/PreservedCompaniesSearchValidator";
import { DeedsDataService } from '../../Services/DeedsDataService';
import { PreservedCompaniesResultUI } from "./PreservedCompaniesResultUI";
import { PreservedCompaniesSearchUI } from "./PreservedCompaniesSearchUI";

interface PreservedCompaniesUIProps extends BaseRouteProps<any>, AsyncUIProps, BaseRoutePropsExt, IDataServiceProviderProps {
}

@observer class PreservedCompaniesUIImpl extends EPZEUBaseComponent<PreservedCompaniesUIProps, null> {
    private isAlreadySearched: boolean;
    private searchCriteriaValidator: PreservedCompaniesSearchValidator;
    @observable private currentSearchCriteria: PreservedCompaniesSearch;
    @observable private searchCriteria: PreservedCompaniesSearch;
    @observable private data: PreservedCompaniesResult;

    constructor(props: PreservedCompaniesUIProps) {
        super(props);

        this.isAlreadySearched = false;
        this.searchCriteriaValidator = new PreservedCompaniesSearchValidator();
        this.currentSearchCriteria = undefined;

        this.searchInternal = this.searchInternal.bind(this);
        this.onSearchResult = this.onSearchResult.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.onSort = this.onSort.bind(this);
        this.convertSearchCriteriaToUrlParams = this.convertSearchCriteriaToUrlParams.bind(this);

        if (ObjectHelper.isStringNullOrEmpty(this.props.location.search)) {
            this.searchCriteria = new PreservedCompaniesSearch();
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
                        <PreservedCompaniesResultUI {...this.bind(this.data, 'deed')} onSort={this.onSort} />
                        <EPZEUPagination activePage={this.currentSearchCriteria.page} count={this.currentSearchCriteria.count} pagesCount={this.currentSearchCriteria.getPagesCount()} maxVisiblePage={10} size="sm" onSelect={this.onPageChange} />
                    </>);
            }
        }

        return (
            <>
                <PreservedCompaniesSearchUI onSearchCallback={this.onSearchResult} {...this.bind(this.searchCriteria, 'searchCriteria', [this.searchCriteriaValidator])} />
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

    private onSort(column: string, direction: string): void {
        if (column == 'CompanyName') {
            this.currentSearchCriteria.sortColumnOrder = direction == 'ASC' ? SortColumnsWithOrder.CompanyNameASC : SortColumnsWithOrder.CompanyNameDESC;
        } else {
            this.currentSearchCriteria.sortColumnOrder = direction == 'ASC' ? SortColumnsWithOrder.ActiveFromASC : SortColumnsWithOrder.ActiveFromDESC;
        }

        this.props.registerAsyncOperation(this.searchInternal(this.currentSearchCriteria));
    }

    @action private searchInternal(criteria: PreservedCompaniesSearch, newSearch: boolean = true): Promise<void> {
        let that = this;

        if (this.searchCriteriaValidator.validate(criteria)) {
            let dataSrv = this.props.dataSrvProvider.getDataService<DeedsDataService>(DeedsDataService);

            return dataSrv.getDeedPreservedNames(criteria).then(res => {
                runInAction(() => {
                    that.isAlreadySearched = true;
                    if (newSearch) {
                        that.currentSearchCriteria = criteria.clone();
                    }

                    if (res && res.length > 0) {
                        that.data = new PreservedCompaniesResult();
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

    private getSearchCriteriaFromUrl(): PreservedCompaniesSearch {
        let searchCriteria = new PreservedCompaniesSearch();

        let page = UrlHelper.getUrlParameter('page');
        searchCriteria.page = !ObjectHelper.isStringNullOrEmpty(page) ? Number(page) : undefined;

        let count = UrlHelper.getUrlParameter('count');
        searchCriteria.count = !ObjectHelper.isStringNullOrEmpty(count) ? Number(count) : undefined;

        let companyFirstLatter = UrlHelper.getUrlParameter('companyFirstLatter');
        searchCriteria.companyFirstLatter = companyFirstLatter;

        let fromDate = UrlHelper.getUrlParameter('fromDate');
        searchCriteria.fromDate = !ObjectHelper.isStringNullOrEmpty(fromDate) ? moment(new Date(fromDate)) : undefined;

        let toDate = UrlHelper.getUrlParameter('toDate');
        searchCriteria.toDate = !ObjectHelper.isStringNullOrEmpty(toDate) ? moment(new Date(toDate)) : undefined;

        let sortColumnOrder = UrlHelper.getUrlParameter('sortColumnOrder');
        searchCriteria.sortColumnOrder = SortColumnsWithOrder.CompanyNameASC;

        if (!ObjectHelper.isStringNullOrEmpty(sortColumnOrder) && !isNaN(parseInt(sortColumnOrder, 10))) {
            searchCriteria.sortColumnOrder = parseInt(sortColumnOrder, 10);
        }

        return searchCriteria;
    }

    private convertSearchCriteriaToUrlParams(): any {
        let urlParams: any = {};

        urlParams['page'] = this.currentSearchCriteria.page.toString();
        urlParams['pageSize'] = this.currentSearchCriteria.pageSize.toString();
        urlParams['count'] = this.currentSearchCriteria.count.toString();
        urlParams['companyFirstLatter'] = this.currentSearchCriteria.companyFirstLatter;
        urlParams['fromDate'] = this.currentSearchCriteria.fromDate ? JSON.parse(JSON.stringify(this.currentSearchCriteria.fromDate)) : undefined;
        urlParams['toDate'] = this.currentSearchCriteria.toDate ? JSON.parse(JSON.stringify(this.currentSearchCriteria.toDate)) : undefined;
        urlParams['sortColumnOrder'] = this.currentSearchCriteria.sortColumnOrder;

        return urlParams;
    }
}

export const PreservedCompaniesUI = withRouter(withDataServiceProvider(withAsyncFrame(PreservedCompaniesUIImpl)));