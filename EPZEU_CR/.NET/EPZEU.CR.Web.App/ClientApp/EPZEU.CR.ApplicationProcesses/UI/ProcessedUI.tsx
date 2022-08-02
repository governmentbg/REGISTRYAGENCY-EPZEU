import * as React from 'react'
import { BaseRouteProps, BaseRouteParams, BaseRoutePropsExt, withRouter } from 'Cnsys.UI.React'
import { EPZEUBaseComponent } from 'EPZEU.Core'
import { ApplicationProcessContext } from '../ApplicationProcessContext'


interface ProcessedUIRouteParams extends BaseRouteParams {
    incomingNumber: number
}

interface ProcessedUIProps extends BaseRouteProps<ProcessedUIRouteParams>, BaseRoutePropsExt {
}

class ProcessedUIImpl extends EPZEUBaseComponent<ProcessedUIProps, any> {

    constructor(props?: ProcessedUIProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <div>
                incomingNumber: {this.props.match.params.incomingNumber}
            </div>
        );
    }
}

export const ProcessedUI = withRouter(ProcessedUIImpl); 
