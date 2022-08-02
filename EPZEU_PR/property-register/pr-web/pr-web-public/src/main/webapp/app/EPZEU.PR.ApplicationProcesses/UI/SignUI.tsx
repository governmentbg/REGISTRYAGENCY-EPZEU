import { BaseProps } from 'Cnsys.UI.React';
import { EPZEUBaseComponent, SigningProcessUI, ValidationSummaryErrors } from 'EPZEU.Core';
import { ApplicationFormTypes } from 'EPZEU.PR.Core';
import { IApplicationFormManager } from 'EPZEU.PR.ApplicationBase';
import * as React from 'react';
import { PreviewAppUI } from './PreviewAppUI';
import { ApplicationSection } from '.';

interface SignUIProps extends BaseProps {
  appFormType: ApplicationFormTypes;
  signingGuid: string;
  sections: ApplicationSection[];
  appFormManager: IApplicationFormManager;
  appFormUIComponentType: any;
  onSigningRejected: () => Promise<void>;
  onSingingCompleted: () => Promise<void>;
  errorMessages: any;
  isApplicationForCorrection: boolean;
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
          <PreviewAppUI appFormType={this.props.appFormType} sections={this.props.sections} appFormManager={this.props.appFormManager} appFormUIComponentType={this.props.appFormUIComponentType} reRender={false} showCost={!this.props.isApplicationForCorrection} />
          <SigningProcessUI
            signingProcessGuid={this.props.signingGuid}
            onCompleted={this.props.onSingingCompleted}
            onRejected={this.props.onSigningRejected}
          />
        </div>
      </div>);
  }
}
