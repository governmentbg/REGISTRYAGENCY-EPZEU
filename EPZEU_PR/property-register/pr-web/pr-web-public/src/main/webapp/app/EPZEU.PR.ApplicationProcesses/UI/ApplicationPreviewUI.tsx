import * as React from 'react';
import { observer } from "mobx-react";
import { EPZEUBaseComponent } from "EPZEU.Core";
import { BaseRouteParams, BaseRouteProps, BaseRoutePropsExt, withRouter } from "Cnsys.UI.React";

import { ApplicationPreviewCmpUI } from './ApplicationPreviewCmpUI';

interface ApplicationPreviewUIRouteParams extends BaseRouteParams {
  incomingNumber: string
}

interface ApplicationPreviewUIProps extends BaseRouteProps<ApplicationPreviewUIRouteParams>, BaseRoutePropsExt {
}

@observer class ApplicationPreviewUIImpl extends EPZEUBaseComponent<ApplicationPreviewUIProps, any> {

  render(): JSX.Element {
    return <ApplicationPreviewCmpUI incomingNumber={this.props.match.params.incomingNumber} showCost={false} />
  }
}

export const ApplicationPreviewUI = withRouter(ApplicationPreviewUIImpl); 
