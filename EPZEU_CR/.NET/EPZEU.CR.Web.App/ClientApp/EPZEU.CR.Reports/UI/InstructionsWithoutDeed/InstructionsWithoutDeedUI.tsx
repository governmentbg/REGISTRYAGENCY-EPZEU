import * as moment from 'moment';
import { appConfig, ObjectHelper, UrlHelper } from "Cnsys.Core";
import { AsyncUIProps, BaseRouteProps, BaseRoutePropsExt, withAsyncFrame, withRouter } from "Cnsys.UI.React";
import { EPZEUBaseComponent, EPZEUPagination, IDataServiceProviderProps, withDataServiceProvider } from "EPZEU.Core";
import { action, observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { InstructionSearchMode } from "../../Models/Enums";
import { InstructionSearchCriteria } from "../../Models/InstructionSearchCriteria";
import { InstructionsWithoutDeedResult } from "../../Models/InstructionsWithoutDeedResult";
import { InstructionDataService } from "../../Services/InstructionDataService";
import { InstructionsWithoutDeedResultUI } from "./InstructionsWithoutDeedResultUI";
import { InstructionsWithoutDeedSearchUI } from "./InstructionsWithoutDeedSearchUI";
import { InstructionSearchCriteriaValidator } from "../../Models/Validation/InstructionSearchCriteriaValidator";


interface InstructionsWithoutDeedProps extends BaseRouteProps<any>, AsyncUIProps, BaseRoutePropsExt, IDataServiceProviderProps {
}

@observer class InstructionsWithoutDeedUIImpl extends EPZEUBaseComponent<InstructionsWithoutDeedProps, any> {
    private searchCriteriaValidator: InstructionSearchCriteriaValidator;

    @observable private currentSearchCriteria: InstructionSearchCriteria;
    @observable private searchCriteria: InstructionSearchCriteria;
    @observable private isAlreadySearched: boolean;
    @observable private data: InstructionsWithoutDeedResult;

    constructor(props: InstructionsWithoutDeedProps) {
        super(props);

        this.isAlreadySearched = false;
        this.searchInternal = this.searchInternal.bind(this);
        this.onSearchResult = this.onSearchResult.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.convertSearchCriteriaToUrlParams = this.convertSearchCriteriaToUrlParams.bind(this);

        this.currentSearchCriteria = new InstructionSearchCriteria();
        this.searchCriteriaValidator = new InstructionSearchCriteriaValidator();

        if (ObjectHelper.isStringNullOrEmpty(this.props.location.search)) {
            this.searchCriteria = new InstructionSearchCriteria();
            this.searchCriteria.page = 1;
            this.searchCriteria.mode = InstructionSearchMode.DocumentsWithoutDeed;
            this.searchCriteria.pageSize = appConfig.defaultPageSize;
            this.searchCriteria.isActiveWithoutDeed = true;
            this.searchCriteria.loadIncomingLinkedDeeds = true;
        } else {
            this.searchCriteria = this.getSearchCriteriaFromUrl();
            this.searchCriteria.page = this.searchCriteria.page ? this.searchCriteria.page : 1;
            this.searchCriteria.mode = InstructionSearchMode.DocumentsWithoutDeed;
            this.searchCriteria.pageSize = appConfig.defaultPageSize;
            this.searchCriteria.isActiveWithoutDeed = !ObjectHelper.isNullOrUndefined(this.searchCriteria.isActiveWithoutDeed) ? this.searchCriteria.isActiveWithoutDeed : true;
            this.searchCriteria.loadIncomingLinkedDeeds = true;

            this.props.registerAsyncOperation(this.searchInternal(this.searchCriteria));
        }
    }

    render(): JSX.Element {
        let dataResult: any = null;

        if ((!this.props.asyncErrorMessages || this.props.asyncErrorMessages.length == 0)) {
            if (this.isAlreadySearched && !this.data)
                dataResult = (<div className="alert alert-info">{this.getResource('GL_NOT_FOUND_RESULTS_E')}</div>);

            if (this.data) {
                dataResult = <>
                    <EPZEUPagination activePage={this.currentSearchCriteria.page} count={this.currentSearchCriteria.count} pagesCount={this.currentSearchCriteria.getPagesCount()} maxVisiblePage={10} size="sm" onSelect={this.onPageChange} aditionalCssClass="pagination-container--page-top" />
                    <InstructionsWithoutDeedResultUI {...this.bind(this.data, 'instructions')} />
                    <EPZEUPagination activePage={this.currentSearchCriteria.page} count={this.currentSearchCriteria.count} pagesCount={this.currentSearchCriteria.getPagesCount()} maxVisiblePage={10} size="sm" onSelect={this.onPageChange} />
                </>
            }
        }

        return <>
            <InstructionsWithoutDeedSearchUI onSearchCallback={this.onSearchResult} {...this.bind(this.searchCriteria, 'searchCriteria', [this.searchCriteriaValidator])} />
            <br />
            {dataResult}
        </>
    }

    //#region Handlers

    @action private onSearchResult(): void {
        this.searchCriteria.page = 1;
        this.props.registerAsyncOperation(this.searchInternal(this.searchCriteria));
    }

    @action private onPageChange(page: any): void {
        this.currentSearchCriteria.page = page;
        this.props.registerAsyncOperation(this.searchInternal(this.currentSearchCriteria, false));
    }

    //#endregion

    //#region Private helpers

    @action private searchInternal(criteria: InstructionSearchCriteria, newSearch: boolean = true): Promise<void> {
        let that = this;
        let srv = this.props.dataSrvProvider.getDataService<InstructionDataService>(InstructionDataService);

        if (this.searchCriteriaValidator.validate(criteria)) {
            return srv.getDeedInstructions(criteria).then(res => {
                runInAction(() => {
                    that.isAlreadySearched = true;
                    if (newSearch) {
                        that.currentSearchCriteria = criteria.clone();
                    }

                    if (res && res.length > 0) {
                        that.data = new InstructionsWithoutDeedResult();
                        that.data.items = res;
                    } else
                        that.data = undefined;

                    let urlParams = that.convertSearchCriteriaToUrlParams();
                    that.props.routerExt.changeParams(urlParams);
                });
            });
        }

        return Promise.resolve();
    }

    private getSearchCriteriaFromUrl(): InstructionSearchCriteria {
        let searchCriteria = new InstructionSearchCriteria();

        let page = UrlHelper.getUrlParameter('page');
        searchCriteria.page = !ObjectHelper.isStringNullOrEmpty(page) ? Number(page) : undefined;

        let count = UrlHelper.getUrlParameter('count');
        searchCriteria.count = !ObjectHelper.isStringNullOrEmpty(count) ? Number(count) : undefined;

        let dateFrom = UrlHelper.getUrlParameter('fromDate');
        searchCriteria.applicationDateFrom = !ObjectHelper.isStringNullOrEmpty(dateFrom) ? moment(new Date(dateFrom)) : undefined;

        let dateTo = UrlHelper.getUrlParameter('toDate');
        searchCriteria.applicationDateTo = !ObjectHelper.isStringNullOrEmpty(dateTo) ? moment(new Date(dateTo)) : undefined;

        let isActiveWithoutDeed = UrlHelper.getUrlParameter('isActiveWithoutDeed');
        searchCriteria.isActiveWithoutDeed = isActiveWithoutDeed == "true" ? true : false;

        return searchCriteria;
    }

    private convertSearchCriteriaToUrlParams(): any {
        let urlParams: any = {};

        urlParams['page'] = this.currentSearchCriteria.page.toString();
        urlParams['pageSize'] = this.currentSearchCriteria.pageSize.toString();
        urlParams['count'] = this.currentSearchCriteria.count.toString();
        urlParams['fromDate'] = JSON.parse(JSON.stringify(this.currentSearchCriteria.applicationDateFrom));
        urlParams['toDate'] = JSON.parse(JSON.stringify(this.currentSearchCriteria.applicationDateTo));
        urlParams['isActiveWithoutDeed'] = JSON.parse(JSON.stringify(this.currentSearchCriteria.isActiveWithoutDeed));

        return urlParams;
    }

    //#endregion
}

export const InstructionsWithoutDeedUI = withRouter(withDataServiceProvider(withAsyncFrame(InstructionsWithoutDeedUIImpl)));