import * as React from "react";
import { observer } from "mobx-react";
import { observable, runInAction, action } from "mobx";
import { ObjectHelper, UrlHelper, appConfig } from "Cnsys.Core";
import { EPZEUBaseComponent, EPZEUPagination, IDataServiceProviderProps, withDataServiceProvider } from "EPZEU.Core";
import { withAsyncFrame, AsyncUIProps, BaseRouteProps, BaseRoutePropsExt, withRouter } from "Cnsys.UI.React";
import { ApplicationsService } from 'EPZEU.CR.Core';
import { ApplicationInfosResult } from '../../Models/ApplicationInfosResult';
import { RegistrationsSearchCriteriaValidator } from "../../Models/Validation/RegistrationsSearchCriteriaValidator";
import { RegistrationsSearchUI } from "./RegistrationsSearchUI";
import { ApplicationInfoResultUI } from "../ApplicationInfoResultUI";
import { RegistrationsSearchCriteria } from "../../Models/RegistrationsSearchCriteria";

interface RegistrationsUIProps extends BaseRouteProps<any>, AsyncUIProps, BaseRoutePropsExt, IDataServiceProviderProps {
}

@observer class RegistrationsUIImpl extends EPZEUBaseComponent<RegistrationsUIProps, null> {
    private isAlreadySearched: boolean;
    private searchCriteriaValidator: RegistrationsSearchCriteriaValidator;
    private currentSearchCriteria: RegistrationsSearchCriteria;
    private searchCriteria: RegistrationsSearchCriteria;
    @observable private data: ApplicationInfosResult;

    constructor(props: RegistrationsUIProps) {
        super(props);

        this.isAlreadySearched = false;
        this.searchCriteriaValidator = new RegistrationsSearchCriteriaValidator();
        this.currentSearchCriteria = undefined;

        this.searchInternal = this.searchInternal.bind(this);
        this.onSearchResult = this.onSearchResult.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.convertSearchCriteriaToUrlParams = this.convertSearchCriteriaToUrlParams.bind(this);

        if (ObjectHelper.isStringNullOrEmpty(this.props.location.search)) {
            this.searchCriteria = new RegistrationsSearchCriteria();
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

        if (this.isAlreadySearched && !this.data && (!this.props.asyncErrorMessages || this.props.asyncErrorMessages.length == 0)) {
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

        return (
            <>
                {/* По входящ номер на заявление */}
                <RegistrationsSearchUI onSearchCallback={this.onSearchResult} {...this.bind(this.searchCriteria, 'searchCriteria', [this.searchCriteriaValidator])} />
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

    @action private searchInternal(criteria: RegistrationsSearchCriteria, newSearch: boolean = true): Promise<void> {
        let that = this;

        if (this.searchCriteriaValidator.validate(criteria)) {
            let dataSrv = this.props.dataSrvProvider.getDataService<ApplicationsService>(ApplicationsService);

            return dataSrv.getApplicationInfoByIncommingNumber(criteria.incomingNumber).then(res => {
                runInAction(() => {
                    that.isAlreadySearched = true;
                    if (newSearch) {
                        that.currentSearchCriteria = criteria.clone();
                    }

                    if (res) {
                        that.data = new ApplicationInfosResult();
                        that.data.items = [res];
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

    private getSearchCriteriaFromUrl(): RegistrationsSearchCriteria {
        let searchCriteria = new RegistrationsSearchCriteria();

        let page = UrlHelper.getUrlParameter('page');
        searchCriteria.page = !ObjectHelper.isStringNullOrEmpty(page) ? Number(page) : undefined;

        let count = UrlHelper.getUrlParameter('count');
        searchCriteria.count = !ObjectHelper.isStringNullOrEmpty(count) ? Number(count) : undefined;

        searchCriteria.incomingNumber = UrlHelper.getUrlParameter('incomingNumber');

        return searchCriteria;
    }

    private convertSearchCriteriaToUrlParams(): any {
        let urlParams: any = {};

        urlParams['page'] = this.currentSearchCriteria.page.toString();
        urlParams['pageSize'] = this.currentSearchCriteria.pageSize.toString();
        urlParams['count'] = this.currentSearchCriteria.count.toString();
        urlParams['incomingNumber'] = this.currentSearchCriteria.incomingNumber;

        return urlParams;
    }
}

export const RegistrationsUI = withRouter(withAsyncFrame(withDataServiceProvider(RegistrationsUIImpl)));