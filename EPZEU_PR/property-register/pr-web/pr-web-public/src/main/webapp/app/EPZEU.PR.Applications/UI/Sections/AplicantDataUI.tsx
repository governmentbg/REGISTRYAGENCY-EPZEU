import * as React from "react";
import { BaseProps } from 'Cnsys.UI.React';
import { EPZEUBaseComponent } from 'EPZEU.Core';
import { SectionTitleUI, ApplicationInfoUI } from 'EPZEU.PR.ApplicationBase';
import { IndividualUI } from "../IndividualUI";
import { Individual } from "../../Models/Individual";

export class ApplicantDataUI extends EPZEUBaseComponent<BaseProps, Individual> {
  constructor(props?: BaseProps) {
    super(props);
  }

  renderEdit(): JSX.Element {
    return (
      <>
        <SectionTitleUI titleKey={'GL_APPLICANT_DATA_L'} anchor="applicantData" />
        <ApplicationInfoUI  infoTextKey={'PR_APP_00001_I'} />
        <IndividualUI {...this.bind(model => model)}/>
      </>);
  }

  renderDisplay(): JSX.Element {
    return (<>
      <h2 className="section-title section-title--preview">{this.getResource("GL_APPLICANT_DATA_L")}</h2>
      <IndividualUI {...this.bind(model => model)}/>
    </>);
  }
}
