import { BaseRouteParams, BaseRouteProps, BaseRoutePropsExt, withRouter } from "Cnsys.UI.React";
import { EPZEUBaseComponent } from "EPZEU.Core";
import { observer } from "mobx-react";
import * as React from 'react';
import { ApplicationPreviewCmpUI } from './ApplicationPreviewCmpUI';


interface ApplicationDraftPreviewUIRouteParams extends BaseRouteParams {
    processID: any
}

interface ApplicationDraftPreviewUIProps extends BaseRouteProps<ApplicationDraftPreviewUIRouteParams>, BaseRoutePropsExt {
}

@observer class ApplicationDraftPreviewUIImpl extends EPZEUBaseComponent<ApplicationDraftPreviewUIProps, any> {

    render(): JSX.Element {
        return <div className="main-wrapper section-wrapper section-wrapper--margins fixed-content-width">
            <div className="page-wrapper">
                <div className="section-wrapper">
                    <ApplicationPreviewCmpUI processID={this.props.match.params.processID} />
                </div>
            </div>
        </div>
    }
}

export const ApplicationDraftPreviewUI = withRouter(ApplicationDraftPreviewUIImpl); 