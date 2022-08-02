import 'babel-polyfill';
import { AjaxHelper, authenticationService, ErrorBoundary } from 'Cnsys.Core';
import { AsyncComponentLoader, LoadingUI } from 'Cnsys.UI.React';
import { appConfig, ModuleManager, PageNotFoundUI, SessionTimeoutUI } from 'EPZEU.Core';
import { Constants, DocumentLimitUI } from 'EPZEU.PR.Core';
import { LayoutUI, SystemUnavailablePageUI, UnauthorizedPageUI } from 'EPZEU.PR.Portal';
import 'jquery';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ApplicationBootstrapper } from './ApplicationBootstrapper';


const appProcessUI = (props: any) => <AsyncComponentLoader load={import(/* webpackChunkName: "ApplicationProcesses" */ 'EPZEU.PR.ApplicationProcesses').then(m => { return ModuleManager.registerModule(m).then(() => m.ApplicationProcessLayoutUI); })} {...props} />
const appPreviewUI = (props: any) => <AsyncComponentLoader load={import(/* webpackChunkName: "ApplicationProcesses" */ 'EPZEU.PR.ApplicationProcesses').then(m => { return ModuleManager.registerModule(m).then(() => m.ApplicationPreviewUI); })} {...props} />
const applicationsTabUI = (props: any) => <AsyncComponentLoader load={import(/* webpackChunkName: "Portal" */ 'EPZEU.PR.Portal').then(m => { return ModuleManager.registerModule(m).then(() => m.PRApplicationsUI); })} {...props} />
const servicesTabUI = (props: any) => <AsyncComponentLoader load={import(/* webpackChunkName: "Portal" */ 'EPZEU.PR.Portal').then(m => { return ModuleManager.registerModule(m).then(() => m.PRServicesUI); })} {...props} />
const reportsUI = (props: any) => <AsyncComponentLoader load={import(/* webpackChunkName: "Reports" */ 'EPZEU.PR.Reports').then(m => { return ModuleManager.registerModule(m).then(() => m.ReportsLayoutUI); })} {...props} />
const taxesCalculatorUI = (props: any) => <AsyncComponentLoader load={import(/* webpackChunkName: "TaxesCalculator" */ 'EPZEU.PR.TaxesCalculator').then(m => { return ModuleManager.registerModule(m).then(() => m.TaxesCalculatorUI); })} {...props} />
const statusTextUI = (props: any) => <AsyncComponentLoader load={import(/* webpackChunkName: "ApplicationProcesses" */ 'EPZEU.PR.ApplicationProcesses').then(m => { return ModuleManager.registerModule(m).then(() => m.StatusTextUI); })} {...props} />
const statusHistoryUI = (props: any) => <AsyncComponentLoader load={import(/* webpackChunkName: "ApplicationProcesses" */ 'EPZEU.PR.ApplicationProcesses').then(m => { return ModuleManager.registerModule(m).then(() => m.StatusHistoryUI); })} {...props} />
const documentAccessUI = (props: any) => <AsyncComponentLoader load={import(/* webpackChunkName: "ApplicationProcesses" */ 'EPZEU.PR.ApplicationProcesses').then(m => { return ModuleManager.registerModule(m).then(() => m.DocumentAccessUI); })} {...props} />

function renderApp() {
  ReactDOM.render(<LoadingUI />, document.getElementById("content-wrapper"));

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
            <LayoutUI>
              <Switch>
                <Route key={1} path={Constants.PATHS.APPLICATION_PROCESSES_SIMPLE} component={appProcessUI} />
                <Route key={2} path={Constants.PATHS.APPLICATIONS} component={applicationsTabUI} />
                <Route key={3} path={Constants.PATHS.SERVICES} component={servicesTabUI} />
                <Route key={4} path={Constants.PATHS.APPLICATION_PREVIEW} component={appPreviewUI} />
                <Route key={6} path={Constants.PATHS.REPORTS} component={reportsUI} />
                <Route key={7} path={Constants.PATHS.TAXES_CALCULATOR} component={taxesCalculatorUI} />
                {
                  user
                    ? <Redirect from={Constants.PATHS.SESSION_TIMEOUT} to={Constants.PATHS.APPLICATIONS} />
                    : <Route key={8} path={Constants.PATHS.SESSION_TIMEOUT} component={SessionTimeoutUI} />
                }
                <Route key={9} path={Constants.PATHS.STATUS_TEXT} component={statusTextUI} />
                <Route key={10} path={Constants.PATHS.STATUS_HISTORY} component={statusHistoryUI} />
                <Route key={11} path={Constants.PATHS.DOCUMENT_ACCESS} component={documentAccessUI} />
                <Route key={12} path={Constants.PATHS.DOCUMENT_LIMIT} component={DocumentLimitUI} />
                <Route key={13} component={PageNotFoundUI} />
              </Switch>
            </LayoutUI>
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
