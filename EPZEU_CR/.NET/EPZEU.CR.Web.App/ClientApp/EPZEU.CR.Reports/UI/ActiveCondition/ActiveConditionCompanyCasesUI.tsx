import * as React from "react";
import { observer } from "mobx-react";
import { observable, runInAction } from 'mobx';
import { EPZEUBaseComponent, IDataServiceProviderProps, withDataServiceProvider } from "EPZEU.Core";
import { withAsyncFrame, AsyncUIProps, BaseProps, TreeNodeCollection, TreeViewerUI, TreeViewModes } from "Cnsys.UI.React";
import { CompaniesDataService } from 'EPZEU.CR.Core';
import { CompanyCaseTreeNodeUI } from './CompanyCaseTreeNodeUI';

interface ActiveConditionCompanyCasesUIProps extends BaseProps, AsyncUIProps, IDataServiceProviderProps {
    uic: string;
}

@observer class ActiveConditionCompanyCasesUIImpl extends EPZEUBaseComponent<ActiveConditionCompanyCasesUIProps, any> {
    @observable private Data: TreeNodeCollection;

    constructor(props: ActiveConditionCompanyCasesUIProps) {
        super(props);

        //Init
        this.Data = undefined;

        //Bind
        this.loadData = this.loadData.bind(this);

        this.props.registerAsyncOperation(this.loadData());
    }

    render(): JSX.Element {
        if (!this.Data) return null;

        return (
            <div className="section-wrapper">
                <h2 className="section-title section-title--preview">{this.getResource('CR_GL_COMPANY_CASE_L')}</h2>
                <TreeViewerUI
                    cssClass="tree-list tree-list--selectable"
                    nodeUIComponentType={CompanyCaseTreeNodeUI} {...this.bind(this.Data, this.props.viewMode)}
                    treeMode={TreeViewModes.DisplayTree}
                    nodeChildContainerCss="tree-list-collapsible" />
            </div>);
    }

    private loadData(): Promise<void> {
        let that = this;
        let dataSrv = this.props.dataSrvProvider.getDataService<CompaniesDataService>(CompaniesDataService) ;

        return dataSrv.getCompanyCases(this.props.uic).then(res => {
            runInAction(() => {
                that.Data = res ? res : undefined;
            });
        });
    }
}

export const ActiveConditionCompanyCasesUI = withDataServiceProvider(withAsyncFrame(ActiveConditionCompanyCasesUIImpl));