import { ObjectHelper, UrlHelper, appConfig } from "Cnsys.Core";
import { AsyncUIProps, BaseRouteProps, BaseRoutePropsExt, withAsyncFrame, withRouter } from "Cnsys.UI.React";
import { EPZEUBaseComponent, EPZEUPagination, IDataServiceProviderProps, withDataServiceProvider } from "EPZEU.Core";
import { action, observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { StatementsByDateResultFilter } from "../../Models/Enums";
import { StatementsByDateResult } from "../../Models/StatementsByDateResult";
import { StatementsByDateSearch } from "../../Models/StatementsByDateSearch";
import { StatementsByDateSearchValidator } from "../../Models/Validation/StatementsByDateSearchValidator";
import { DeedsDataService } from "../../Services/DeedsDataService";
import { StatementsByDateResultUI } from "./StatementsByDateResultUI";
import { StatementsByDateSearchUI } from "./StatementsByDateSearchUI";
import * as moment from 'moment';

interface StatementsByDateProps extends BaseRouteProps<any>, AsyncUIProps, BaseRoutePropsExt, IDataServiceProviderProps {
}

@observer class StatementsByDateUIImpl extends EPZEUBaseComponent<StatementsByDateProps, any> {
    @observable private isAlreadySearched: boolean;
    @observable private currentSearchCriteria: StatementsByDateSearch;
    @observable private searchCriteria: StatementsByDateSearch;
    @observable private data: StatementsByDateResult;

    constructor(props: StatementsByDateProps) {
        super(props);

        this.isAlreadySearched = false;
        this.searchInternal = this.searchInternal.bind(this);
        this.onSearchResult = this.onSearchResult.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.clearResult = this.clearResult.bind(this);
        this.convertSearchCriteriaToUrlParams = this.convertSearchCriteriaToUrlParams.bind(this);

        if (ObjectHelper.isStringNullOrEmpty(this.props.location.search)) {
            this.searchCriteria = new StatementsByDateSearch();
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
                        <StatementsByDateResultUI searchMode={this.searchCriteria.mode} {...this.bind(this.data, 'statements')} />
                        <EPZEUPagination activePage={this.currentSearchCriteria.page} count={this.currentSearchCriteria.count} pagesCount={this.currentSearchCriteria.getPagesCount()} maxVisiblePage={10} size="sm" onSelect={this.onPageChange} />
                    </>);
            }
        }

        return (
            <>
                <StatementsByDateSearchUI onClearResult={this.clearResult} onSearchCallback={this.onSearchResult} {...this.bind(this.searchCriteria, 'searchCriteria', [new StatementsByDateSearchValidator()])} />
                <br />
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

    @action private searchInternal(criteria: StatementsByDateSearch, newSearch: boolean = true): Promise<void> {
        let that = this;
        let validator = new StatementsByDateSearchValidator();

        if (validator.validate(criteria)) {
            let reportsDataService = this.props.dataSrvProvider.getDataService<DeedsDataService>(DeedsDataService);

            criteria.fieldIdents = criteria.fieldIdentsCollection
                && criteria.fieldIdentsCollection.length > 0
                && criteria.fieldIdentsCollection.reduce(function (prevVal: string, currVal: string) {

                return ObjectHelper.isStringNullOrEmpty(prevVal) ? currVal : prevVal + ',' + currVal;
            })

            //Клонираме обекта с критериите за да запазим колекцията с идентификатори на полетата и да не ги пращаме с GET заявката към сървъра.
            let clonedCriteria = criteria.clone();
            clonedCriteria.fieldIdentsCollection = undefined;

            return reportsDataService.getStatements(clonedCriteria).then(statements => {

                criteria.count = clonedCriteria.count;

                runInAction(() => {
                    that.isAlreadySearched = true;
                    if (newSearch) {
                        that.currentSearchCriteria = criteria.clone();
                    }

                    if (statements && statements.length > 0) {
                        that.data = new StatementsByDateResult();
                        that.data.items = statements;
                    } else
                        that.data = undefined;

                    let urlParams = that.convertSearchCriteriaToUrlParams();
                    that.props.routerExt.changeParams(urlParams);
                });
            });
        }

        return Promise.resolve();
    }

    private getSearchCriteriaFromUrl(): StatementsByDateSearch {
        let searchCriteria = new StatementsByDateSearch();

        let page = UrlHelper.getUrlParameter('page');
        searchCriteria.page = !ObjectHelper.isStringNullOrEmpty(page) ? Number(page) : undefined;

        let count = UrlHelper.getUrlParameter('count');
        searchCriteria.count = !ObjectHelper.isStringNullOrEmpty(count) ? Number(count) : undefined;

        let pageSize = UrlHelper.getUrlParameter('pageSize');
        searchCriteria.pageSize = !ObjectHelper.isStringNullOrEmpty(pageSize) ? Number(pageSize) : undefined;

        let filter = UrlHelper.getUrlParameter('mode');
        searchCriteria.mode = ObjectHelper.isStringNullOrEmpty(filter) ? StatementsByDateResultFilter.CurrentUpcomingDate : Number(filter);

        let fromActionDate = UrlHelper.getUrlParameter('fromActionDate');
        searchCriteria.fromActionDate = !ObjectHelper.isStringNullOrEmpty(fromActionDate) ? moment(new Date(fromActionDate)) : undefined;

        let toActionDate = UrlHelper.getUrlParameter('toActionDate');
        searchCriteria.toActionDate = !ObjectHelper.isStringNullOrEmpty(toActionDate) ? moment(new Date(toActionDate)) : undefined;

        let year = UrlHelper.getUrlParameter('year');
        searchCriteria.year = !ObjectHelper.isStringNullOrEmpty(year) ? Number(year) : undefined;

        let fieldIdents = UrlHelper.getUrlParameter('fieldIdents')
        searchCriteria.fieldIdentsCollection = !ObjectHelper.isStringNullOrEmpty(fieldIdents) ? fieldIdents.split(',') : undefined;

        return searchCriteria;
    }

    private convertSearchCriteriaToUrlParams(): any {
        let urlParams: any = {};

        urlParams['page'] = this.currentSearchCriteria.page.toString();
        urlParams['pageSize'] = this.currentSearchCriteria.pageSize.toString();
        urlParams['count'] = this.currentSearchCriteria.count.toString();
        urlParams['mode'] = this.currentSearchCriteria.mode.toString();

        if (!ObjectHelper.isNullOrUndefined(this.currentSearchCriteria.fromActionDate))
            urlParams['fromActionDate'] = this.currentSearchCriteria.fromActionDate.toString();

        if (!ObjectHelper.isNullOrUndefined(this.currentSearchCriteria.toActionDate))
            urlParams['toActionDate'] = this.currentSearchCriteria.toActionDate.toString();

        if (!ObjectHelper.isNullOrUndefined(this.currentSearchCriteria.year))
            urlParams['year'] = this.currentSearchCriteria.year.toString();

        if (!ObjectHelper.isNullOrUndefined(this.currentSearchCriteria.fieldIdentsCollection))
            urlParams['fieldIdents'] = this.currentSearchCriteria.fieldIdentsCollection.join(',');

        return urlParams;
    }

    clearResult() {
        this.data = undefined
    }
}

export const StatementsByDateUI = withRouter(withDataServiceProvider(withAsyncFrame(StatementsByDateUIImpl)));