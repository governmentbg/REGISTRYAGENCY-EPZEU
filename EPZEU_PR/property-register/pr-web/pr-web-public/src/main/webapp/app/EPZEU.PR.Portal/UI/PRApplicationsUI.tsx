import { AsyncComponentLoader, BaseRouteProps, BaseRoutePropsExt, withRouter } from 'Cnsys.UI.React';
import { ApplicationsUI, EPZEUBaseComponent, ModuleManager, Registers, setCurrentOptionInNavMenu, ApplicationType, appConfig } from "EPZEU.Core";
import { Constants, ApplicationFormTypes } from "EPZEU.PR.Core";
import { observer } from "mobx-react";
import * as React from "react";
import { Route, Switch } from "react-router";

const appProcessUI = (props: any) => <AsyncComponentLoader load={import(/* webpackChunkName: "ApplicationProcesses" */ 'EPZEU.PR.ApplicationProcesses').then(m => { return ModuleManager.registerModule(m).then(() => m.ApplicationProcessLayoutUI); })} {...props} />

interface ApplicationsUIProps extends BaseRouteProps<any>, BaseRoutePropsExt {
}

@observer class PRApplicationsUIImpl extends EPZEUBaseComponent<ApplicationsUIProps, any> {

  constructor(props: ApplicationsUIProps) {
    super(props)

    setCurrentOptionInNavMenu('pr_applications');
  }

  render() {
    if (!this.props.match.isExact) {
      return (
        <Switch>
          <Route key={1} path={Constants.PATHS.APPLICATION_PROCESSES} component={appProcessUI} />
        </Switch>)
    }
    else {
      return (<ApplicationsUI getApplicationPath={this.getApplicationPath} register={Registers.PR} />);
    }
  }

  getApplicationPath(appType: ApplicationType) {

    var pathResult = Constants.PATHS.APPLICATION_PROCESSES.replace(':applicationType', ApplicationFormTypes[parseInt(appType.appType)]).replace('/:applicationSection?', '')

    return pathResult;
  }
}

export const PRApplicationsUI = withRouter(PRApplicationsUIImpl);
