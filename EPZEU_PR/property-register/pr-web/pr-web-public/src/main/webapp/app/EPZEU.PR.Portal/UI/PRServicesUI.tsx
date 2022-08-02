import { AsyncComponentLoader, BaseRouteProps, BaseRoutePropsExt, withRouter } from "Cnsys.UI.React";
import { EPZEUBaseComponent, ModuleManager, Registers, ServicesUI, ServiceUI, setCurrentOptionInNavMenu, ApplicationType, appConfig } from "EPZEU.Core";
import { Constants, ApplicationFormTypes } from "EPZEU.PR.Core";
import { observer } from "mobx-react";
import * as React from "react";
import { Route, Switch } from "react-router";

const appProcessUI = (props: any) => <AsyncComponentLoader load={import(/* webpackChunkName: "ApplicationProcesses" */ 'EPZEU.PR.ApplicationProcesses').then(m => { return ModuleManager.registerModule(m).then(() => m.ApplicationProcessLayoutUI); })} {...props} />

interface ServicesUIProps extends BaseRouteProps<any>, BaseRoutePropsExt {
}

@observer class PRServicesUIImpl extends EPZEUBaseComponent<ServicesUIProps, any> {

  constructor(props: ServicesUIProps) {
    super(props)

    setCurrentOptionInNavMenu('pr_services');
  }

  render() {
    if (!this.props.match.isExact) {
      return (
        <Switch>
          <Route key={1} path={Constants.PATHS.SRV_APPLICATION_PROCESSES} component={appProcessUI} />
          <Route key={2} path={Constants.PATHS.SERVICE} render={props => <ServiceUI servicesPath={Constants.PATHS.SERVICES} getApplicationPath={this.getApplicationPath} {...props} />} />);
        </Switch>)
    }
    else {
      return (<ServicesUI servicePath={Constants.PATHS.SERVICE} register={Registers.PR} />);
    }
  }

  getApplicationPath(appType: ApplicationType, serviceId: number) {

    var pathResult = (appConfig.paths.service + `${appConfig.paths.applicationProcesses}/${ApplicationFormTypes[parseInt(appType.appType)]}`).replace(':serviceID', serviceId.toString())

    var pathResult = Constants.PATHS.SRV_APPLICATION_PROCESSES.replace(':serviceID', serviceId.toString()).replace(':applicationType', ApplicationFormTypes[parseInt(appType.appType)]).replace('/:applicationSection?', '')


    return pathResult;
  }
}

export const PRServicesUI = withRouter(PRServicesUIImpl);
