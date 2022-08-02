import { BasePagedSearchCriteria, UrlHelper, appConfig } from 'Cnsys.Core';
import { AsyncUIProps, BaseProps, withAsyncFrame } from "Cnsys.UI.React";
import { EPZEUBaseComponent, EPZEUPagination, IDataServiceProviderProps, withDataServiceProvider } from "EPZEU.Core";
import { AppInfoStatusUI, ApplicationInfo, Constants, PassedFrom } from 'EPZEU.CR.Core';
import { action, observable, runInAction } from 'mobx';
import { observer } from "mobx-react";
import * as PropTypes from 'prop-types';
import * as React from "react";
import { DeedsDataService } from "../..";

interface ActiveConditionCaseUIProps extends BaseProps, AsyncUIProps, IDataServiceProviderProps  {
    uic: string;
}

@observer class ActiveConditionCaseUIImpl extends EPZEUBaseComponent<ActiveConditionCaseUIProps, any> {
    @observable private searchCriteria: BasePagedSearchCriteria;
    @observable private Data: ApplicationInfo[];

    constructor(props: ActiveConditionCaseUIProps, context: any) {
        super(props, context);

        this.searchCriteria = new BasePagedSearchCriteria();
        this.searchCriteria.page = 1;
        this.searchCriteria.pageSize = appConfig.defaultPageSize;
        this.searchCriteria.count = 0;
        this.Data = undefined;

        this.loadDataForPage = this.loadDataForPage.bind(this);

        this.loadDataForPage(1);
    }

    render(): JSX.Element {
        if (!this.Data) return null;

        return (
            <div className="section-wrapper">
                <h2 className="section-title section-title--preview">{this.getResource('CR_GL_CASE_L')}</h2>
                <EPZEUPagination activePage={this.searchCriteria.page} count={this.searchCriteria.count} pagesCount={this.searchCriteria.getPagesCount()} maxVisiblePage={10} size="sm" onSelect={this.loadDataForPage} aditionalCssClass="pagination-container--page-top" />
                <div className="table-responsive-block">
                    <table className="table table-borderless table-striped table-hover">
                        <thead>
                            <tr>
                                <th>{this.getResource('GL_DOCUMENTS_SUMITED_L')}</th>
                                <th>{this.getResource('GL_REGISTRATION_L')}</th>
                                <th>{this.getResource('GL_SUBMITTED_VIA_L')}</th>
                                <th>{this.getResource('GL_RESULT_L')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.Data.map((appInfo: ApplicationInfo, idx: number) => {
                                return (
                                    <tr key={idx}>
                                        <td><a href={UrlHelper.generateLinkUrl(`~${Constants.PATHS.INCOMING_DOCUMENTS}?incomingNumber=${appInfo.incomingNumberWithCtx}`)} target="_blank"><b>{appInfo.applicationTypeName}</b></a></td>
                                        <td>
                                            <span className="field-title field-title--preview d-sm-none">{this.getResource('GL_REGISTRATION_L')}</span>
                                            <p className="field-text">{appInfo.incomingNumber}</p>
                                        </td>
                                        <td>
                                            <span className="field-title field-title--preview d-sm-none">{this.getResource('GL_SUBMITTED_VIA_L')}</span>
                                            <p className="field-text">{appInfo.passedFrom == PassedFrom.Internet ? this.getResource('GL_INTERNET_L') : appInfo.officeName}</p>
                                        </td>
                                        <td>
                                            <span className="field-title field-title--preview d-sm-none">{this.getResource('GL_RESULT_L')}</span>
                                            <p className="field-text"><AppInfoStatusUI data={appInfo} /></p>
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

        this.props.registerAsyncOperation(dataSrv.getDeedCase(this.props.uic, this.searchCriteria).then(res => {
            runInAction(() => {
                if (res && res.length > 0) {
                    that.Data = res;
                } else {
                    that.Data = undefined;
                    that.searchCriteria.page = 1;
                    that.searchCriteria.count = 0;
                }
            });
        }));
    }
}

(ActiveConditionCaseUIImpl as any).contextTypes = { masterReportHeader: PropTypes.string };

export const ActiveConditionCaseUI = withDataServiceProvider(withAsyncFrame(ActiveConditionCaseUIImpl));