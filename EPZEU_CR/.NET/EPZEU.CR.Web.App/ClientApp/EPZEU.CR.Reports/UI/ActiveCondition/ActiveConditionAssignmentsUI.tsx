import * as React from "react";
import { observer } from "mobx-react";
import * as moment from 'moment';
import { observable, runInAction } from 'mobx';
import { EPZEUBaseComponent, EPZEUPagination, IDataServiceProviderProps, withDataServiceProvider } from "EPZEU.Core";
import { withAsyncFrame, AsyncUIProps, BaseProps } from "Cnsys.UI.React";
import { MasterAssignmentApplication, MasterAssignmentSearchCriteria, AssignmentsService } from 'EPZEU.CR.Core';
import { AssignmentsUI } from "../AssignmentsUI";

interface ActiveConditionAssignmentsUIProps extends BaseProps, AsyncUIProps, IDataServiceProviderProps {
    uic: string;
    toDate: moment.Moment;
}

@observer class ActiveConditionAssignmentsUIImpl extends EPZEUBaseComponent<ActiveConditionAssignmentsUIProps, any> {
    @observable private searchCriteria: MasterAssignmentSearchCriteria;
    @observable private Data: MasterAssignmentApplication[];

    constructor(props: ActiveConditionAssignmentsUIProps) {
        super(props);

        this.searchCriteria = new MasterAssignmentSearchCriteria();
        this.searchCriteria.uic = this.props.uic;
        this.searchCriteria.toDate = this.props.toDate;
        this.searchCriteria.page = 1;
        this.searchCriteria.pageSize = 3;
        this.searchCriteria.count = 0;
        this.Data = undefined;

        this.loadDataForPage = this.loadDataForPage.bind(this);

        this.loadDataForPage(1);
    }

    render(): JSX.Element {
        if (!this.Data) return null;

        return (
            <div className="section-wrapper">
                <h2 className="section-title section-title--preview">{this.getResource('GL_APPOINTMENTS_L')}</h2>
                <EPZEUPagination activePage={this.searchCriteria.page} count={this.searchCriteria.count} pagesCount={this.searchCriteria.getPagesCount()} maxVisiblePage={10} size="sm" onSelect={this.loadDataForPage} aditionalCssClass="pagination-container--page-top" />
                <AssignmentsUI data={this.Data} />
                <EPZEUPagination activePage={this.searchCriteria.page} count={this.searchCriteria.count} pagesCount={this.searchCriteria.getPagesCount()} maxVisiblePage={10} size="sm" onSelect={this.loadDataForPage} />
            </div>);
    }

    private loadDataForPage(page: any): void {
        let that = this;
        let dataSrv = this.props.dataSrvProvider.getDataService<AssignmentsService>(AssignmentsService);
        let criteria = new MasterAssignmentSearchCriteria(JSON.parse(JSON.stringify(this.searchCriteria)));
        criteria.page = page;

        this.props.registerAsyncOperation(dataSrv.getAssignmentMasterApplications(criteria).then(res => {
            runInAction(() => {
                if (res && res.length > 0) {
                    that.Data = res;
                    that.searchCriteria = criteria;
                } else {
                    that.Data = undefined;
                    that.searchCriteria.page = 1;
                    that.searchCriteria.count = 0;
                }
            });
        }));

    }
}

export const ActiveConditionAssignmentsUI = withDataServiceProvider(withAsyncFrame(ActiveConditionAssignmentsUIImpl));