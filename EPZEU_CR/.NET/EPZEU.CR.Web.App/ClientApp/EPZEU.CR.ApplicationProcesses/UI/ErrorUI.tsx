import * as React from 'react';
import { EPZEUBaseComponent, ValidationSummaryErrors, Button } from "EPZEU.Core";
import { BaseProps } from "Cnsys.UI.React";
import { ApplicationProcessContext } from "../ApplicationProcessContext";
import { ProcessStatuses } from 'EPZEU.CR.Domain';

interface ErrorUIProps extends BaseProps {
    processContext: ApplicationProcessContext;
    errorMessages: any;
    onDeleteApplicationProcess: () => void;
    onReturnToBeginningStatus: () => void;
}


export class ErrorUI extends EPZEUBaseComponent<ErrorUIProps, any> {

    render(): JSX.Element {
        return (
            <div className="page-wrapper">
                <div className="section-wrapper">
                    <ValidationSummaryErrors errors={this.props.errorMessages} />
                    <div className="alert alert-danger" role="alert">
                        {this.props.processContext.status == ProcessStatuses.ErrorInSignature && (this.getResource("GL_UNABLE_SIGNING_APPLICATION_E") + ": " + this.props.processContext.mainApplicationProcess.errorMessage)}
                        {this.props.processContext.status == ProcessStatuses.ErrorInAccepting && (this.getResource("GL_UNABLE_ACCEPT_APPLICATION_E") + ": " + this.props.processContext.mainApplicationProcess.errorMessage)}
                    </div>
                    <div className="button-bar button-bar--form">
                        <div className="left-side">
                            <Button type="button" className="btn btn-secondary" lableTextKey={"GL_REFUSE_L"} onClick={this.props.onDeleteApplicationProcess}></Button>
                        </div>
                        <div className="right-side">
                            <Button type="button" className="btn btn-primary" lableTextKey={"GL_SUBMIT_APPLICATION_AGAIN_L"} onClick={this.props.onReturnToBeginningStatus}></Button>
                        </div>
                    </div>
                </div>
            </div>);
    }
}