import { AsyncComponentLoader, BaseRouteProps, BaseRoutePropsExt, withRouter } from "Cnsys.UI.React";
import { appConfig, Constants, EPZEUBaseComponent, ModuleManager, Registers, ServicesUI, ServiceUI, ApplicationType } from "EPZEU.Core";
import { observer } from "mobx-react";
import * as React from "react";
import { Route, Switch } from 'react-router-dom';
import { setCurrentOptionInNavMenu } from 'EPZEU.Core';
import { ApplicationFormTypes } from "EPZEU.CR.Core";
const appProcessUI = (props: any) => <AsyncComponentLoader load={import(/* webpackChunkName: "ApplicationProcesses" */ 'EPZEU.CR.ApplicationProcesses').then(m => { return ModuleManager.registerModule(m).then(() => m.ApplicationProcessLayoutUI); })} {...props} />

interface ServicesUIProps extends BaseRouteProps<any>, BaseRoutePropsExt {
}

@observer class CRServicesUIImpl extends EPZEUBaseComponent<ServicesUIProps, any> {

    constructor(props: ServicesUIProps) {
        super(props);

        setCurrentOptionInNavMenu('cr_services');
    }

    render() {
        if (!this.props.match.isExact) {
            return (<Switch>
                <Route key={1} path={Constants.PATHS.SRV_APPLICATION_PROCESSES} component={appProcessUI} />
                <Route key={2} path={appConfig.paths.service} render={props => <ServiceUI getApplicationPath={this.getApplicationPath} servicesPath={appConfig.paths.services} {...props} />} />
            </Switch>)
        }
        else {
            return (<ServicesUI servicePath={appConfig.paths.service} register={Registers.CR} />);
        }
    }

    getApplicationPath(appType: ApplicationType, serviceId: number) {

        var pathResult = (appConfig.paths.service + `${appConfig.paths.applicationProcesses}/${ApplicationFormTypes[parseInt(appType.appType)]}`).replace(':serviceID', serviceId.toString())

        return pathResult;
    }
}

export const CRServicesUI = withRouter(CRServicesUIImpl);