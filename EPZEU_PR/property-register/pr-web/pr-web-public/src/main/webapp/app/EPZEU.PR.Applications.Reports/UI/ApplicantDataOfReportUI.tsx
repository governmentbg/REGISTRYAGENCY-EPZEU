import * as React from "react";
import { AsyncUIProps, BaseProps, withAsyncFrame } from 'Cnsys.UI.React';
import { EPZEUBaseComponent } from 'EPZEU.Core';
import { ApplicantDataOfReport} from "../Models/ApplicantDataOfReport";
import { SectionTitleUI } from "EPZEU.PR.ApplicationBase";
import { AuthenticationTypes } from "../Models/AuthenticationTypes";

interface ApplicantDataOfReportUIProps extends AsyncUIProps, BaseProps {
}

export class ApplicantDataOfReportUIImpl extends EPZEUBaseComponent<ApplicantDataOfReportUIProps, ApplicantDataOfReport> {
  constructor(props?: BaseProps) {
    super(props);
  }

  renderDisplay(): JSX.Element {
    return (
      <>
        <h2 className="section-title section-title--preview">{this.getResource("PR_APP_REQUESTED_BY")}</h2>
        {this.model.names ?
          <div className="field-container">
            <h3 className="field-title field-title--preview">{this.getResource('PR_APP_COMMON_NAME_L')}</h3>
            <p className="field-text">
              {this.model.names}
            </p>
          </div>
          : null}
          <div className="field-container">
            <h3 className="field-title field-title--preview">{this.getResource('PR_APP_PERSONAL_IDENTIFIER_L')}</h3>
            <p className="field-text">
              {this.model.personalIdentifier}
            </p>
          </div>
        <div className="field-container">
          <h3 className="field-title field-title--preview">{this.getResource('EP_USR_AUTHENTICATION_KIND_L')}</h3>
          <p className="field-text">
            {this.getResource(AuthenticationTypes[this.model.authenticationType])}
          </p>
        </div>
        {this.model.issuer ?
          <div className="field-container">
            <h3 className="field-title field-title--preview">{this.getResource('GL_CERTIFIC_ISSUER_INFO_L')}</h3>
            <p className="field-text">
              {this.model.issuer}
            </p>
          </div>
          : null}
        {this.model.serialNumber ?
          <div className="field-container">
            <h3 className="field-title field-title--preview">{this.getResource('GL_CERTIFIC_SERIAL_NUM_L')}</h3>
            <p className="field-text">
              {this.model.serialNumber}
            </p>
          </div>
          : null}
      </>)
  }
}

export const ApplicantDataOfReportUI = withAsyncFrame(ApplicantDataOfReportUIImpl);
