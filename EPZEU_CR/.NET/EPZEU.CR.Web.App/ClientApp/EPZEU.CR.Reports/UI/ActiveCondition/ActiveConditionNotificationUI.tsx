import { appConfig, ObjectHelper } from 'Cnsys.Core';
import { AsyncUIProps, BaseProps, withAsyncFrame } from "Cnsys.UI.React";
import { EPZEUBaseComponent, EPZEUPagination, IDataServiceProviderProps, withDataServiceProvider } from "EPZEU.Core";
import { action, observable, runInAction } from 'mobx';
import { observer } from "mobx-react";
import * as PropTypes from 'prop-types';
import * as React from "react";
import { NotificationsUnderNPOSearchCriteria } from "../../Models/NotificationsUnderNPOSearchCriteria";
import { NotificationResult } from "../../Models/NotificationResult";
import { NotificationTypes } from "../../Models/Enums";
import { Notification } from "../../Models/Notification";
import { DeedsDataService } from "../..";

interface ActiveConditionNotificationUIProps extends BaseProps, AsyncUIProps, IDataServiceProviderProps {
    uic: string;
}

@observer class ActiveConditionNotificationUIImpl extends EPZEUBaseComponent<ActiveConditionNotificationUIProps, any> {
    @observable private searchCriteria: NotificationsUnderNPOSearchCriteria;
    @observable private Data: NotificationResult;

    constructor(props: ActiveConditionNotificationUIProps, context: any) {
        super(props, context);

        //Bind
        this.loadDataForPage = this.loadDataForPage.bind(this);

        //Init
        this.searchCriteria = new NotificationsUnderNPOSearchCriteria();
        this.searchCriteria.page = 1;
        this.searchCriteria.pageSize = appConfig.defaultPageSize;
        this.searchCriteria.notificationType = NotificationTypes.NotificationsFromRA;
        this.searchCriteria.count = 0;
        this.searchCriteria.uic = props.uic;
        this.Data = undefined;

        this.loadDataForPage(1);
    }

    render(): JSX.Element {
        if (!this.Data || !this.Data.items || this.Data.items.length == 0)
            return null;

        return (
            <div className="section-wrapper">
                <h2 className="section-title section-title--preview">{this.getResource('CR_GL_NOTIFICATIONS_ACTS_L')}</h2>
                <EPZEUPagination activePage={this.searchCriteria.page} count={this.searchCriteria.count} pagesCount={this.searchCriteria.getPagesCount()} maxVisiblePage={10} size="sm" onSelect={this.loadDataForPage} aditionalCssClass="pagination-container--page-top" />
                <div className="table-responsive-block">
                    <table className="table table-borderless table-striped table-hover">
                        <thead>
                            <tr>
                                <th style={{ width: '60%' }}>{this.getResource('GL_NAME_L')}</th>
                                <th>{this.getResource('GL_OUTGOING_NO_L')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.Data.items.map((item: Notification, idx: number) => {
                                return (
                                    <tr key={idx}>
                                        <td>
                                            <p><b dangerouslySetInnerHTML={{ __html: item.downloadLink }}></b></p>
                                        </td>
                                        <td>
                                            <span className="field-title field-title--preview d-sm-none">{this.getResource('GL_OUTGOING_NO_L')}</span>
                                            <p className="field-text word-break">{item.outgoingNumber}</p>
                                        </td>
                                    </tr>);
                            })}
                        </tbody>
                    </table>
                </div>
                <EPZEUPagination activePage={this.searchCriteria.page} count={this.searchCriteria.count} pagesCount={this.searchCriteria.getPagesCount()} maxVisiblePage={10} size="sm" onSelect={this.loadDataForPage} />
            </div>);
    }

    @action private loadDataForPage(page: any): void {
        let that = this;
        let dataSrv = this.props.dataSrvProvider.getDataService<DeedsDataService>(DeedsDataService);

        this.searchCriteria.page = page;

        this.props.registerAsyncOperation(dataSrv.getDeedNotifications(this.searchCriteria).then(res => {
            runInAction(() => {
                if (res && res.length > 0) {
                    that.Data = new NotificationResult();
                    that.Data.items = res;
                } else {
                    that.Data = undefined;
                    that.searchCriteria.page = 1;
                    that.searchCriteria.count = 0;
                }
            });
        }));
    }
}

(ActiveConditionNotificationUIImpl as any).contextTypes = { masterReportHeader: PropTypes.string };

export const ActiveConditionNotificationUI = withDataServiceProvider(withAsyncFrame(ActiveConditionNotificationUIImpl));