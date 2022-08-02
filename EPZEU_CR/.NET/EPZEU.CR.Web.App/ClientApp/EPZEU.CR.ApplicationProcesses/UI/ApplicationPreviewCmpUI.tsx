import { ObjectHelper } from 'Cnsys.Core';
import { AsyncUIProps, BaseProps, withAsyncFrame } from "Cnsys.UI.React";
import { EPZEUBaseComponent, IDataServiceProviderProps, ValidationSummaryErrors, withDataServiceProvider } from "EPZEU.Core";
import { ApplicationsService } from 'EPZEU.CR.Core';
import { Form } from 'EPZEU.CR.Domain';
import { action, observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import * as React from 'react';
import { ApplicationProcessPreviewContext } from "../ApplicationProcessPreviewContext";
import { ApplicationProcessDataService } from '../Services/ApplicationProcessDataService';
import { PreviewUI } from './PreviewUI';

interface ApplicationPreviewUIProps extends BaseProps, AsyncUIProps, IDataServiceProviderProps {
    incomingNumber?: string,
    processID?: number
}

@observer class ApplicationPreviewCmpUIImpl extends EPZEUBaseComponent<ApplicationPreviewUIProps, any> {
    forms: Form[];
    processContext: ApplicationProcessPreviewContext;
    hasAppForIncomingNumber: boolean;
    @observable searchInSendApplications: boolean;
    @observable isContextLoading: boolean;

    constructor(props?: ApplicationPreviewUIProps) {
        super(props);

        //Bind
        this.init = this.init.bind(this);

        //Init
        this.hasAppForIncomingNumber = false;
        this.searchInSendApplications = false;

        this.init();
    }

    render(): JSX.Element {
        return (
            <>
                {this.props.asyncErrorMessages && this.processContext &&
                    <div className="general-message-wrapper">
                        <div className="section-wrapper">
                            <div className="fixed-content-width">
                                <ValidationSummaryErrors errors={this.props.asyncErrorMessages} />
                            </div>
                        </div>
                    </div>}
                {!this.isContextLoading && this.renderApplicationPreviewUI()}
            </>);
    }

    renderApplicationPreviewUI() {
        if (this.hasAppForIncomingNumber)
            return (<PreviewUI forms={this.forms} />);
        else if (this.searchInSendApplications)
            return null;
        else
            return (
                <div className="alert alert-danger" role="alert">
                    <p>
                        {this.getResource("CR_GL_NO_APPL_WITH_THIS_INCOMING_NUMBER_E")}
                    </p>
                </div>);
    }

    //#region Event

    componentWillUpdate(nextProps: ApplicationPreviewUIProps, nextState: any, nextContext: any): void {
        super.componentWillUpdate(nextProps, nextState, nextContext);

        if (this.props.incomingNumber != nextProps.incomingNumber ||
            this.props.processID != nextProps.processID) {
            this.init();
        }
    }

    //#endregion

    //#region Helpers

    @action init() {
        this.isContextLoading = true;
        let that = this;
        let appProcessService: ApplicationProcessDataService = new ApplicationProcessDataService();
        let appService = this.props.dataSrvProvider.getDataService<ApplicationsService>(ApplicationsService);
        this.processContext = new ApplicationProcessPreviewContext(appProcessService, appService);

        if (ObjectHelper.isNullOrUndefined(this.props.incomingNumber)) {
            this.props.registerAsyncOperation(this.processContext.tryLoadDraftApplicationProcess(this.props.processID).bind(this).then(hasApp => {
                runInAction(() => {
                    that.searchInSendApplications = false;
                    that.hasAppForIncomingNumber = hasApp;
                    if (hasApp) {
                        that.initForms();
                    }

                    that.isContextLoading = false;
                });
            }));
        }
        else {
            this.props.registerAsyncOperation(this.processContext.tryLoadSendApplicationProcess(this.props.incomingNumber).bind(this).then(hasApp => {
                runInAction(() => {
                    that.searchInSendApplications = true;
                    that.hasAppForIncomingNumber = hasApp;
                    if (hasApp) {
                        that.initForms();
                    }

                    that.isContextLoading = false;
                });
            }));
        }
    }

    initForms(): void {
        this.forms = [];

        for (var appItem of this.processContext.applicationItems) {
            this.forms.push(...appItem.applicationProvider.getApplicationForms(appItem, this.props.dataSrvProvider, true));
        }

        this.forms = this.forms.sort((item1, item2) => Number(item1.order) > Number(item2.order) ? 1 : -1);
    }

    //#endregion
}

export const ApplicationPreviewCmpUI = withDataServiceProvider(withAsyncFrame(ApplicationPreviewCmpUIImpl, false)); 