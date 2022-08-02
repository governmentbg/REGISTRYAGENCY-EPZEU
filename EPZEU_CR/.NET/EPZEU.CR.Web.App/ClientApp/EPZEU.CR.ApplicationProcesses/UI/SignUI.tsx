import { BaseProps } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, SigningProcessUI, ValidationSummaryErrors } from 'EPZEU.Core';
import { Form, IApplicationProcessContext } from 'EPZEU.CR.Domain';
import * as React from 'react';
import { PreviewUI } from './PreviewUI';

interface SignUIProps extends BaseProps {
    processContext: IApplicationProcessContext;
    forms: Form[];
    onSigningRejected: () => Promise<void>;
    onSingingCompleted: () => Promise<void>;
    errorMessages: any;
}

export class SignUI extends EPZEUBaseComponent<SignUIProps, any> {

    constructor(props?: SignUIProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <div className="page-wrapper">
                <div className="section-wrapper">
                    <ValidationSummaryErrors errors={this.props.errorMessages} />
                    <PreviewUI forms={this.props.forms} />
                    <SigningProcessUI
                        signingProcessGuid={this.props.processContext.signingGuid}
                        onCompleted={this.props.onSingingCompleted}
                        onRejected={this.props.onSigningRejected}
                    />
                </div>
            </div>);
    }
}