import 'babel-polyfill';
import { AjaxHelper, authenticationService, ErrorBoundary } from 'Cnsys.Core';
import { AsyncComponentLoader } from "Cnsys.UI.React";
import { appConfig, DataServiceContext, DataServiceProvider, ModuleManager, PageNotFoundUI, SessionTimeoutUI } from 'EPZEU.Core';
import { CompanyCaseDocumentAccessUI, Constants, DocumentAccessUI, DocumentDraftAccessUI, DocumentLimitUI } from 'EPZEU.CR.Core';
import { LayoutUI, SystemUnavailablePageUI, UnauthorizedPageUI } from 'EPZEU.CR.Portal';
import 'jquery';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ApplicationBootstrapper } from "./ApplicationBootstrapper";

const appProcessUI = (props: any) => <AsyncComponentLoader load={import(/* webpackChunkName: "ApplicationProcesses" */ 'EPZEU.CR.ApplicationProcesses').then(m => { return ModuleManager.registerModule(m).then(() => m.ApplicationProcessLayoutUI); })} {...props} />
const appDraftPreviewUI = (props: any) => <AsyncComponentLoader load={import(/* webpackChunkName: "ApplicationProcesses" */ 'EPZEU.CR.ApplicationProcesses').then(m => { return ModuleManager.registerModule(m).then(() => m.ApplicationDraftPreviewUI); })} {...props} />
const processUI = (props: any) => <AsyncComponentLoader load={import(/* webpackChunkName: "ApplicationProcesses" */ 'EPZEU.CR.ApplicationProcesses').then(m => { return ModuleManager.registerModule(m).then(() => m.ProcessedUI); })} {...props} />
const RequestForCorrectionForScanningUI = (props: any) => <AsyncComponentLoader load={import(/* webpackChunkName: "ApplicationProcesses" */ 'EPZEU.CR.ApplicationProcesses').then(m => { return ModuleManager.registerModule(m).then(() => m.RequestForCorrectionForScanningUI); })} {...props} />

const ApplicationsTabUI = (props: any) => <AsyncComponentLoader load={import(/* webpackChunkName: "Portal" */ 'EPZEU.CR.Portal').then(m => { return ModuleManager.registerModule(m).then(() => m.CRApplicationsUI); })} {...props} />
const ServicesTabUI = (props: any) => <AsyncComponentLoader load={import(/* webpackChunkName: "Portal" */ 'EPZEU.CR.Portal').then(m => { return ModuleManager.registerModule(m).then(() => m.CRServicesUI); })} {...props} />

const reportsUI = (props: any) => <AsyncComponentLoader load={import(/* webpackChunkName: "Reports" */ 'EPZEU.CR.Reports').then(m => { return ModuleManager.registerModule(m).then(() => m.ReportsLayoutUI); })} {...props} />
const subDeedPreviewUI = (props: any) => <AsyncComponentLoader load={import(/* webpackChunkName: "Reports" */ 'EPZEU.CR.Reports').then(m => { return ModuleManager.registerModule(m).then(() => m.SubDeedPreviewUI); })} {...props} />
const instructionUI = (props: any) => <AsyncComponentLoader load={import(/* webpackChunkName: "Reports" */ 'EPZEU.CR.Reports').then(m => { return ModuleManager.registerModule(m).then(() => m.InstructionsUI); })} {...props} />
const incomingDocumentsUI = (props: any) => <AsyncComponentLoader load={import(/* webpackChunkName: "Reports" */ 'EPZEU.CR.Reports').then(m => { return ModuleManager.registerModule(m).then(() => m.IncomingDocumentsUI); })} {...props} />
const outgoingDocumentsUI = (props: any) => <AsyncComponentLoader load={import(/* webpackChunkName: "Reports" */ 'EPZEU.CR.Reports').then(m => { return ModuleManager.registerModule(m).then(() => m.OutgoingDocumentsUI); })} {...props} />

function renderApp() {
    ReactDOM.render(<div id="loader" className="loader-overlay load"></div>, document.getElementById("content-wrapper"));

    ApplicationBootstrapper.run().then(loaded => {

        authenticationService.getUser().then(user => {

            // This code starts up the React app when it runs in a browser. It sets up the routing
            // configuration and injects the app into a DOM element.
            const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')!;

            AjaxHelper.doAjaxSetup({
                statusCode: {
                    401: function () {
                        ReactDOM.render(<UnauthorizedPageUI />, document.getElementById('content-wrapper'));
                    }
                }
            });
            var baseName = baseUrl + (appConfig.clientLanguage == 'bg' ? '' : appConfig.clientLanguage + '/');

            ReactDOM.render(
                <ErrorBoundary>
                    <BrowserRouter basename={baseName}>
                        <DataServiceContext.Provider value={{ dataSrvProvider: new DataServiceProvider({ headerKey: 'X-ContextLimiter-Token', headerValue: '' }) }}>
                            <LayoutUI>
                                <Switch>
                                    <Route key={1} path={Constants.PATHS.APPLICATION_PROCESSES} component={appProcessUI} />
                                    <Route key={2} path='/ProcessedApplicationProcess/:incomingNumber' component={processUI} />
                                    <Route key={3} path={Constants.PATHS.REPORTS} component={reportsUI} />
                                    <Route key={4} path={appConfig.paths.applications} component={ApplicationsTabUI} />
                                    <Route key={5} path={Constants.PATHS.SUBDEEDPREVIEW} component={subDeedPreviewUI} />
                                    <Route key={6} path={appConfig.paths.services} component={ServicesTabUI} />
                                    <Route key={7} path={Constants.PATHS.INSTRUCTION} component={instructionUI} />
                                    <Route key={8} path={Constants.PATHS.INCOMING_DOCUMENTS} component={incomingDocumentsUI} />
                                    <Route key={9} path={Constants.PATHS.OUTGOING_DOCUMENTS} component={outgoingDocumentsUI} />
                                    <Route key={10} path={Constants.PATHS.APPLICATION_DRAFT_PREVIEW} component={appDraftPreviewUI} />
                                    {
                                        user
                                            ? <Redirect from={Constants.PATHS.SESSION_TIMEOUT} to={appConfig.paths.applications} />
                                            : <Route key={11} path={Constants.PATHS.SESSION_TIMEOUT} component={SessionTimeoutUI} />
                                    }
                                    <Route key={12} path={Constants.PATHS.DOCUMENT_DRAFT_ACCESS} component={DocumentDraftAccessUI} />
                                    <Route key={13} path={Constants.PATHS.DOCUMENT_ACCESS_COMPANY_CF} component={CompanyCaseDocumentAccessUI} />
                                    <Route key={14} path={Constants.PATHS.DOCUMENT_ACCESS} component={DocumentAccessUI} />
                                    <Route key={15} path={Constants.PATHS.DOCUMENT_LIMIT} component={DocumentLimitUI} />
                                    <Route key={16} path={Constants.PATHS.REQUEST_FOR_CORRECTION_FOR_SCANNING} component={RequestForCorrectionForScanningUI} />
                                    <Route key={17} component={PageNotFoundUI} />
                                </Switch>
                            </LayoutUI>
                        </DataServiceContext.Provider>
                    </BrowserRouter>
                </ErrorBoundary>,
                document.getElementById('content-wrapper'));

        }).catch((e: any) => {
            ReactDOM.render(<SystemUnavailablePageUI />, document.getElementById("content-wrapper"));
        });

    }).catch((e: any) => {
        ReactDOM.render(<SystemUnavailablePageUI />, document.getElementById("content-wrapper"));
    });
}

renderApp();