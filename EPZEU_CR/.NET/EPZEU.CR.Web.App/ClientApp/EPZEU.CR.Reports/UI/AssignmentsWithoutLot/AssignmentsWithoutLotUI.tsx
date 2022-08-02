import * as React from "react";
import { observer } from "mobx-react";
import { observable, runInAction, action } from "mobx";
import * as moment from 'moment';
import { ObjectHelper, UrlHelper } from "Cnsys.Core";
import { EPZEUBaseComponent, EPZEUPagination, IDataServiceProviderProps, withDataServiceProvider } from "EPZEU.Core";
import { withAsyncFrame, AsyncUIProps, BaseRouteProps, BaseRoutePropsExt, withRouter } from "Cnsys.UI.React";
import { AssignmentsWithoutLotSearchUI } from "./AssignmentsWithoutLotSearchUI";
import { AssignmentsService, MasterAssignmentSearchCriteriaFilter, MasterAssignmentSearchCriteria, MasterAssignmentSearchCriteriaValidator, MasterAssignmentApplication } from 'EPZEU.CR.Core';
import { AssignmentsUI } from '../AssignmentsUI';

interface AssignmentsWithoutLotUIUIProps extends BaseRouteProps<any>, AsyncUIProps, BaseRoutePropsExt, IDataServiceProviderProps {
}

@observer class AssignmentsWithoutLotUIImpl extends EPZEUBaseComponent<AssignmentsWithoutLotUIUIProps, null> {
    @observable private isAlreadySearched: boolean;
    @observable private currentSearchCriteria: MasterAssignmentSearchCriteria;
    @observable private searchCriteria: MasterAssignmentSearchCriteria;
    @observable private data: MasterAssignmentApplication[];

    constructor(props: AssignmentsWithoutLotUIUIProps) {
        super(props);

        //Init
        this.isAlreadySearched = false;
        this.currentSearchCriteria = undefined;
        this.searchCriteria = undefined;
        this.data = undefined;

        //Bind
        this.searchInternal = this.searchInternal.bind(this);
        this.onSearchResult = this.onSearchResult.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.convertSearchCriteriaToUrlParams = this.convertSearchCriteriaToUrlParams.bind(this);

        if (ObjectHelper.isStringNullOrEmpty(this.props.location.search)) {
            this.searchCriteria = new MasterAssignmentSearchCriteria();
            this.searchCriteria.page = 1;
            this.searchCriteria.pageSize = 3;
        } else {
            this.searchCriteria = this.getSearchCriteriaFromUrl();
            this.searchCriteria.page = this.searchCriteria.page ? this.searchCriteria.page : 1;
            this.searchCriteria.pageSize = this.searchCriteria.pageSize ? this.searchCriteria.pageSize : 3;

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
                        <AssignmentsUI data={this.data} />
                        <EPZEUPagination activePage={this.currentSearchCriteria.page} count={this.currentSearchCriteria.count} pagesCount={this.currentSearchCriteria.getPagesCount()} maxVisiblePage={10} size="sm" onSelect={this.onPageChange} />
                    </>);
            }
        }

        return (
            <>
                {/* Назначения без партида  */}
                <AssignmentsWithoutLotSearchUI onSearchCallback={this.onSearchResult} {...this.bind(this.searchCriteria, 'searchCriteria', [new MasterAssignmentSearchCriteriaValidator()])} />
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

    @action private searchInternal(criteria: MasterAssignmentSearchCriteria, newSearch: boolean = true): Promise<void> {
        let that = this;
        let validator = new MasterAssignmentSearchCriteriaValidator();
        let srv = this.props.dataSrvProvider.getDataService<AssignmentsService>(AssignmentsService);
        criteria.getOnlyAssWithoutDeed = true;
        
        if (validator.validate(criteria)) {

            //Когато outgoingSeqNumber не е подаден искаме да се търси все едно е подадено "1", но това да се отразява на UI-a
            let criteriaForSearchExecution = null;
            if (criteria.searchFilter == MasterAssignmentSearchCriteriaFilter.ByOutgoingIncomingNumber
                && ObjectHelper.isStringNullOrEmpty(criteria.outgoingSeqNumber)) {
                criteriaForSearchExecution = criteria.clone();
                criteriaForSearchExecution.outgoingSeqNumber = "1";
            }
            else {
                criteriaForSearchExecution = criteria;
            }

            return srv.getAssignmentMasterApplications(criteriaForSearchExecution).then(res => {
                runInAction(() => {
                    if (newSearch) {
                        that.currentSearchCriteria = criteria.clone();
                    }

                    that.isAlreadySearched = true;
                    that.data = (res && res.length > 0) ? res : undefined;

                    let urlParams = that.convertSearchCriteriaToUrlParams();
                    that.props.routerExt.changeParams(urlParams);
                });
            })
        }            

        return Promise.resolve();
    }

    private getSearchCriteriaFromUrl(): MasterAssignmentSearchCriteria {
        let searchCriteria = new MasterAssignmentSearchCriteria();

        let page = UrlHelper.getUrlParameter('page');
        searchCriteria.page = !ObjectHelper.isStringNullOrEmpty(page) ? Number(page) : undefined;

        let count = UrlHelper.getUrlParameter('count');
        searchCriteria.count = !ObjectHelper.isStringNullOrEmpty(count) ? Number(count) : undefined;

        let pageSize = UrlHelper.getUrlParameter('pageSize');
        searchCriteria.pageSize = !ObjectHelper.isStringNullOrEmpty(pageSize) ? Number(pageSize) : undefined;

        let filter = UrlHelper.getUrlParameter('searchFilter');
        searchCriteria.searchFilter = ObjectHelper.isStringNullOrEmpty(filter) ? MasterAssignmentSearchCriteriaFilter.ByIncomingNumber : Number(filter);

        //ByIncomingNumber
        searchCriteria.incomingNumber = UrlHelper.getUrlParameter('incomingNumber');

        //ByOutgoingIncomingNumber
        searchCriteria.outgoingIncomingNumber = UrlHelper.getUrlParameter('outgoingIncomingNumber');
        searchCriteria.outgoingSeqNumber = UrlHelper.getUrlParameter('outgoingSeqNumber');

        let outgoingNumberDate = UrlHelper.getUrlParameter('outgoingNumberDate');
        searchCriteria.outgoingNumberDate = !ObjectHelper.isStringNullOrEmpty(outgoingNumberDate) ? moment(new Date(outgoingNumberDate)) : undefined;

        //ByCompanyName
        let companyName = UrlHelper.getUrlParameter('companyName');
        searchCriteria.companyName = !ObjectHelper.isStringNullOrEmpty(companyName) ? companyName : undefined;

        let fromDate = UrlHelper.getUrlParameter('fromDate');
        searchCriteria.fromDate = !ObjectHelper.isStringNullOrEmpty(fromDate) ? moment(new Date(fromDate)) : undefined;

        let toDate = UrlHelper.getUrlParameter('toDate');
        searchCriteria.toDate = !ObjectHelper.isStringNullOrEmpty(toDate) ? moment(new Date(toDate)) : undefined;

        return searchCriteria;
    }

    private convertSearchCriteriaToUrlParams(): any {
        let urlParams: any = {};

        urlParams['page'] = this.currentSearchCriteria.page.toString();
        urlParams['pageSize'] = this.currentSearchCriteria.pageSize.toString();
        urlParams['count'] = this.currentSearchCriteria.count.toString();
        urlParams['searchFilter'] = this.currentSearchCriteria.searchFilter.toString();

        if (this.currentSearchCriteria.searchFilter == MasterAssignmentSearchCriteriaFilter.ByCompanyName) {
            urlParams['companyName'] = this.currentSearchCriteria.companyName
            urlParams['fromDate'] = JSON.parse(JSON.stringify(this.currentSearchCriteria.fromDate));
            urlParams['toDate'] = JSON.parse(JSON.stringify(this.currentSearchCriteria.toDate));
        } else if (this.currentSearchCriteria.searchFilter == MasterAssignmentSearchCriteriaFilter.ByIncomingNumber) {
            urlParams['incomingNumber'] = this.currentSearchCriteria.incomingNumber;
        } else {
            urlParams['outgoingIncomingNumber'] = this.currentSearchCriteria.outgoingIncomingNumber;
            urlParams['outgoingSeqNumber'] = this.currentSearchCriteria.outgoingSeqNumber;
            urlParams['outgoingNumberDate'] = JSON.parse(JSON.stringify(this.currentSearchCriteria.outgoingNumberDate));
        }

        return urlParams;
    }
}

export const AssignmentsWithoutLotUI = withRouter(withDataServiceProvider(withAsyncFrame(AssignmentsWithoutLotUIImpl)));