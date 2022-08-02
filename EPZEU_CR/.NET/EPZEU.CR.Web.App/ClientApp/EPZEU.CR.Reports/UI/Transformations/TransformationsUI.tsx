import * as React from "react";
import { observer } from "mobx-react";
import { observable, runInAction, action } from "mobx";
import * as moment from 'moment';
import { ObjectHelper, UrlHelper, appConfig } from "Cnsys.Core";
import { EPZEUBaseComponent, EPZEUPagination, IDataServiceProviderProps, withDataServiceProvider } from "EPZEU.Core";
import { withAsyncFrame, AsyncUIProps, BaseRouteProps, BaseRoutePropsExt, withRouter } from "Cnsys.UI.React";
import { ApplicationsService, ApplicationTransformationsSearchCriteria } from 'EPZEU.CR.Core';
import { ApplicationInfosResult } from '../../Models/ApplicationInfosResult';
import { TransformationsSearchCriteriaValidator } from "../../Models/Validation/TransformationsSearchCriteriaValidator";
import { TransformationsSearchUI } from "./TransformationsSearchUI";
import { ApplicationInfoResultUI } from "../ApplicationInfoResultUI";

interface TransformationsUIProps extends BaseRouteProps<any>, AsyncUIProps, BaseRoutePropsExt, IDataServiceProviderProps {
}

@observer class TransformationsUIImpl extends EPZEUBaseComponent<TransformationsUIProps, null> {
    @observable private isAlreadySearched: boolean;
    @observable private currentSearchCriteria: ApplicationTransformationsSearchCriteria;
    @observable private searchCriteria: ApplicationTransformationsSearchCriteria;
    @observable private data: ApplicationInfosResult;

    constructor(props: TransformationsUIProps) {
        super(props);

        this.isAlreadySearched = false;
        this.currentSearchCriteria = undefined;

        this.searchInternal = this.searchInternal.bind(this);
        this.onSearchResult = this.onSearchResult.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.convertSearchCriteriaToUrlParams = this.convertSearchCriteriaToUrlParams.bind(this);

        if (ObjectHelper.isStringNullOrEmpty(this.props.location.search)) {
            this.searchCriteria = new ApplicationTransformationsSearchCriteria();
            this.searchCriteria.page = 1;
            this.searchCriteria.pageSize = appConfig.defaultPageSize;
            this.searchCriteria.dateFrom = moment().startOf('day');
            this.searchCriteria.dateTo = moment().endOf('day');
        } else {
            this.searchCriteria = this.getSearchCriteriaFromUrl();
            this.searchCriteria.page = this.searchCriteria.page ? this.searchCriteria.page : 1;
            this.searchCriteria.pageSize = appConfig.defaultPageSize

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
                        <ApplicationInfoResultUI {...this.bind(this.data, 'deed')} />
                        <EPZEUPagination activePage={this.currentSearchCriteria.page} count={this.currentSearchCriteria.count} pagesCount={this.currentSearchCriteria.getPagesCount()} maxVisiblePage={10} size="sm" onSelect={this.onPageChange} />
                    </>);
            }
        }

        return (
            <>
                {/* Вписвания, заличавания и обявявания */}
                <TransformationsSearchUI onSearchCallback={this.onSearchResult} {...this.bind(this.searchCriteria, 'searchCriteria', [new TransformationsSearchCriteriaValidator()])} />
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

    @action private searchInternal(criteria: ApplicationTransformationsSearchCriteria, newSearch: boolean = true): Promise<void> {
        let that = this;
        let validator = new TransformationsSearchCriteriaValidator();

        if (validator.validate(criteria)) {
            let dataSrv: ApplicationsService = this.props.dataSrvProvider.getDataService<ApplicationsService>(ApplicationsService);

            return dataSrv.getApplicationInfoTransformations(criteria).then(res => {
                runInAction(() => {
                    that.isAlreadySearched = true;
                    if (newSearch) {
                        that.currentSearchCriteria = criteria.clone();
                    }

                    if (res && res.length > 0) {
                        that.data = new ApplicationInfosResult();
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

    private getSearchCriteriaFromUrl(): ApplicationTransformationsSearchCriteria {
        let searchCriteria = new ApplicationTransformationsSearchCriteria();

        let page = UrlHelper.getUrlParameter('page');
        searchCriteria.page = !ObjectHelper.isStringNullOrEmpty(page) ? Number(page) : undefined;

        let count = UrlHelper.getUrlParameter('count');
        searchCriteria.count = !ObjectHelper.isStringNullOrEmpty(count) ? Number(count) : undefined;

        let dateFrom = UrlHelper.getUrlParameter('dateFrom');
        searchCriteria.dateFrom = !ObjectHelper.isStringNullOrEmpty(dateFrom) ? moment(new Date(dateFrom)) : undefined;

        let dateTo = UrlHelper.getUrlParameter('dateTo');
        searchCriteria.dateTo = !ObjectHelper.isStringNullOrEmpty(dateTo) ? moment(new Date(dateTo)) : undefined;

        searchCriteria.companyName = UrlHelper.getUrlParameter('companyName');

        return searchCriteria;
    }

    private convertSearchCriteriaToUrlParams(): any {
        let urlParams: any = {};

        urlParams['page'] = this.currentSearchCriteria.page.toString();
        urlParams['pageSize'] = this.currentSearchCriteria.pageSize.toString();
        urlParams['count'] = this.currentSearchCriteria.count.toString();
        urlParams['dateFrom'] = JSON.parse(JSON.stringify(this.currentSearchCriteria.dateFrom));
        urlParams['dateTo'] = JSON.parse(JSON.stringify(this.currentSearchCriteria.dateTo));
        urlParams['companyName'] = this.currentSearchCriteria.companyName;

        return urlParams;
    }
}

export const TransformationsUI = withRouter(withAsyncFrame(withDataServiceProvider(TransformationsUIImpl)));