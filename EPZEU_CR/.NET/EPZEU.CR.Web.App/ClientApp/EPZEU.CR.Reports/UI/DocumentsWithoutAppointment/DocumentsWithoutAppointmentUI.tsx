import * as React from "react";
import { observer } from "mobx-react";
import { observable, runInAction, action } from "mobx";
import * as moment from 'moment';
import { ObjectHelper, UrlHelper, appConfig } from "Cnsys.Core";
import { EPZEUBaseComponent, EPZEUPagination, IDataServiceProviderProps, withDataServiceProvider } from "EPZEU.Core";
import { withAsyncFrame, AsyncUIProps, BaseRouteProps, BaseRoutePropsExt, withRouter } from "Cnsys.UI.React";
import { DocumentsWithoutAppointmentSearchUI } from "./DocumentsWithoutAppointmentSearchUI";
import { DocumentsWithoutAppointmentResultUI } from './DocumentsWithoutAppointmentResultUI';
import { AssignmentsService, UnassignedAssignmentSearchCriteria, UnassignedAssignmentSearchCriteriaFilter, UnassignedAssignmentSearchCriteriaValidator, ApplicationInfo } from 'EPZEU.CR.Core';

interface DocumentsWithoutAppointmentUIUIProps extends BaseRouteProps<any>, AsyncUIProps, BaseRoutePropsExt, IDataServiceProviderProps {
}

@observer class DocumentsWithoutAppointmentUIImpl extends EPZEUBaseComponent<DocumentsWithoutAppointmentUIUIProps, null> {
    @observable private isAlreadySearched: boolean;
    @observable private currentSearchCriteria: UnassignedAssignmentSearchCriteria;
    @observable private searchCriteria: UnassignedAssignmentSearchCriteria;
    @observable private data: ApplicationInfo[];

    constructor(props: DocumentsWithoutAppointmentUIUIProps) {
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
            this.searchCriteria = new UnassignedAssignmentSearchCriteria();
            this.searchCriteria.page = 1;
            this.searchCriteria.pageSize = appConfig.defaultPageSize;
        } else {
            this.searchCriteria = this.getSearchCriteriaFromUrl();
            this.searchCriteria.page = this.searchCriteria.page ? this.searchCriteria.page : 1;
            this.searchCriteria.pageSize = this.searchCriteria.pageSize ? this.searchCriteria.pageSize : appConfig.defaultPageSize;

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
                        <DocumentsWithoutAppointmentResultUI data={this.data} />
                        <EPZEUPagination activePage={this.currentSearchCriteria.page} count={this.currentSearchCriteria.count} pagesCount={this.currentSearchCriteria.getPagesCount()} maxVisiblePage={10} size="sm" onSelect={this.onPageChange} />
                    </>);
            }
        }

        return (
            <>
                {/* Документи без назначение  */}
                <DocumentsWithoutAppointmentSearchUI onSearchCallback={this.onSearchResult} {...this.bind(this.searchCriteria, 'searchCriteria', [new UnassignedAssignmentSearchCriteriaValidator()])} />
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

    @action private searchInternal(criteria: UnassignedAssignmentSearchCriteria, newSearch: boolean = true): Promise<void> {
        let that = this;
        let validator = new UnassignedAssignmentSearchCriteriaValidator();
        let srv = this.props.dataSrvProvider.getDataService<AssignmentsService>(AssignmentsService);

        if (validator.validate(criteria)) {
            return srv.getDocumentsWithoutAppointment(criteria).then(res => {
                runInAction(() => {
                    that.isAlreadySearched = true;
                    if (newSearch) {
                        that.currentSearchCriteria = criteria.clone();
                    }

                    if (res && res.length > 0) {
                        that.data = res;
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

    private getSearchCriteriaFromUrl(): UnassignedAssignmentSearchCriteria {
        let searchCriteria = new UnassignedAssignmentSearchCriteria();

        let page = UrlHelper.getUrlParameter('page');
        searchCriteria.page = !ObjectHelper.isStringNullOrEmpty(page) ? Number(page) : undefined;

        let count = UrlHelper.getUrlParameter('count');
        searchCriteria.count = !ObjectHelper.isStringNullOrEmpty(count) ? Number(count) : undefined;

        let pageSize = UrlHelper.getUrlParameter('pageSize');
        searchCriteria.pageSize = !ObjectHelper.isStringNullOrEmpty(pageSize) ? Number(pageSize) : undefined;

        let filter = UrlHelper.getUrlParameter('searchFilter');
        searchCriteria.searchFilter = ObjectHelper.isStringNullOrEmpty(filter) ? UnassignedAssignmentSearchCriteriaFilter.ByIncomingNumber : Number(filter);

        searchCriteria.incomingNumber = UrlHelper.getUrlParameter('incomingNumber');

        let fromDate = UrlHelper.getUrlParameter('fromDate');
        searchCriteria.fromDate = !ObjectHelper.isStringNullOrEmpty(fromDate) ? moment(new Date(fromDate)) : undefined;

        let toDate = UrlHelper.getUrlParameter('toDate');
        searchCriteria.toDate = !ObjectHelper.isStringNullOrEmpty(toDate) ? moment(new Date(toDate)) : undefined;

        let applicationFormType = UrlHelper.getUrlParameter('applicationFormType');
        searchCriteria.applicationFormType = ObjectHelper.isStringNullOrEmpty(applicationFormType) ? undefined : Number(applicationFormType);

        return searchCriteria;
    }

    private convertSearchCriteriaToUrlParams(): any {
        let urlParams: any = {};

        urlParams['page'] = this.currentSearchCriteria.page.toString();
        urlParams['pageSize'] = this.currentSearchCriteria.pageSize.toString();
        urlParams['count'] = this.currentSearchCriteria.count.toString();
        urlParams['searchFilter'] = this.currentSearchCriteria.searchFilter.toString();

        if (this.currentSearchCriteria.searchFilter == UnassignedAssignmentSearchCriteriaFilter.ByPeriod) {
            urlParams['fromDate'] = JSON.parse(JSON.stringify(this.currentSearchCriteria.fromDate));
            urlParams['toDate'] = JSON.parse(JSON.stringify(this.currentSearchCriteria.toDate));
        } else if (this.currentSearchCriteria.searchFilter == UnassignedAssignmentSearchCriteriaFilter.ByIncomingNumber) {
            urlParams['incomingNumber'] = this.currentSearchCriteria.incomingNumber;
        } else {
            urlParams['applicationFormType'] = this.currentSearchCriteria.applicationFormType.toString();
        }

        return urlParams;
    }
}

export const DocumentsWithoutAppointmentUI = withRouter(withDataServiceProvider(withAsyncFrame(DocumentsWithoutAppointmentUIImpl)));