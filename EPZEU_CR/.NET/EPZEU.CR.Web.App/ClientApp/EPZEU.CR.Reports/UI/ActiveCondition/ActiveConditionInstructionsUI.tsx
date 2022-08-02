import { AsyncUIProps, BaseProps, withAsyncFrame, RawHTML } from "Cnsys.UI.React";
import { EPZEUBaseComponent, EPZEUPagination, IDataServiceProviderProps, withDataServiceProvider, appConfig } from "EPZEU.Core";
import { observable, runInAction } from 'mobx';
import { observer } from "mobx-react";
import * as React from "react";
import { InstructionSearchMode } from "../../Models/Enums";
import { InstructionSearchCriteria } from "../../Models/InstructionSearchCriteria";
import { InstructionDataService } from "../../Services/InstructionDataService";
import { Instruction } from "../../Models/Instruction";
import * as PropTypes from 'prop-types';

interface ActiveConditionInstructionsUIProps extends BaseProps, AsyncUIProps, IDataServiceProviderProps {
    uic: string;
}

@observer class ActiveConditionInstructionsUIImpl extends EPZEUBaseComponent<ActiveConditionInstructionsUIProps, any> {
    @observable private searchCriteria: InstructionSearchCriteria;
    @observable private dataNotFound: boolean;
    @observable private Data: Instruction[];

    constructor(props: ActiveConditionInstructionsUIProps, context: any) {
        super(props, context);

        //Init
        this.dataNotFound = false;
        this.searchCriteria = new InstructionSearchCriteria();
        this.searchCriteria.uic = this.props.uic;
        this.searchCriteria.mode = InstructionSearchMode.ByUIC;
        this.searchCriteria.page = 1;
        this.searchCriteria.pageSize = appConfig.defaultPageSize;
        this.searchCriteria.count = 0;
        this.Data = undefined;

        //Bind
        this.loadDataForPage = this.loadDataForPage.bind(this);

        this.loadDataForPage(1);
    }

    render(): JSX.Element {
        if (!this.Data) {
            if (this.dataNotFound) {
                return (<div className="alert alert-info">{this.getResource('GL_NOT_FOUND_RESULTS_E')}</div>);
            }

            return null;
        }

        return (
            <div className="section-wrapper">
                <h2 className="section-title section-title--preview">{this.getResource('GL_INSTRUCTIONS_L')}</h2>
                <EPZEUPagination activePage={this.searchCriteria.page} count={this.searchCriteria.count} pagesCount={this.searchCriteria.getPagesCount()} maxVisiblePage={10} size="sm" onSelect={this.loadDataForPage} aditionalCssClass="pagination-container--page-top" />
                <div className="table-responsive-block">
                    <table className="table table-borderless table-striped table-hover">
                        <thead>
                            <tr>
                                <th>{this.getResource('CR_APP_APPLICATION_NUMBER_WITH_INSTRUCTIONS_L')}</th>
                                <th>{this.getResource('GL_GIVING_INSTRUCTIONS_TIME_L')}</th>
                                <th>{this.getResource('GL_DEADLINE_REMOVAL_IRREGULARITY_L')}</th>
                                <th>{this.getResource('GL_INSTRUCTIONS_L')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.Data.map((item: Instruction, idx: number) => {
                                return (
                                    <tr key={idx}>
                                        <td>
                                            <span className="field-title field-title--preview d-sm-none">{this.getResource('CR_APP_APPLICATION_NUMBER_WITH_INSTRUCTIONS_L')}</span>
                                            <p className="field-text">{item.incomingNumber}</p>
                                        </td>
                                        <td>
                                            <span className="field-title field-title--preview d-sm-none">{this.getResource('GL_GIVING_INSTRUCTIONS_TIME_L')}</span>
                                            <p className="field-text">{this.dateDisplayFor(item.fromDate, `DD.MM.YYYY ${this.getResource('GL_YEAR_ABBREVIATION_L')} HH:mm:ss`)}</p>
                                        </td>
                                        <td>
                                            <span className="field-title field-title--preview d-sm-none">{this.getResource('GL_DEADLINE_REMOVAL_IRREGULARITY_L')}</span>
                                            <p className="field-text">{this.dateDisplayFor(item.endDate, `DD.MM.YYYY ${this.getResource('GL_YEAR_ABBREVIATION_L')} HH:mm:ss`)}</p>
                                        </td>
                                        <td>
                                            <p className="field-text">
                                                <RawHTML rawHtmlText={item.link} />
                                            </p>
                                        </td>
                                    </tr>);
                            })}
                        </tbody>
                    </table>
                </div>
                <EPZEUPagination activePage={this.searchCriteria.page} count={this.searchCriteria.count} pagesCount={this.searchCriteria.getPagesCount()} maxVisiblePage={10} size="sm" onSelect={this.loadDataForPage} />
            </div>);
    }

    private loadDataForPage(page: any): void {
        let that = this;
        let dataSrv: InstructionDataService = (this.props.dataSrvProvider.getDataService(InstructionDataService) as InstructionDataService);
        this.searchCriteria.page = page;

        this.props.registerAsyncOperation(dataSrv.getDeedInstructions(this.searchCriteria).then(res => {
            runInAction(() => {
                if (res && res.length > 0) {
                    that.dataNotFound = false;
                    that.Data = res;
                } else {
                    this.dataNotFound = true;
                    that.Data = undefined;
                    that.searchCriteria.page = 1;
                    that.searchCriteria.count = 0;
                }
            });
        }));

    }
}

(ActiveConditionInstructionsUIImpl as any).contextTypes = { masterReportHeader: PropTypes.string };

export const ActiveConditionInstructionsUI = withDataServiceProvider(withAsyncFrame(ActiveConditionInstructionsUIImpl));