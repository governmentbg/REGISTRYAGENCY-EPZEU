import * as React from "react";
import { observer } from "mobx-react";
import * as moment from 'moment';
import { observable, runInAction, action } from "mobx";
import { ObjectHelper, UrlHelper, appConfig } from "Cnsys.Core";
import { EPZEUBaseComponent, EPZEUPagination, IDataServiceProviderProps, withDataServiceProvider } from "EPZEU.Core";
import { withAsyncFrame, AsyncUIProps, BaseRouteProps, BaseRoutePropsExt, withRouter } from "Cnsys.UI.React";
import { DeedsDataService } from '../../Services/DeedsDataService';
import { DeedsInStabilizationValidator } from "../../Models/Validation/DeedsInStabilizationValidator";
import { DeedsInStabilizationSearchCriteria } from "../../Models/DeedsInStabilizationSearchCriteria";
import { DeedSummariesResult } from '../../Models/DeedSummariesResult';
import { StabilizationSearchUI } from './StabilizationSearchUI';
import { StabilizationResultUI } from './StabilizationResultUI'

interface StabilizationUIProps extends BaseRouteProps<any>, AsyncUIProps, BaseRoutePropsExt, IDataServiceProviderProps {
}

@observer class StabilizationUIImpl extends EPZEUBaseComponent<StabilizationUIProps, null> {
    private isAlreadySearched: boolean;
    private searchCriteriaValidator: DeedsInStabilizationValidator;
    @observable private currentSearchCriteria: DeedsInStabilizationSearchCriteria;
    @observable private searchCriteria: DeedsInStabilizationSearchCriteria;
    @observable private data: DeedSummariesResult;

    constructor(props: StabilizationUIProps) {
        super(props);

        //Bind
        this.searchInternal = this.searchInternal.bind(this);
        this.onSearchResult = this.onSearchResult.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.convertSearchCriteriaToUrlParams = this.convertSearchCriteriaToUrlParams.bind(this);

        //Init
        this.isAlreadySearched = false;
        this.searchCriteriaValidator = new DeedsInStabilizationValidator();
        this.currentSearchCriteria = undefined;

        if (ObjectHelper.isStringNullOrEmpty(this.props.location.search)) {
            this.searchCriteria = new DeedsInStabilizationSearchCriteria();
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
                        <StabilizationResultUI {...this.bind(this.data, 'deeds')} />
                        <EPZEUPagination activePage={this.currentSearchCriteria.page} count={this.currentSearchCriteria.count} pagesCount={this.currentSearchCriteria.getPagesCount()} maxVisiblePage={10} size="sm" onSelect={this.onPageChange} />
                    </>);
            }
        }

        return (
            <>
                <StabilizationSearchUI onSearchCallback={this.onSearchResult} {...this.bind(this.searchCriteria, 'searchCriteria', [this.searchCriteriaValidator])} />
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

    @action private searchInternal(criteria: DeedsInStabilizationSearchCriteria, newSearch: boolean = true): Promise<void> {
        let that = this;

        if (this.searchCriteriaValidator.validate(criteria)) {
            let reportsDataService = this.props.dataSrvProvider.getDataService<DeedsDataService>(DeedsDataService);

            return reportsDataService.getDeedsInStabilization(criteria).then(res => {
                runInAction(() => {
                    that.isAlreadySearched = true;
                    if (newSearch) {
                        that.currentSearchCriteria = criteria.clone();
                    }

                    if (res && res.length > 0) {
                        that.data = new DeedSummariesResult();
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

    private getSearchCriteriaFromUrl(): DeedsInStabilizationSearchCriteria {
        let searchCriteria = new DeedsInStabilizationSearchCriteria();

        let page = UrlHelper.getUrlParameter('page');
        searchCriteria.page = !ObjectHelper.isStringNullOrEmpty(page) ? Number(page) : undefined;

        let count = UrlHelper.getUrlParameter('count');
        searchCriteria.count = !ObjectHelper.isStringNullOrEmpty(count) ? Number(count) : undefined;

        let fromDate = UrlHelper.getUrlParameter('fromDate');
        searchCriteria.fromDate = !ObjectHelper.isStringNullOrEmpty(fromDate) ? moment(new Date(fromDate)) : undefined;

        let toDate = UrlHelper.getUrlParameter('toDate');
        searchCriteria.toDate = !ObjectHelper.isStringNullOrEmpty(toDate) ? moment(new Date(toDate)) : undefined;

        searchCriteria.name = UrlHelper.getUrlParameter('name');
        searchCriteria.uic = UrlHelper.getUrlParameter('uic');

        return searchCriteria;
    }

    private convertSearchCriteriaToUrlParams(): any {
        let urlParams: any = {};

        urlParams['page'] = this.currentSearchCriteria.page.toString();
        urlParams['pageSize'] = this.currentSearchCriteria.pageSize.toString();
        urlParams['count'] = this.currentSearchCriteria.count.toString();
        urlParams['fromDate'] = this.currentSearchCriteria.fromDate ? JSON.parse(JSON.stringify(this.currentSearchCriteria.fromDate)) : undefined;
        urlParams['toDate'] = this.currentSearchCriteria.toDate ? JSON.parse(JSON.stringify(this.currentSearchCriteria.toDate)) : undefined;
        urlParams['name'] = this.currentSearchCriteria.name;
        urlParams['uic'] = this.currentSearchCriteria.uic;

        return urlParams;
    }
}

export const StabilizationUI = withRouter(withDataServiceProvider(withAsyncFrame(StabilizationUIImpl)));