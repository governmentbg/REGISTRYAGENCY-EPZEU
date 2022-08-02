import { setCurrentOptionInNavMenu, ApplicationType } from 'EPZEU.Core';
import { BaseRouteProps, BaseRoutePropsExt, withRouter } from 'Cnsys.UI.React';
import { ApplicationsUI, EPZEUBaseComponent, Registers, appConfig } from "EPZEU.Core";
import { observer } from "mobx-react";
import * as React from "react";
import { ApplicationFormTypes } from 'EPZEU.CR.Core';

interface ApplicationsUIProps extends BaseRouteProps<any>, BaseRoutePropsExt {
}

@observer class CRApplicationsUIImpl extends EPZEUBaseComponent<ApplicationsUIProps, any> {

    constructor(props: ApplicationsUIProps) {
        super(props);

        setCurrentOptionInNavMenu('cr_applications');
    }

    render() {
        return (<ApplicationsUI register={Registers.CR} getApplicationPath={this.getApplicationPath}/>);
    }

    getApplicationPath(appType: ApplicationType) {

        var pathResult = `${appConfig.paths.applications}${appConfig.paths.applicationProcesses}/${ApplicationFormTypes[parseInt(appType.appType)]}`

        return pathResult;
    }
}

export const CRApplicationsUI = withRouter(CRApplicationsUIImpl);